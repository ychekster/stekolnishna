/**
 * Cookie consent choice (spec §9, cookie banner).
 *
 * Stored in a first-party cookie, not localStorage, so the server can read it too when
 * analytics are added: GA4 and Yandex Metrica must load only after "all" (backlog).
 * "necessary" = the visitor declined analytics; the banner stays hidden either way.
 */

export const COOKIE_CONSENT_NAME = "cookie-consent";

export type CookieConsent = "all" | "necessary";

/** One year: long enough not to nag, short enough to ask again eventually. */
const MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

/** Reads the choice from a `document.cookie`-style string; null = not chosen yet. */
export function readCookieConsent(cookieHeader: string): CookieConsent | null {
  for (const part of cookieHeader.split(";")) {
    const [name, value] = part.trim().split("=");
    if (name === COOKIE_CONSENT_NAME && (value === "all" || value === "necessary")) {
      return value;
    }
  }
  return null;
}

/** The `document.cookie` assignment that stores the choice for the whole site. */
export function serializeCookieConsent(choice: CookieConsent): string {
  return `${COOKIE_CONSENT_NAME}=${choice}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
}
