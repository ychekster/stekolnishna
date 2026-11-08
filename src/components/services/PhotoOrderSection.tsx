/**
 * "Заказ по фото или чертежу" (spec §4.5): three steps and a button to the Telegram bot.
 * Files go to the bot (deep link `services_photo`, so managers know where the chat came
 * from) because the short lead form has no upload (backlog: full order form).
 */
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { telegramHref } from "@/lib/contact-links";
import type { ServicesPage, SiteSettings } from "@/lib/content/types";

import { PhotoOrderStep } from "./PhotoOrderStep";

interface PhotoOrderSectionProps {
  photoOrder: ServicesPage["photoOrder"];
  telegramBot: SiteSettings["telegramBot"];
}

export function PhotoOrderSection({ photoOrder, telegramBot }: PhotoOrderSectionProps) {
  return (
    <Section id="photo-order" labelledBy="photo-order-title">
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <SectionHeading
          id="photo-order-title"
          title={photoOrder.title}
          lead={photoOrder.lead}
          wide
        />
        <Button
          href={telegramHref(telegramBot, "services_photo")}
          variant="outline"
          icon={<TelegramIcon size={18} />}
          target="_blank"
          rel="noopener noreferrer"
        >
          {photoOrder.telegramLabel}
        </Button>
      </div>
      <ol className="m-0 mt-6 grid list-none grid-cols-1 gap-3 p-0 md:mt-10 md:grid-cols-3 md:gap-4">
        {photoOrder.steps.map((step, index) => (
          <PhotoOrderStep key={step.title} step={step} number={index + 1} />
        ))}
      </ol>
    </Section>
  );
}
