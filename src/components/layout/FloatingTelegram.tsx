/**
 * Floating Telegram button, fixed in the bottom-right corner on every page.
 * Spec §4.3 asked for a floating WhatsApp button; the customer replaced WhatsApp with a
 * Telegram bot (docs/decisions/0003). Styled with design tokens (dark circle like the
 * step icons).
 */
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { telegramHref } from "@/lib/contact-links";

export function FloatingTelegram({ botUsername }: { botUsername: string }) {
  return (
    <a
      href={telegramHref(botUsername)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в Telegram"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-surface-inverse text-ink-inverse shadow-pop transition-colors hover:bg-accent-strong md:right-6 md:bottom-6"
    >
      {/* The plane's mass sits right of its box centre; nudge it toward the visual middle. */}
      <TelegramIcon size={26} className="-translate-x-0.5" />
    </a>
  );
}
