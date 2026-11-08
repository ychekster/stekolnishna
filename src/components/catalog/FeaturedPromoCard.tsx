/**
 * Light promo card leading to one category ("Душевые из закалённого стекла"): text and
 * price on the left, photo on the right half. On phones the photo becomes a band on top,
 * because half of a 390px card is too narrow for the title.
 */
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ICON_STROKE } from "@/components/ui/Icon";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { CatalogPage } from "@/lib/content/types";
import { formatPrice } from "@/lib/format/price";

interface FeaturedPromoCardProps {
  promo: CatalogPage["promos"]["featured"];
  href: string;
}

export function FeaturedPromoCard({ promo, href }: FeaturedPromoCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-surface-alt text-ink md:min-h-80"
    >
      <div className="h-44 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[45%]">
        <MediaFrame image={promo.image} sizes="(min-width: 768px) 260px, 100vw" />
      </div>
      <div className="relative flex flex-1 flex-col justify-between gap-6 p-6 md:max-w-[55%] md:p-9">
        <div>
          <div className="text-caption font-semibold text-accent-strong">{promo.label}</div>
          <div className="mt-2 text-h2 md:text-form-title">{promo.title}</div>
          <p className="m-0 mt-2.5 text-body text-ink-muted">{promo.text}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-label font-semibold">
          <span>{formatPrice(promo.price)}</span>
          <span className="inline-flex items-center gap-1 font-medium text-accent-strong">
            {promo.linkLabel}
            <ArrowRight
              size={16}
              strokeWidth={ICON_STROKE}
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
