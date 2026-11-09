/**
 * "Вопросы и ответы" on an SEO landing: heading, lead and a Telegram button on the left,
 * questions as native <details> on the right (the first one open; answers stay in the HTML
 * for search engines). The page adds the matching Schema.org FAQPage markup.
 */
import { Minus, Plus } from "lucide-react";

import { ICON_STROKE } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import type { SeoLanding } from "@/lib/content/types";

interface FaqSectionProps {
  faq: SeoLanding["faq"];
  telegramHref: string;
}

export function FaqSection({ faq, telegramHref }: FaqSectionProps) {
  return (
    <Section
      labelledBy="faq-title"
      className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-12"
    >
      <div>
        <h2 id="faq-title" className="m-0 text-h2 md:text-h1">
          {faq.title}
        </h2>
        <p className="m-0 mt-3 text-body text-ink-muted">{faq.lead}</p>
        <a
          href={telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-nav text-ink transition-colors duration-150 hover:border-ink"
        >
          <TelegramIcon size={16} />
          {faq.askLabel}
        </a>
      </div>
      <div className="dividers-between border-y border-line">
        {faq.items.map((item, index) => (
          <details key={item.question} open={index === 0} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-label font-semibold [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line-strong">
                <Plus
                  size={14}
                  strokeWidth={ICON_STROKE}
                  aria-hidden="true"
                  className="group-open:hidden"
                />
                <Minus
                  size={14}
                  strokeWidth={ICON_STROKE}
                  aria-hidden="true"
                  className="hidden group-open:block"
                />
              </span>
            </summary>
            <p className="m-0 mt-3 max-w-150 text-body text-ink-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
