"use client";

/**
 * Service chips + the grid of service cards (one column on phones, two on tablets, three
 * on desktop). A chip filters the grid down to that service instead of scrolling to it
 * (user's request); "Все услуги" shows them all again. On phones the chips scroll sideways
 * in one row instead of wrapping into a tall block.
 *
 * The chosen service lives in the URL hash (`/uslugi#rezka`), the same links landing pages
 * already use, so they open the page filtered. The hash is written with the History API,
 * which does not scroll; hashchange covers links to another service from this page.
 */
import { useSyncExternalStore } from "react";

import { FilterChip } from "@/components/ui/FilterChip";
import type { ServicesPage } from "@/lib/content/types";

import { ServiceCard } from "./ServiceCard";

/** Fired after replaceState, which (unlike a hash link) emits no hashchange. */
const HASH_SET_EVENT = "services:hash";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(HASH_SET_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(HASH_SET_EVENT, onChange);
  };
}

const readHash = () => decodeURIComponent(window.location.hash.slice(1));

interface ServicesBrowserProps {
  offers: ServicesPage["offers"];
  orderHref: string;
}

export function ServicesBrowser({ offers, orderHref }: ServicesBrowserProps) {
  const hash = useSyncExternalStore(subscribe, readHash, () => "");
  const selected = offers.items.some((offer) => offer.slug === hash) ? hash : null;

  const select = (slug: string | null) => {
    const { pathname, search } = window.location;
    window.history.replaceState(window.history.state, "", slug ? `#${slug}` : pathname + search);
    window.dispatchEvent(new Event(HASH_SET_EVENT));
  };

  const chips = [
    { slug: null, label: offers.allLabel },
    ...offers.items.map(({ slug, title }) => ({ slug, label: title })),
  ];

  return (
    <>
      <div
        role="group"
        aria-label={offers.navLabel}
        className="-mx-4 mt-6 scrollbar-none flex gap-2 overflow-x-auto px-4 md:mx-0 md:mt-10 md:flex-wrap md:overflow-visible md:px-0"
      >
        {chips.map(({ slug, label }) => (
          <FilterChip
            key={label}
            label={label}
            pressed={selected === slug}
            onClick={() => select(slug)}
          />
        ))}
      </div>
      <section
        aria-label={offers.navLabel}
        aria-live="polite"
        className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 md:mt-14 md:grid-cols-2 lg:grid-cols-3"
      >
        {offers.items.map((offer, index) =>
          selected === null || selected === offer.slug ? (
            <ServiceCard
              key={offer.slug}
              offer={offer}
              // The number stays the service's own, also when it is shown alone.
              number={index + 1}
              priceLabel={offers.priceLabel}
              orderLabel={offers.orderLabel}
              orderHref={orderHref}
            />
          ) : null,
        )}
      </section>
    </>
  );
}
