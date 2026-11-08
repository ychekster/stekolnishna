/**
 * One service (spec §3.3: description, photo and an order button): photo with the service
 * number, title, text, fact tags, then price and "Заказать" pinned to the bottom so the
 * footers line up across a row of cards. The card id is the anchor of its chip.
 */
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { ServiceOffer } from "@/lib/content/types";

interface ServiceCardProps {
  offer: ServiceOffer;
  /** Position in the list, shown as "01", "02"… on the photo. */
  number: number;
  priceLabel: string;
  orderLabel: string;
  /** Where "Заказать" leads: the lead form on this page. */
  orderHref: string;
}

export function ServiceCard({
  offer,
  number,
  priceLabel,
  orderLabel,
  orderHref,
}: ServiceCardProps) {
  const titleId = `${offer.slug}-title`;
  return (
    <article id={offer.slug} aria-labelledby={titleId} className="flex flex-col">
      <div className="relative aspect-4/3 overflow-hidden rounded-md">
        <MediaFrame
          image={offer.image}
          sizes="(min-width: 1200px) 363px, (min-width: 768px) 50vw, 100vw"
        />
        <span className="absolute top-3 left-3 rounded-full bg-surface px-3 py-1 text-caption font-semibold text-accent-strong">
          {String(number).padStart(2, "0")}
        </span>
      </div>
      <h2 id={titleId} className="m-0 mt-4 text-h2 md:mt-5">
        {offer.title}
      </h2>
      <p className="m-0 mt-2 text-body text-ink-muted">{offer.description}</p>
      <ul className="m-0 mt-4 flex list-none flex-wrap gap-1.5 p-0">
        {offer.specs.map((spec) => (
          <li key={spec} className="rounded-full bg-accent-soft px-2.5 py-1 text-caption text-ink">
            {spec}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
          <div>
            <div className="text-small text-ink-muted">{priceLabel}</div>
            <div className="text-title">{offer.price}</div>
          </div>
          <Button href={orderHref} size="sm">
            {orderLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
