/**
 * Top of a category page WITHOUT products ("Безрамное остекление"): two-tone H1, then a big
 * photo beside a grey card with the description, "from" price, lead time, "Оставить заявку"
 * (this page's form) and "Написать в Telegram". Stacks on phones.
 */
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import type { CatalogCategory, CategoryPageCopy } from "@/lib/content/types";
import { formatPrice } from "@/lib/format/price";
import { routes } from "@/lib/routes";

interface ServiceCategoryHeroProps {
  category: CatalogCategory;
  copy: CategoryPageCopy;
  telegramHref: string;
}

export function ServiceCategoryHero({ category, copy, telegramHref }: ServiceCategoryHeroProps) {
  const labels = copy.noProducts;
  return (
    <section aria-labelledby="category-title" className="mt-4 md:mt-6">
      <h1 id="category-title" className="m-0 max-w-215 text-display-sm md:text-display">
        {category.name}. <span className="text-ink-muted">{category.tagline}</span>
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-6">
        <div className="aspect-4/3 overflow-hidden rounded-lg md:aspect-auto md:min-h-105">
          <MediaFrame image={category.image} sizes="(min-width: 768px) 640px, 100vw" preload />
        </div>
        <div className="flex flex-col rounded-lg bg-surface-alt p-6 md:p-8">
          <p className="m-0 text-body text-ink-muted">{category.description}</p>
          <dl className="m-0 mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
            <div>
              <dt className="text-small text-ink-muted">{labels.priceLabel}</dt>
              <dd className="m-0 mt-1 text-title">{formatPrice(category.price)}</dd>
            </div>
            {category.leadTime && (
              <div>
                <dt className="text-small text-ink-muted">{copy.leadTimeLabel}</dt>
                <dd className="m-0 mt-1 text-title">{category.leadTime}</dd>
              </div>
            )}
          </dl>
          <div className="mt-6 flex flex-wrap gap-2 md:mt-auto md:pt-8">
            <Button href={routes.pageLeadForm}>{labels.orderLabel}</Button>
            <Button
              href={telegramHref}
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
              icon={<TelegramIcon size={16} />}
            >
              {labels.telegramLabel}
            </Button>
          </div>
          <p className="m-0 mt-4 text-small text-ink-muted">{labels.note}</p>
        </div>
      </div>
    </section>
  );
}
