/**
 * Top of the Services page: H1 with an intro beside it (below it on mobile). The service
 * chips under it belong to ServicesBrowser, since they filter the cards.
 */
import type { ServicesPage } from "@/lib/content/types";

export function ServicesHero({ hero }: { hero: ServicesPage["hero"] }) {
  return (
    <section aria-labelledby="services-page-title" className="mt-4 md:mt-6">
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-12">
        <h1
          id="services-page-title"
          className="m-0 max-w-190 flex-[1_1_560px] text-display-sm md:text-display"
        >
          {hero.title}
        </h1>
        <p className="m-0 max-w-95 flex-[1_1_300px] text-body text-ink-muted md:text-intro">
          {hero.lead}
        </p>
      </div>
    </section>
  );
}
