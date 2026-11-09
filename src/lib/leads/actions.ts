"use server";

/**
 * Server Actions of the public forms: the short lead form (homepage and other pages), the
 * "Заказать звонок" dialog and the full order form with attachments (/zayavka).
 *
 * Order of checks in each: honeypot → rate limit → validation → save. Spam paths return
 * the normal success state so bots get no signal about what was detected. The rate limit
 * bucket is shared by all forms: one visitor, one budget.
 */
import { headers } from "next/headers";
import { z } from "zod";

import { callbackFormSchema, readCallbackForm, type CallbackFormField } from "./callback-schema";
import {
  orderFormSchema,
  readOrderFiles,
  readOrderForm,
  type OrderFormField,
} from "./order-schema";
import { consumeRateLimit } from "./rate-limit";
import { saveLead, type LeadAttachment, type LeadInput } from "./repository";
import { HONEYPOT_FIELD, leadFormSchema, readLeadForm, type LeadFormField } from "./schema";
import { checkUploadList, extensionMatches, sniffFileType } from "./uploads";

/** Result of a form submission; `values` echoes the input so the form is not wiped. */
export type FormState<Field extends string, Values> =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      fieldErrors: Partial<Record<Field, string>>;
      formError?: string;
      values: Values;
    };

export type LeadFormState = FormState<
  LeadFormField,
  { name: string; phone: string; details: string }
>;
export type CallbackFormState = FormState<
  CallbackFormField,
  { name: string; phone: string; preferredTime: string }
>;
export type OrderFormState = FormState<
  OrderFormField,
  {
    name: string;
    phone: string;
    productType: string;
    size: string;
    quantity: string;
    details: string;
  }
>;

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

const TOO_MANY = "Слишком много заявок подряд. Попробуйте позже или позвоните нам.";
const SAVE_FAILED = "Не удалось отправить заявку. Позвоните нам или напишите в Telegram.";

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  if (formData.get(HONEYPOT_FIELD)) return { status: "success" };

  const raw = readLeadForm(formData);
  const values = { name: raw.name, phone: raw.phone, details: raw.details };
  if (!(await allowSubmission())) return formError(values, TOO_MANY);

  const parsed = leadFormSchema.safeParse(raw);
  if (!parsed.success) return fieldErrors(parsed.error, values);

  return store({ kind: "request", ...parsed.data }, values);
}

export async function submitCallback(
  _prev: CallbackFormState,
  formData: FormData,
): Promise<CallbackFormState> {
  if (formData.get(HONEYPOT_FIELD)) return { status: "success" };

  const raw = readCallbackForm(formData);
  const values = { name: raw.name, phone: raw.phone, preferredTime: raw.preferredTime };
  if (!(await allowSubmission())) return formError(values, TOO_MANY);

  const parsed = callbackFormSchema.safeParse(raw);
  if (!parsed.success) return fieldErrors(parsed.error, values);

  return store({ kind: "callback", ...parsed.data }, values);
}

export async function submitOrder(
  _prev: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  if (formData.get(HONEYPOT_FIELD)) return { status: "success" };

  const { consent: _consent, ...values } = readOrderForm(formData);
  if (!(await allowSubmission())) return formError(values, TOO_MANY);

  const parsed = orderFormSchema.safeParse(readOrderForm(formData));
  const files = await inspectAttachments(readOrderFiles(formData));

  if (!parsed.success || "error" in files) {
    const errors = parsed.success
      ? { status: "error" as const, fieldErrors: {}, values }
      : fieldErrors<OrderFormField, typeof values>(parsed.error, values);
    if ("error" in files) errors.fieldErrors = { ...errors.fieldErrors, files: files.error };
    return errors;
  }

  return store({ kind: "order", ...parsed.data, attachments: files.attachments }, values);
}

// ---------------------------------------------------------------------------

async function allowSubmission(): Promise<boolean> {
  return consumeRateLimit(`lead:${await getClientIp()}`, RATE_LIMIT);
}

function formError<Values>(values: Values, message: string) {
  return { status: "error" as const, fieldErrors: {}, formError: message, values };
}

function fieldErrors<Field extends string, Values>(error: z.ZodError, values: Values) {
  const flat = z.flattenError(error).fieldErrors as Record<string, string[] | undefined>;
  return {
    status: "error" as const,
    fieldErrors: Object.fromEntries(
      Object.entries(flat).map(([field, messages]) => [field, messages?.[0]]),
    ) as Partial<Record<Field, string>>,
    values,
  };
}

async function store<Values>(lead: LeadInput, values: Values) {
  try {
    await saveLead(lead);
  } catch (error) {
    console.error("[lead] failed to save lead", error);
    return formError(values, SAVE_FAILED);
  }
  return { status: "success" as const };
}

/** Name/size rules first, then the real content type of every file (uploads.ts). */
async function inspectAttachments(
  files: File[],
): Promise<{ attachments: LeadAttachment[] } | { error: string }> {
  const listError = checkUploadList(files);
  if (listError) return { error: listError };

  const attachments: LeadAttachment[] = [];
  for (const file of files) {
    const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    const type = sniffFileType(head);
    if (!type || !extensionMatches(file.name, type)) {
      return { error: `Файл «${file.name}» повреждён или это не JPG, PNG или PDF` };
    }
    attachments.push({ name: file.name, size: file.size, type, file });
  }
  return { attachments };
}

/** Best-effort client IP behind a proxy/tunnel; falls back to a shared bucket. */
async function getClientIp(): Promise<string> {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("cf-connecting-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown"
  );
}
