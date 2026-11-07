/**
 * About page /o-kompanii (spec §3.5). Composes sections in the order of the design mockup
 * "О компании — десктоп"; all content comes from the content layer. Header, footer and
 * <main> come from the root layout. The folder name must match `routes.about`.
 */
import type { Metadata } from "next";

import { AboutHero } from "@/components/about/AboutHero";
import { DeliverySection } from "@/components/about/DeliverySection";
import { EquipmentSection } from "@/components/about/EquipmentSection";
import { GeographySection } from "@/components/about/GeographySection";
import { HistorySection } from "@/components/about/HistorySection";
import { OwnProductionSection } from "@/components/about/OwnProductionSection";
import { ProductionSection } from "@/components/about/ProductionSection";
import { TeamSection } from "@/components/about/TeamSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getAboutPage, getSiteSettings } from "@/lib/content";
import { routes } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  return { title: about.seo.title, description: about.seo.description };
}

export default async function AboutCompanyPage() {
  const [settings, about] = await Promise.all([getSiteSettings(), getAboutPage()]);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Главная", href: routes.home }, { label: about.name }]}
        className="mt-4 md:mt-8"
      />
      <AboutHero hero={about.hero} />
      <HistorySection history={about.history} />
      <ProductionSection production={about.production} />
      <EquipmentSection equipment={about.equipment} />
      <TeamSection team={about.team} />
      <OwnProductionSection ownProduction={about.ownProduction} />
      <GeographySection geography={about.geography} />
      <DeliverySection delivery={about.delivery} />
      <LeadFormSection
        leadForm={about.leadForm}
        source="about-visit"
        privacyPolicyHref={settings.privacyPolicyHref}
      />
    </>
  );
}
