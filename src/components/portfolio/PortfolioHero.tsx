/**
 * Top of the portfolio page: H1 with a muted second sentence on the left, key numbers on
 * the right (below the heading on phones).
 */
import { Stat } from "@/components/ui/Stat";
import type { PortfolioPage } from "@/lib/content/types";

export function PortfolioHero({ hero }: { hero: PortfolioPage["hero"] }) {
  return (
    <section
      aria-labelledby="portfolio-title"
      className="mt-4 flex flex-wrap items-end justify-between gap-6 md:mt-6 md:gap-12"
    >
      <h1 id="portfolio-title" className="m-0 max-w-180 text-display-sm md:text-display">
        {hero.title} <span className="text-ink-muted">{hero.subtitle}</span>
      </h1>
      <div className="flex gap-8 md:gap-12">
        {hero.stats.map((stat) => (
          <Stat key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
