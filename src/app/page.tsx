/**
 * Homepage. Composes sections in the order of the design (docs/design/HANDOFF.md);
 * all content comes from the content layer, nothing is hard-coded here.
 */
import { AboutSection } from "@/components/home/AboutSection";
import { AdvantagesSection } from "@/components/home/AdvantagesSection";
import { CatalogSection } from "@/components/home/CatalogSection";
import { ContactsSection } from "@/components/home/ContactsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LeadFormSection } from "@/components/home/LeadFormSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";
import { getHomePage, getSiteSettings } from "@/lib/content";

export default async function HomePage() {
  const [settings, home] = await Promise.all([getSiteSettings(), getHomePage()]);

  return (
    <>
      <Container>
        <SiteHeader settings={settings} />
        <main>
          <HeroSection hero={home.hero} />
          <AboutSection about={home.about} />
          <ServicesSection services={home.services} />
          <CatalogSection catalog={home.catalog} />
          <AdvantagesSection advantages={home.advantages} />
          <ProjectsSection projects={home.projects} />
          <ProcessSection process={home.process} />
          <TestimonialsSection testimonials={home.testimonials} />
          <LeadFormSection
            leadForm={home.leadForm}
            privacyPolicyHref={settings.privacyPolicyHref}
          />
          <ContactsSection contacts={home.contacts} settings={settings} />
        </main>
        <SiteFooter settings={settings} />
      </Container>
      <FloatingWhatsApp number={settings.whatsappNumber} />
    </>
  );
}
