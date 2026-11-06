/**
 * Minimal in-memory rate limiter for public forms (spec §7: anti-spam).
 *
 * Limitation, by design for now: state lives in the server process, so it resets on
 * restart and is not shared between instances. Good enough for a single-server site;
 * replace with a shared store (Postgres / Redis) if the site is ever scaled out.
 */

interface Window {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Window>();

/**
 * Returns `true` if the action is allowed for `key` (usually the client IP) and records
 * the attempt; `false` if the limit for the current window is exhausted.
 */
export function consumeRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
  now: number = Date.now(),
): boolean {
  const current = windows.get(key);

  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    pruneExpired(now);
    return true;
  }
  if (current.count >= limit) {
    return false;
  }
  current.count += 1;
  return true;
}

/** Drops expired entries so the map does not grow without bound. */
function pruneExpired(now: number): void {
  if (windows.size < 1000) return;
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}
