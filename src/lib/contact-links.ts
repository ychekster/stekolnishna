/**
 * Builders for contact links, so the URL formats live in one place.
 */

/** `tel:` link from an E.164 number. */
export function telHref(phoneE164: string): string {
  return `tel:${phoneE164}`;
}

/** Characters Telegram allows in a bot deep-link `start` parameter (max 64 of them). */
const TELEGRAM_START_PARAM = /^[A-Za-z0-9_-]{1,64}$/;

/**
 * Link to the company Telegram bot (replaces WhatsApp — docs/decisions/0003).
 *
 * `startParam` becomes a deep link (`?start=…`): the bot receives it on /start, so it can
 * tell where the visitor came from — e.g. a product slug from a product card. Telegram
 * only accepts `A–Z a–z 0–9 _ -` up to 64 chars; anything else is a programming error.
 */
export function telegramHref(botUsername: string, startParam?: string): string {
  const username = botUsername.replace(/^@/, "");
  if (startParam === undefined) return `https://t.me/${username}`;
  if (!TELEGRAM_START_PARAM.test(startParam)) {
    throw new Error(`Invalid Telegram start parameter: "${startParam}"`);
  }
  return `https://t.me/${username}?start=${startParam}`;
}

/** `mailto:` link. */
export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}
