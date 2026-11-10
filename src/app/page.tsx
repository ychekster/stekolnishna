/**
 * Homepage. Composes sections in the order of the design (docs/design/HANDOFF.md);
 * all content comes from the content layer, nothing is hard-coded here. Category cards and
 * project tiles are picked by slug and filled from the catalog and the portfolio.
 * Header, footer and <main> come from the root layout.
 */
import { AboutSection } from "@/components/home/AboutSection";
import { AdvantagesSection } from "@/components/home/AdvantagesSection";
import { CatalogSection } from "@/components/home/CatalogSection";
import { ContactsSection } from "@/components/sections/ContactsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import type { Metadata } from "next";

import {
  getCatalogCategories,
  getHomePage,
  getPortfolioProjects,
  getSiteSettings,
} from "@/lib/content";
import { resolveHomeCategories, resolveHomeProjects } from "@/lib/home/featured";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage();
  return { title: home.seo.title, description: home.seo.description };
}

export default async function HomePage() {
  const [settings, home, categories, projects] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getCatalogCategories(),
    getPortfolioProjects(),
  ]);

  return (
    <>
      <HeroSection hero={home.hero} />
      <AboutSection about={home.about} stats={settings.companyStats} />
      <ServicesSection services={home.services} />
      <CatalogSection
        catalog={home.catalog}
        items={resolveHomeCategories(home.catalog.categories, categories)}
      />
      <AdvantagesSection advantages={home.advantages} />
      <ProjectsSection
        projects={home.projects}
        items={resolveHomeProjects(home.projects.projects, projects)}
      />
      <ProcessSection process={home.process} />
      <TestimonialsSection testimonials={home.testimonials} />
      <LeadFormSection
        leadForm={home.leadForm}
        source="homepage"
        privacyPolicyHref={settings.privacyPolicyHref}
      />
      <ContactsSection contacts={home.contacts} settings={settings} />
    </>
  );
}
