/**
 * One benefit on the dark plate: accent number above the title, muted text below.
 * The number comes from the position, so editors only reorder items.
 */
import type { AdvantageItem } from "@/lib/content/types";

export function BenefitItem({ benefit, index }: { benefit: AdvantageItem; index: number }) {
  return (
    <li>
      <div className="text-label font-semibold text-accent" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className="m-0 mt-2 text-title">{benefit.title}</h3>
      <p className="m-0 mt-2 text-body text-ink-inverse-muted">{benefit.description}</p>
    </li>
  );
}
