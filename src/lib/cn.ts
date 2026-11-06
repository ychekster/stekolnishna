/**
 * Joins class names, skipping falsy values: `cn("a", isActive && "b")`.
 * Deliberately tiny — no conflict resolution; components avoid passing conflicting utilities.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
