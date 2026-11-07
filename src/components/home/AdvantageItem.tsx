/**
 * One advantage (design: AdvantageItem): accent number "01", title, text.
 * Lines between items come from the list (`dividers-between`).
 */
import type { AdvantageItem as AdvantageData } from "@/lib/content/types";

export function AdvantageItem({ advantage, index }: { advantage: AdvantageData; index: number }) {
  return (
    <li className="flex gap-5 py-6">
      <span
        className="min-w-7 pt-0.5 text-label font-semibold text-accent-strong"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="m-0 text-title">{advantage.title}</h3>
        <p className="m-0 mt-2 text-body text-ink-muted">{advantage.description}</p>
      </div>
    </li>
  );
}
