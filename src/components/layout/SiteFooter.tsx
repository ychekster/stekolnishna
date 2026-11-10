/**
 * Site footer (design handoff, all pages): logo with contacts, hours and Telegram; the menu;
 * "Популярные услуги" with the SEO landing pages; "Покупателям" (order form, legal pages);
 * copyright. Four columns on desktop, two on tablets, stacked on phones.
 *
 * Deviation from the handoff: its "Доставка по всему Казахстану" line is left out until the
 * customer confirms the delivery area (docs/open-questions.md).
 */
import { Brand } from "@/components/ui/Brand";
import { Container } from "@/components/ui/Container";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { mailtoHref, telegramHref, telHref } from "@/lib/contact-links";
import type { SeoLanding, SiteSettings } from "@/lib/content/types";
import { routes } from "@/lib/routes";

import { FooterColumn } from "./FooterColumn";

interface SiteFooterProps {
  settings: SiteSettings;
  landings: Pick<SeoLanding, "slug" | "navLabel">[];
}

export function SiteFooter({ settings, landings }: SiteFooterProps) {
  const { footer } = settings;
  return (
    <Container>
      <footer className="mt-12 border-t border-line pt-8 pb-6 md:mt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.3fr_1.3fr]">
          <div>
            <Brand name={settings.companyName} tagline={settings.tagline} logo={settings.logo} />
            <address className="mt-4 flex flex-col gap-1 text-caption text-ink-muted not-italic">
              <a
                href={telHref(settings.phoneE164)}
                className="text-label font-semibold text-ink hover:text-accent-strong"
              >
                {settings.phoneDisplay}
              </a>
              <span>{settings.address}</span>
              <span>{settings.workingHours}</span>
              <a href={mailtoHref(settings.email)} className="hover:text-accent-strong">
                {settings.email}
              </a>
              <a
                href={telegramHref(settings.telegramBot)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 font-medium text-accent-strong hover:text-ink"
              >
                <TelegramIcon size={14} />
                {footer.telegramLabel}
              </a>
            </address>
          </div>
          <FooterColumn title={footer.menuTitle} links={settings.navigation} />
          <FooterColumn
            title={footer.landingsTitle}
            links={landings.map((landing) => ({
              label: landing.navLabel,
              href: routes.landing(landing.slug),
            }))}
          />
          <FooterColumn title={footer.buyersTitle} links={footer.buyersLinks} />
        </div>
        <div className="mt-8 border-t border-line pt-4 text-small text-ink-muted">
          {settings.copyright}
        </div>
      </footer>
    </Container>
  );
}
