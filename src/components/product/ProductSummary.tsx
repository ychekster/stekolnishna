/**
 * Right column of a product page: section link, H1, one-line summary, price ("от … ₸" or
 * "Цена рассчитывается индивидуально"), chips (lead time, measurement), variant groups on a
 * grey plate (or one line when there are none), "Заказать" (this page's form) and
 * "Написать в Telegram" (the bot receives the product slug).
 */
import Link from "next/link";

import { InfoChips } from "@/components/category/InfoChips";
import { Button } from "@/components/ui/Button";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { cn } from "@/lib/cn";
import type { CatalogCategory, CatalogProduct, ProductPageCopy } from "@/lib/content/types";
import { formatPrice } from "@/lib/format/price";
import { routes } from "@/lib/routes";

interface ProductSummaryProps {
  product: CatalogProduct;
  category: CatalogCategory;
  copy: ProductPageCopy;
  telegramHref: string;
}

export function ProductSummary({ product, category, copy, telegramHref }: ProductSummaryProps) {
  const options = product.options ?? [];
  const individual = product.price.kind === "individual";
  // Many imported summaries are the lead time itself: do not repeat it in a chip.
  const leadTime = product.leadTime === product.summary ? null : product.leadTime;
  const chips = [leadTime, copy.measureChip].filter((chip) => chip !== null);

  return (
    <div className="min-w-0">
      <Link
        href={routes.catalogCategory(category.slug)}
        className="text-caption font-medium text-accent-strong hover:text-ink"
      >
        {category.name}
      </Link>
      <h1 id="product-title" className="m-0 mt-2 text-display-sm md:text-h1">
        {product.name}
      </h1>
      <p className="m-0 mt-3 text-body text-ink-muted">{product.summary}</p>
      <div className={cn("mt-5", individual ? "text-title" : "text-h2 md:text-form-title")}>
        {formatPrice(product.price)}
      </div>
      <InfoChips items={chips} className="mt-3" />

      {options.length > 0 ? (
        <dl className="m-0 mt-6 flex flex-col gap-4 rounded-lg bg-surface-alt p-5">
          {options.map((option) => (
            <div key={option.label}>
              <dt className="text-caption font-semibold">{option.label}</dt>
              <dd className="m-0 mt-2 flex flex-wrap gap-1.5">
                {option.values.map((value) => (
                  <span
                    key={value}
                    className="rounded-full border border-line-strong bg-surface px-2.5 py-1 text-small"
                  >
                    {value}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="m-0 mt-6 rounded-lg bg-surface-alt p-5 text-body text-ink-muted">
          {copy.noOptions}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button href={routes.pageLeadForm} size="lg">
          {copy.orderLabel}
        </Button>
        <Button
          href={telegramHref}
          variant="outline"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
          icon={<TelegramIcon size={16} />}
        >
          {copy.telegramLabel}
        </Button>
      </div>
      <p className="m-0 mt-3 text-small text-ink-muted">{copy.priceNote}</p>
    </div>
  );
}
