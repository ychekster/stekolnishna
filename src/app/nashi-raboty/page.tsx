/**
 * Portfolio "Наши работы" /nashi-raboty (spec §3.4). Composes sections in the order of the
 * design mockup "Наши работы — десктоп": hero with numbers, project of the month, all
 * projects with category filter, a client quote and the lead form. The folder name must
 * match `routes.portfolio`.
 */
import type { Metadata } from "next";

import { FeaturedProject } from "@/components/portfolio/FeaturedProject";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioTestimonial } from "@/components/portfolio/PortfolioTestimonial";
import { ProjectsBrowser } from "@/components/portfolio/ProjectsBrowser";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getPortfolioPage, getPortfolioProjects, getSiteSettings } from "@/lib/content";
import { routes } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolioPage();
  return { title: portfolio.seo.title, description: portfolio.seo.description };
}

export default async function PortfolioPage() {
  const [settings, portfolio, projects] = await Promise.all([
    getSiteSettings(),
    getPortfolioPage(),
    getPortfolioProjects(),
  ]);

  const featured = projects.find((project) => project.slug === portfolio.featured.projectSlug);
  const categoryLabel = (category: string) =>
    portfolio.categories.find((item) => item.category === category)?.label ?? "";

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Главная", href: routes.home }, { label: portfolio.name }]}
        className="mt-4 md:mt-8"
      />
      <PortfolioHero hero={portfolio.hero} />
      {featured && (
        <FeaturedProject
          project={featured}
          featured={portfolio.featured}
          categoryLabel={categoryLabel(featured.category)}
          labels={portfolio.project}
        />
      )}
      <ProjectsBrowser
        projects={projects}
        categories={portfolio.categories}
        list={portfolio.list}
      />
      <PortfolioTestimonial testimonial={portfolio.testimonial} />
      <LeadFormSection
        leadForm={portfolio.leadForm}
        source="portfolio"
        privacyPolicyHref={settings.privacyPolicyHref}
      />
    </>
  );
}
