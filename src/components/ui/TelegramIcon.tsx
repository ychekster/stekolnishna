/**
 * Telegram's paper-plane glyph (filled), used wherever we link to the Telegram bot.
 * Lucide has no brand logos, and its generic "send" arrow is not recognisable as Telegram.
 *
 * Path: Font Awesome Free "telegram-plane" brand icon, CC BY 4.0
 * (https://fontawesome.com/license/free). The viewBox is widened to a square so the glyph
 * is centred like the other icons.
 */
interface TelegramIconProps {
  size?: number;
  className?: string;
}

export function TelegramIcon({ size = 20, className }: TelegramIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-28 0 512 512"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z" />
    </svg>
  );
}
