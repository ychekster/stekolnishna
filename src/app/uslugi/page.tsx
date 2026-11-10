/**
 * Services page /uslugi (spec §3.3). Composes sections in the order of the design mockup
 * "Услуги — десктоп", minus its price calculator (docs/decisions/0003). All content comes
 * from the content layer; header, footer and <main> come from the root layout. The folder
 * name must match `routes.services`.
 */
import type { Metadata } from "next";

import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { PhotoOrderSection } from "@/components/services/PhotoOrderSection";
import { PriceListSection } from "@/components/services/PriceListSection";
import { ServicesBrowser } from "@/components/services/ServicesBrowser";
import { ServicesHero } from "@/components/services/ServicesHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getServicesPage, getSiteSettings } from "@/lib/content";
import { routes } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const services = await getServicesPage();
  return { title: services.seo.title, description: services.seo.description };
}

export default async function ServicesPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServicesPage()]);

  return (
    <>
      <Breadcrumbs items={[{ label: services.name }]} />
      <ServicesHero hero={services.hero} />
      {/* "Заказать" opens the lead form of this page, not the homepage one. */}
      <ServicesBrowser offers={services.offers} orderHref={routes.pageLeadForm} />
      <PhotoOrderSection photoOrder={services.photoOrder} telegramBot={settings.telegramBot} />
      <PriceListSection prices={services.prices} />
      <LeadFormSection
        leadForm={services.leadForm}
        source="services"
        privacyPolicyHref={settings.privacyPolicyHref}
      />
    </>
  );
}
