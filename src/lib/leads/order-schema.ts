/**
 * Validation of the full order form on /zayavka (spec §4.2): name, phone, product type,
 * sizes, quantity, comment, attachments (checked separately in uploads.ts), consent.
 * Only the phone and consent are required: every extra required field costs leads.
 */
import { z } from "zod";

import { consentField, nameField, phoneField, readText } from "./schema";

export const orderFormSchema = z.object({
  name: nameField,
  phone: phoneField,
  /** A catalog section name or "Другое"; free text, the list is editable in the CMS. */
  productType: z.string().trim().max(120, "Слишком длинный текст"),
  size: z.string().trim().max(120, "Слишком длинный текст"),
  quantity: z
    .string()
    .trim()
    .transform((value, ctx) => {
      if (value === "") return 1;
      const number = Number(value);
      if (!Number.isInteger(number) || number < 1 || number > 9999) {
        ctx.addIssue({ code: "custom", message: "Укажите количество от 1 до 9999" });
        return z.NEVER;
      }
      return number;
    }),
  details: z.string().trim().max(2000, "Слишком длинный текст"),
  consent: consentField,
});

export type OrderFormData = z.output<typeof orderFormSchema>;
/** Field names of the form, plus `files` for the attachment error. */
export type OrderFormField = keyof z.input<typeof orderFormSchema> | "files";

export function readOrderForm(formData: FormData) {
  return {
    name: readText(formData, "name"),
    phone: readText(formData, "phone"),
    productType: readText(formData, "productType"),
    size: readText(formData, "size"),
    quantity: readText(formData, "quantity"),
    details: readText(formData, "details"),
    consent: formData.get("consent") === "on",
  };
}

/** Attached files from the form; an empty file input still sends one nameless empty file. */
export function readOrderFiles(formData: FormData): File[] {
  return formData
    .getAll("files")
    .filter((value): value is File => value instanceof File && value.name !== "" && value.size > 0);
}
