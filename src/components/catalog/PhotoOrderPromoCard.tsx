/**
 * Dark promo card "Пришлите фото или чертёж" with a button to the Telegram bot. Takes the
 * place of the mockup's calculator card (no calculator: docs/decisions/0003). Deep link
 * `catalog_photo` tells managers where the chat came from.
 */
import { Button } from "@/components/ui/Button";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { telegramHref } from "@/lib/contact-links";
import type { CatalogPage, SiteSettings } from "@/lib/content/types";

interface PhotoOrderPromoCardProps {
  promo: CatalogPage["promos"]["photoOrder"];
  telegramBot: SiteSettings["telegramBot"];
}

export function PhotoOrderPromoCard({ promo, telegramBot }: PhotoOrderPromoCardProps) {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-lg bg-surface-inverse p-6 text-ink-inverse md:min-h-80 md:p-9">
      <div className="max-w-90">
        <div className="text-caption font-semibold text-accent">{promo.label}</div>
        <div className="mt-2 text-h2 md:text-form-title">{promo.title}</div>
        <p className="m-0 mt-2.5 text-body text-ink-inverse-muted">{promo.text}</p>
      </div>
      <div>
        <Button
          href={telegramHref(telegramBot, "catalog_photo")}
          variant="light"
          icon={<TelegramIcon size={18} />}
          target="_blank"
          rel="noopener noreferrer"
        >
          {promo.buttonLabel}
        </Button>
      </div>
    </div>
  );
}
