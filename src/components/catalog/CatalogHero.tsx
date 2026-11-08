/**
 * Top of the catalog: two-tone H1 ("Каталог." + muted subtitle) and, beside it, a link to
 * ask a specialist in the Telegram bot (WhatsApp in the mockup, docs/decisions/0003).
 */
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { telegramHref } from "@/lib/contact-links";
import type { CatalogPage, SiteSettings } from "@/lib/content/types";

interface CatalogHeroProps {
  hero: CatalogPage["hero"];
  telegramBot: SiteSettings["telegramBot"];
}

export function CatalogHero({ hero, telegramBot }: CatalogHeroProps) {
  return (
    <section
      aria-labelledby="catalog-title"
      className="mt-4 flex flex-wrap items-end justify-between gap-6 md:mt-6 md:gap-8"
    >
      <h1 id="catalog-title" className="m-0 max-w-190 text-display-sm md:text-display">
        {hero.title} <span className="text-ink-muted">{hero.subtitle}</span>
      </h1>
      <a
        href={telegramHref(telegramBot, "catalog_help")}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3.5 text-ink"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong">
          <TelegramIcon size={20} />
        </span>
        <span className="flex flex-col">
          <span className="text-label font-semibold">{hero.help.title}</span>
          <span className="text-caption text-accent-strong underline-offset-4 group-hover:underline">
            {hero.help.linkLabel}
          </span>
        </span>
      </a>
    </section>
  );
}
