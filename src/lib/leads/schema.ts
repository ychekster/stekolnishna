/**
 * Validation of the homepage lead form ("Рассчитаем стоимость вашего проекта").
 *
 * Runs on the server (spec §7: validate all form input). Error messages are Russian
 * because they are shown to site visitors as-is.
 */
import { z } from "zod";

import { normalizeKzPhone } from "@/lib/format/phone";

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
  task: z.string().trim().max(1000, "Слишком длинное описание"),
  consent: z.literal(true, { error: "Нужно согласие на обработку персональных данных" }),
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
    task: text("task"),
    consent: formData.get("consent") === "on",
  };
}
