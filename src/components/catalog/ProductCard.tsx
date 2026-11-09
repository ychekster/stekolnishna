/**
 * Product in a catalog grid: square photo with an optional badge, name, one line of facts,
 * optional filter tags, price, then the main button ("Заказать" → lead form of this page on
 * the catalog index; "Подробнее" → product page on category pages and shelves) and a Telegram button that opens the bot
 * with this product (spec §3.2: start parameter = product slug). The mockup's "Рассчитать"
 * button is dropped together with the calculator (docs/decisions/0003).
 */
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { telegramHref } from "@/lib/contact-links";
import type { CatalogPage, CatalogProduct, ProductTag, SiteSettings } from "@/lib/content/types";
import { formatPrice } from "@/lib/format/price";
import { routes } from "@/lib/routes";

interface ProductCardProps {
  product: CatalogProduct;
  labels: CatalogPage["productCard"];
  telegramBot: SiteSettings["telegramBot"];
  /** Replace "Заказать" with another main button, e.g. "Подробнее" to the product page. */
  details?: { label: string };
  /** Show the product's filter tags as small pills (category pages). */
  tagLabels?: Partial<Record<ProductTag, string>>;
}

export function ProductCard({
  product,
  labels,
  telegramBot,
  details,
  tagLabels,
}: ProductCardProps) {
  const href = routes.product(product.categorySlug, product.slug);
  return (
    <article className="flex flex-col">
      <Link
        href={href}
        // The name link below carries the accessible name; this one only duplicates it.
        tabIndex={-1}
        aria-hidden="true"
        className="group relative block aspect-square overflow-hidden rounded-md bg-surface-alt md:rounded-lg"
      >
        <MediaFrame
          image={product.image}
          sizes="(min-width: 1024px) 270px, (min-width: 768px) 33vw, 50vw"
          imageClassName="transition-transform duration-400 group-hover:scale-103"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 rounded-full bg-surface px-2.5 py-1 text-small font-semibold text-accent-strong md:top-3 md:left-3">
            {product.badge}
          </span>
        )}
      </Link>
      <h3 className="m-0 mt-3 text-nav font-semibold md:mt-4 md:text-title">
        <Link href={href} className="text-ink hover:text-accent-strong">
          {product.name}
        </Link>
      </h3>
      <p className="m-0 mt-1 text-small text-ink-muted md:text-caption">{product.summary}</p>
      {tagLabels && product.tags.length > 0 && (
        <ul className="m-0 mt-2 flex list-none flex-wrap gap-1 p-0">
          {product.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-2 py-0.5 text-small text-ink-muted"
            >
              {tagLabels[tag]}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 text-nav font-semibold md:mt-3 md:text-title">
        {formatPrice(product.price)}
      </div>
      <div className="mt-auto flex items-center gap-2 pt-3 md:pt-4">
        {details ? (
          <Button href={href} size="sm">
            {details.label}
          </Button>
        ) : (
          <Button href={routes.pageLeadForm} size="sm">
            {labels.orderLabel}
          </Button>
        )}
        {/* Link styled like IconButton (which renders only <button>). */}
        <a
          href={telegramHref(telegramBot, product.slug)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${labels.askLabel}: ${product.name}`}
          className="inline-grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-surface"
        >
          <TelegramIcon size={16} />
        </a>
      </div>
    </article>
  );
}
