/**
 * Phone number helpers for Kazakhstan (+7, 10 national digits).
 */

/**
 * Normalizes user input to E.164 (`+77011234567`), or returns `null` if it is not a
 * plausible KZ number. Accepts the usual ways people type it: `8 701 123 45 67`,
 * `+7 (701) 123-45-67`, `7011234567`.
 */
export function normalizeKzPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+7${digits}`;
  }
  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    return `+7${digits.slice(1)}`;
  }
  return null;
}
