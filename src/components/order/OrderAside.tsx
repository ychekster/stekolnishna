/**
 * Right column of the order page: a dark card inviting to send photos to the Telegram bot
 * (WhatsApp in the mockup, docs/decisions/0003; deep link `order`) and "Что будет дальше".
 * The mockup's "Сначала посчитать в калькуляторе" link is dropped with the calculator.
 */
import { Button } from "@/components/ui/Button";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { telegramHref } from "@/lib/contact-links";
import type { OrderPage, SiteSettings } from "@/lib/content/types";

interface OrderAsideProps {
  telegram: OrderPage["telegram"];
  nextSteps: OrderPage["nextSteps"];
  telegramBot: SiteSettings["telegramBot"];
}

export function OrderAside({ telegram, nextSteps, telegramBot }: OrderAsideProps) {
  return (
    <aside className="flex min-w-0 flex-[1_1_300px] flex-col gap-4">
      <div className="rounded-lg bg-surface-inverse p-6 text-ink-inverse md:p-7">
        <h2 className="m-0 text-title">{telegram.title}</h2>
        <p className="m-0 mt-1.5 mb-4 text-nav font-normal text-ink-inverse-muted">
          {telegram.text}
        </p>
        <Button
          href={telegramHref(telegramBot, "order")}
          variant="light"
          target="_blank"
          rel="noopener noreferrer"
          icon={<TelegramIcon size={16} />}
        >
          {telegram.buttonLabel}
        </Button>
      </div>
      <div className="rounded-lg border border-line p-6 md:p-7">
        <h2 className="m-0 text-title">{nextSteps.title}</h2>
        <ol className="m-0 mt-3 pl-4.5 text-nav font-normal text-ink-muted">
          {nextSteps.steps.map((step) => (
            <li key={step} className="py-0.5">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
