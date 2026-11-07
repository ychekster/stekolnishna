/**
 * Row of four contact tiles: phones, Telegram bot (dark), email, address.
 * Contact values come from site settings; the page content adds labels and notes.
 */
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { ICON_STROKE } from "@/components/ui/Icon";
import { mailtoHref, telegramHref, telHref } from "@/lib/contact-links";
import type { ContactsPage, SiteSettings } from "@/lib/content/types";

import { ContactCard } from "./ContactCard";

interface ContactCardsProps {
  cards: ContactsPage["cards"];
  settings: SiteSettings;
}

const label = "text-caption text-ink-muted";
const mainValue = "mt-1 block text-lead font-semibold text-ink hover:text-accent-strong";

export function ContactCards({ cards, settings }: ContactCardsProps) {
  return (
    <address className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-3 not-italic md:mt-12 md:gap-4">
      <ContactCard icon="phone">
        <div className={label}>{cards.phone.label}</div>
        <a href={telHref(settings.phoneE164)} className={mainValue}>
          {settings.phoneDisplay}
        </a>
        <div className={label}>{cards.phone.mainNote}</div>
        {cards.phone.extraPhones.map((phone) => (
          <div key={phone.display + phone.note} className="mt-2">
            {phone.e164 ? (
              <a
                href={telHref(phone.e164)}
                className="block text-label font-semibold text-ink hover:text-accent-strong"
              >
                {phone.display}
              </a>
            ) : (
              <div className="text-label font-semibold">{phone.display}</div>
            )}
            <div className={label}>{phone.note}</div>
          </div>
        ))}
      </ContactCard>

      <ContactCard icon="telegram" tone="dark">
        <div className="text-caption text-ink-inverse-muted">{cards.telegram.label}</div>
        <div className="mt-1 text-lead font-semibold">{cards.telegram.title}</div>
        <p className="m-0 mt-1 mb-4 text-caption text-ink-inverse-muted">{cards.telegram.text}</p>
        <Button
          href={telegramHref(settings.telegramBot)}
          variant="light"
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
          icon={<ArrowRight size={16} strokeWidth={ICON_STROKE} aria-hidden="true" />}
        >
          {cards.telegram.buttonLabel}
        </Button>
      </ContactCard>

      <ContactCard icon="mail">
        <div className={label}>{cards.email.label}</div>
        <a
          href={mailtoHref(settings.email)}
          className="mt-1 block text-lead font-semibold break-all text-ink hover:text-accent-strong"
        >
          {settings.email}
        </a>
        <div className={label}>{cards.email.note}</div>
      </ContactCard>

      <ContactCard icon="pin">
        <div className={label}>{cards.address.label}</div>
        <div className="mt-1 text-lead font-semibold">{settings.address}</div>
        <div className={label}>{cards.address.note}</div>
      </ContactCard>
    </address>
  );
}
