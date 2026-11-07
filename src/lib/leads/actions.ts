"use server";

/**
 * Server Action for the short lead form (homepage, About page — see schema.ts).
 *
 * Order of checks: honeypot → rate limit → validation → save. Spam paths return the
 * normal success state so bots get no signal about what was detected.
 */
import { headers } from "next/headers";
import { z } from "zod";

import { consumeRateLimit } from "./rate-limit";
import { saveLead } from "./repository";
import { HONEYPOT_FIELD, leadFormSchema, readLeadForm, type LeadFormField } from "./schema";

export type LeadFormState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      fieldErrors: Partial<Record<LeadFormField, string>>;
      formError?: string;
      /** Echo of entered values, so the form is not wiped on a validation error. */
      values: { name: string; phone: string; details: string };
    };

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  if (formData.get(HONEYPOT_FIELD)) {
    return { status: "success" };
  }

  const raw = readLeadForm(formData);
  const values = { name: raw.name, phone: raw.phone, details: raw.details };

  const clientIp = await getClientIp();
  if (!consumeRateLimit(`lead:${clientIp}`, RATE_LIMIT)) {
    return {
      status: "error",
      fieldErrors: {},
      formError: "Слишком много заявок подряд. Попробуйте позже или позвоните нам.",
      values,
    };
  }

  const parsed = leadFormSchema.safeParse(raw);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      status: "error",
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
      ),
      values,
    };
  }

  try {
    await saveLead(parsed.data);
  } catch (error) {
    console.error("[lead] failed to save lead", error);
    return {
      status: "error",
      fieldErrors: {},
      formError: "Не удалось отправить заявку. Позвоните нам или напишите в Telegram.",
      values,
    };
  }

  return { status: "success" };
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
