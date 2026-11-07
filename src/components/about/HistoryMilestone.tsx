/**
 * One timeline row: accent year in a fixed column, title and text beside it.
 * On mobile the year sits above the text — a 120px column would squeeze the copy.
 */
import type { Milestone } from "@/lib/content/types";

export function HistoryMilestone({ milestone }: { milestone: Milestone }) {
  return (
    <li className="grid gap-1 py-4 md:grid-cols-[120px_minmax(0,1fr)] md:gap-6 md:py-6">
      <span className="text-title text-accent-strong md:text-stat-sm">{milestone.year}</span>
      <div>
        <h3 className="m-0 text-title">{milestone.title}</h3>
        <p className="m-0 mt-1 text-body text-ink-muted md:mt-2">{milestone.description}</p>
      </div>
    </li>
  );
}
