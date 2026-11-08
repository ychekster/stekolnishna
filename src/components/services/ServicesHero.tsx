/**
 * Top of the Services page: H1 with an intro beside it (below it on mobile) and a row of
 * anchor chips, one per service card. On phones the chips scroll sideways in one row
 * instead of wrapping into a tall block that pushes the cards off the first screen.
 */
import type { ServicesPage } from "@/lib/content/types";

interface ServicesHeroProps {
  hero: ServicesPage["hero"];
  offers: ServicesPage["offers"];
}

export function ServicesHero({ hero, offers }: ServicesHeroProps) {
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
      <nav aria-label={offers.navLabel} className="mt-6 md:mt-10">
        <ul className="-mx-4 my-0 scrollbar-none flex list-none gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {offers.items.map((offer) => (
            <li key={offer.slug} className="shrink-0">
              <a
                href={`#${offer.slug}`}
                className="block rounded-full border border-line-strong px-4 py-2 text-nav whitespace-nowrap text-ink transition-colors duration-150 hover:border-ink"
              >
                {offer.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
