/**
 * Site footer (design: Footer): logo, contacts, menu, privacy policy link and copyright.
 */
import Link from "next/link";

import { Brand } from "@/components/ui/Brand";
import { Container } from "@/components/ui/Container";
import { mailtoHref, telHref } from "@/lib/contact-links";
import type { SiteSettings } from "@/lib/content/types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <Container>
      <footer className="mt-12 border-t border-line pt-8 pb-6 md:mt-24">
        <div className="flex flex-wrap justify-between gap-8">
          <div>
            <Brand name={settings.companyName} tagline={settings.tagline} />
            <address className="mt-4 flex flex-col gap-1 text-caption text-ink-muted not-italic">
              <a href={telHref(settings.phoneE164)} className="hover:text-accent-strong">
                {settings.phoneDisplay}
              </a>
              <span>{settings.address}</span>
              <a href={mailtoHref(settings.email)} className="hover:text-accent-strong">
                {settings.email}
              </a>
            </address>
          </div>
          <nav aria-label="Меню в подвале" className="flex flex-col gap-2 text-nav text-ink">
            {settings.navigation.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-accent-strong">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-4 border-t border-line pt-4 text-small text-ink-muted">
          <Link href={settings.privacyPolicyHref} className="hover:text-accent-strong">
            Политика конфиденциальности
          </Link>
          <span>{settings.copyright}</span>
        </div>
      </footer>
    </Container>
  );
}
