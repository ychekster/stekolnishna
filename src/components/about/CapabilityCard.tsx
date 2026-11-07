/**
 * Outlined card with one production capability: muted label, big value, short note.
 */
import type { Capability } from "@/lib/content/types";

export function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <li className="rounded-md border border-line p-4 md:p-6">
      <div className="text-caption text-ink-muted">{capability.label}</div>
      <div className="mt-2 text-stat-sm text-ink">{capability.value}</div>
      <p className="m-0 mt-2 text-caption text-ink-muted">{capability.note}</p>
    </li>
  );
}
