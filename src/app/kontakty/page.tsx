/**
 * Contacts page /kontakty (spec §3.6). Composes sections in the order of the design mockup
 * "Контакты — десктоп"; contacts come from site settings, the page copy from the content
 * layer. Header, footer and <main> come from the root layout. The folder name must match
 * `routes.contacts`.
 */
import type { Metadata } from "next";

import { ContactCards } from "@/components/contacts/ContactCards";
import { ContactsHero } from "@/components/contacts/ContactsHero";
import { LocationSection } from "@/components/contacts/LocationSection";
import { RequisitesSection } from "@/components/contacts/RequisitesSection";
import { ScheduleSection } from "@/components/contacts/ScheduleSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getContactsPage, getSiteSettings } from "@/lib/content";
import { routes } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const contacts = await getContactsPage();
  return { title: contacts.seo.title, description: contacts.seo.description };
}

export default async function ContactsPage() {
  const [settings, contacts] = await Promise.all([getSiteSettings(), getContactsPage()]);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Главная", href: routes.home }, { label: contacts.name }]}
        className="mt-4 md:mt-8"
      />
      <ContactsHero hero={contacts.hero} />
      <ContactCards cards={contacts.cards} settings={settings} />
      <LocationSection directions={contacts.directions} settings={settings} />
      <ScheduleSection schedule={contacts.schedule} />
      <LeadFormSection
        leadForm={contacts.leadForm}
        source="contacts"
        privacyPolicyHref={settings.privacyPolicyHref}
      />
      <RequisitesSection requisites={contacts.requisites} />
    </>
  );
}
