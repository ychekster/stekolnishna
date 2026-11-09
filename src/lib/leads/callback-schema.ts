/**
 * Validation of the "Заказать звонок" dialog (spec §4.4): name, phone, convenient time,
 * consent. The time options are editable copy (site settings), so the server only bounds
 * the length instead of matching a fixed list: a renamed option must not reject leads.
 */
import { z } from "zod";

import { consentField, nameField, phoneField, readText } from "./schema";

export const callbackFormSchema = z.object({
  name: nameField,
  phone: phoneField,
  preferredTime: z.string().trim().max(60, "Слишком длинный текст"),
  consent: consentField,
});

export type CallbackFormData = z.output<typeof callbackFormSchema>;
export type CallbackFormField = keyof z.input<typeof callbackFormSchema>;

export function readCallbackForm(formData: FormData) {
  return {
    name: readText(formData, "name"),
    phone: readText(formData, "phone"),
    preferredTime: readText(formData, "preferredTime"),
    consent: formData.get("consent") === "on",
  };
}
