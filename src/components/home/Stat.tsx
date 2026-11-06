/**
 * Big number + caption (design: Stat), e.g. "15+ / лет на рынке".
 */
import type { Stat as StatData } from "@/lib/content/types";

export function Stat({ stat }: { stat: StatData }) {
  return (
    <div>
      <div className="text-stat-sm text-ink md:text-stat">{stat.value}</div>
      <div className="mt-1 text-small text-ink-muted md:text-caption">{stat.label}</div>
    </div>
  );
}
