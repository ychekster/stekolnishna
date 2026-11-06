/**
 * "Контакты": phone, WhatsApp, email, address with hours on the left, map on the right.
 */
import { Section } from "@/components/ui/Section";
import { mailtoHref, telHref, whatsappHref } from "@/lib/contact-links";
import type { HomePage, SiteSettings } from "@/lib/content/types";

import { ContactItem } from "./ContactItem";
import { MapEmbed } from "./MapEmbed";

interface ContactsSectionProps {
  contacts: HomePage["contacts"];
  settings: SiteSettings;
}

export function ContactsSection({ contacts, settings }: ContactsSectionProps) {
  return (
    <Section id="contacts" labelledBy="contacts-title" className="flex flex-wrap gap-12">
      <address className="flex max-w-95 flex-[1_1_320px] flex-col gap-6 not-italic">
        <h2 id="contacts-title" className="m-0 text-h2 md:text-h1">
          {contacts.title}
        </h2>
        <ContactItem
          icon="phone"
          label="Телефон"
          value={settings.phoneDisplay}
          href={telHref(settings.phoneE164)}
        />
        <ContactItem
          icon="chat"
          label="WhatsApp"
          value="Написать в WhatsApp"
          href={whatsappHref(settings.whatsappNumber)}
          external
        />
        <ContactItem
          icon="mail"
          label="Email"
          value={settings.email}
          href={mailtoHref(settings.email)}
        />
        <ContactItem
          icon="pin"
          label="Производство и офис"
          value={settings.address}
          note={settings.workingHours}
        />
      </address>
      <MapEmbed map={settings.map} />
    </Section>
  );
}
