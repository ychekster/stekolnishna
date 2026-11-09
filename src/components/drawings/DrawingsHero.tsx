/**
 * Top of "Рисунки на стекле": two-tone H1, description and chips on the left, a dark card
 * "Как выбрать рисунок" with three steps and a Telegram button on the right.
 */
import { InfoChips } from "@/components/category/InfoChips";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import type { CatalogCategory, DrawingsPageCopy } from "@/lib/content/types";

interface DrawingsHeroProps {
  category: CatalogCategory;
  copy: DrawingsPageCopy;
  chips: string[];
  telegramHref: string;
}

export function DrawingsHero({ category, copy, chips, telegramHref }: DrawingsHeroProps) {
  return (
    <section
      aria-labelledby="category-title"
      className="mt-4 grid grid-cols-1 items-start gap-6 md:mt-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-12"
    >
      <div>
        <h1 id="category-title" className="m-0 text-display-sm md:text-display">
          {category.name}. <span className="text-ink-muted">{category.tagline}</span>
        </h1>
        <p className="m-0 mt-4 max-w-150 text-body text-ink-muted md:text-intro">
          {category.description}
        </p>
        <InfoChips items={chips} className="mt-5" />
      </div>
      <div className="rounded-lg bg-surface-inverse p-6 text-ink-inverse md:p-7">
        <h2 className="m-0 text-title">{copy.howTitle}</h2>
        <ol className="m-0 mt-3 list-decimal pl-5 text-nav font-normal text-ink-inverse-muted">
          {copy.howSteps.map((step) => (
            <li key={step} className="py-0.5">
              {step}
            </li>
          ))}
        </ol>
        <a
          href={telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex h-9 items-center gap-2 rounded-full border border-ink-inverse-muted px-4 text-nav text-ink-inverse transition-colors duration-150 hover:border-ink-inverse"
        >
          <TelegramIcon size={16} />
          {copy.howButton}
        </a>
      </div>
    </section>
  );
}
