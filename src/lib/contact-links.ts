/**
 * Builders for contact links, so the URL formats live in one place.
 */

/** `tel:` link from an E.164 number. */
export function telHref(phoneE164: string): string {
  return `tel:${phoneE164}`;
}

/**
 * WhatsApp chat link (`wa.me`). An optional message is prefilled — used on product cards
 * to send the product name and chosen options (spec §4.3).
 */
export function whatsappHref(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}

/** `mailto:` link. */
export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}
