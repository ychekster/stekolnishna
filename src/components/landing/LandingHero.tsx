/**
 * First screen of an SEO landing: a wide photo with a dark scrim, the H1 with the search
 * phrase and "в Алматы", a lead, "Оставить заявку" (this page's form) and "Написать в
 * Telegram"; then a row of four facts under it.
 */
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import type { SeoLanding } from "@/lib/content/types";
import { routes } from "@/lib/routes";

interface LandingHeroProps {
  hero: SeoLanding["hero"];
  facts: SeoLanding["facts"];
  orderLabel: string;
  telegramLabel: string;
  telegramHref: string;
}

export function LandingHero({
  hero,
  facts,
  orderLabel,
  telegramLabel,
  telegramHref,
}: LandingHeroProps) {
  return (
    <section aria-labelledby="landing-title" className="mt-4 md:mt-6">
      <div className="relative flex min-h-105 items-end overflow-hidden rounded-lg md:min-h-120 md:items-center">
        <MediaFrame image={hero.image} sizes="(min-width: 1200px) 1136px, 100vw" preload cover />
        <div className="absolute inset-0 bg-scrim" aria-hidden="true" />
        <div className="relative max-w-150 p-6 text-ink-inverse md:p-12">
          <h1 id="landing-title" className="m-0 text-display-sm md:text-display">
            {hero.title}
          </h1>
          <p className="m-0 mt-4 text-body md:text-intro">{hero.lead}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button href={routes.pageLeadForm} variant="light">
              {orderLabel}
            </Button>
            <a
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-ink-inverse px-6 text-label text-ink-inverse transition-colors duration-150 hover:bg-ink-inverse hover:text-ink"
            >
              <TelegramIcon size={16} />
              {telegramLabel}
            </a>
          </div>
        </div>
      </div>
      <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4 md:gap-4">
        {facts.map((fact) => (
          <li key={fact.label} className="rounded-lg border border-line p-4 md:p-5">
            <div className="text-title md:text-h2">{fact.value}</div>
            <div className="mt-1 text-small text-ink-muted md:text-caption">{fact.label}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
