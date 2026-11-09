/**
 * "Что мы делаем. Цены от." on an SEO landing: cards with a photo (hidden on phones to keep
 * the list short), title, one line, price and a link to the catalog or Services page.
 * Cards come resolved from the catalog (src/lib/catalog/offers.ts).
 */
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ICON_STROKE } from "@/components/ui/Icon";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section } from "@/components/ui/Section";
import type { OfferCard, SeoLanding } from "@/lib/content/types";

interface OfferGridProps {
  offers: SeoLanding["offers"];
  cards: OfferCard[];
}

export function OfferGrid({ offers, cards }: OfferGridProps) {
  return (
    <Section labelledBy="offers-title">
      <h2 id="offers-title" className="m-0 text-h2 md:text-h1">
        {offers.title} <span className="text-ink-muted">{offers.subtitle}</span>
      </h2>
      <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 md:mt-8 md:gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <li
            key={card.href}
            className="flex flex-col overflow-hidden rounded-lg border border-line"
          >
            <div className="hidden aspect-video md:block">
              <MediaFrame image={card.image} sizes="(min-width: 1024px) 370px, 50vw" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="m-0 text-title">{card.title}</h3>
              <p className="m-0 mt-1.5 text-caption text-ink-muted">{card.description}</p>
              <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                <span className="text-label font-semibold">{card.priceLabel}</span>
                <Link
                  href={card.href}
                  className="inline-flex shrink-0 items-center gap-1 text-caption font-medium text-accent-strong hover:text-ink"
                >
                  {offers.linkLabel}
                  <ArrowRight size={14} strokeWidth={ICON_STROKE} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="m-0 mt-4 text-caption text-ink-muted">{offers.note}</p>
    </Section>
  );
}
