/**
 * About page /o-kompanii (spec §3.5). Composes sections in the order of the design mockup
 * "О компании — десктоп" (history and team sections dropped: the company is new); all content comes from the content layer. Header, footer and
 * <main> come from the root layout. The folder name must match `routes.about`.
 */
import type { Metadata } from "next";

import { AboutHero } from "@/components/about/AboutHero";
import { DeliverySection } from "@/components/about/DeliverySection";
import { EquipmentSection } from "@/components/about/EquipmentSection";
import { GeographySection } from "@/components/about/GeographySection";
import { OwnProductionSection } from "@/components/about/OwnProductionSection";
import { ProductionSection } from "@/components/about/ProductionSection";
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
      <ProductionSection production={about.production} />
      <EquipmentSection equipment={about.equipment} />
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
