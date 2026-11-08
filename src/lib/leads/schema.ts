/**
 * Validation of the short lead form (name, phone, free-text details, consent).
 *
 * The same form is placed on several pages (homepage "Рассчитаем стоимость", About page
 * "Записаться на визит"); each placement has its own label for the free-text field and
 * reports its `source`, so the manager knows what the details mean.
 *
 * Runs on the server (spec §7: validate all form input). Error messages are Russian
 * because they are shown to site visitors as-is.
 */
import { z } from "zod";

import { normalizeKzPhone } from "@/lib/format/phone";

/** Where a lead came from. Add a value when the form is placed on a new page. */
export const LEAD_SOURCES = ["homepage", "about-visit", "contacts", "services", "catalog"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const leadFormSchema = z.object({
  name: z.string().trim().max(100, "Слишком длинное имя"),
  phone: z
    .string()
    .trim()
    .min(1, "Укажите телефон")
    .transform((value, ctx) => {
      const normalized = normalizeKzPhone(value);
      if (!normalized) {
        ctx.addIssue({ code: "custom", message: "Введите номер в формате +7 ___ ___-__-__" });
        return z.NEVER;
      }
      return normalized;
    }),
  /** Free text; its meaning depends on the form (what to make, convenient visit time…). */
  details: z.string().trim().max(1000, "Слишком длинный текст"),
  consent: z.literal(true, { error: "Нужно согласие на обработку персональных данных" }),
  // A hidden field, so the value is client-controlled: an unknown value must not block a
  // real person's lead — it is stored as "not reported" instead.
  source: z.enum(LEAD_SOURCES).optional().catch(undefined),
});

/** Validated, normalized lead ready to be stored. */
export type LeadFormData = z.output<typeof leadFormSchema>;

/** Field names of the form — also used as `name` attributes of inputs. */
export type LeadFormField = keyof z.input<typeof leadFormSchema>;

/**
 * Hidden "honeypot" field. Real users never see or fill it; naive bots fill every input.
 * A filled honeypot means spam — we pretend success and drop the submission.
 */
export const HONEYPOT_FIELD = "website";

/** Reads raw form values into the shape the schema expects. */
export function readLeadForm(formData: FormData) {
  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  return {
    name: text("name"),
    phone: text("phone"),
    details: text("details"),
    consent: formData.get("consent") === "on",
    source: text("source") || undefined,
  };
}
