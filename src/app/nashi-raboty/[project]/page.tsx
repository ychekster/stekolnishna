/**
 * Project page /nashi-raboty/[project] (spec §3.4, design mockup "Проект — страница кейса"):
 * tags and title, photo mosaic, description with materials and works, links to the
 * neighbouring projects and the lead form. All projects are prerendered from the content
 * layer; an unknown slug is a 404.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetails } from "@/components/project/ProjectDetails";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectPager } from "@/components/project/ProjectPager";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { BackLink } from "@/components/ui/BackLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  getPortfolioPage,
  getPortfolioProject,
  getPortfolioProjects,
  getSiteSettings,
} from "@/lib/content";
import { adjacentProjects } from "@/lib/portfolio/projects";
import { routes } from "@/lib/routes";

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((project) => ({ project: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/nashi-raboty/[project]">): Promise<Metadata> {
  const project = await getPortfolioProject((await params).project);
  if (!project) return {};
  return {
    title: project.seo?.title ?? `${project.title}: наши работы | Стекло&Центр`,
    description: project.seo?.description ?? project.excerpt,
  };
}

export default async function ProjectPage({ params }: PageProps<"/nashi-raboty/[project]">) {
  const { project: slug } = await params;
  const [settings, portfolio, projects, project] = await Promise.all([
    getSiteSettings(),
    getPortfolioPage(),
    getPortfolioProjects(),
    getPortfolioProject(slug),
  ]);
  if (!project) notFound();

  const labels = portfolio.project;
  const categoryLabel =
    portfolio.categories.find((item) => item.category === project.category)?.label ?? "";
  const neighbours = adjacentProjects(projects, project.slug);
  const photos = [project.cover, ...project.gallery].filter((photo) => photo !== null);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главная", href: routes.home },
          { label: portfolio.name, href: routes.portfolio },
          { label: project.title },
        ]}
        className="mt-4 md:mt-8"
      />
      <BackLink href={routes.portfolio} label={labels.backLabel} />
      <ProjectHero project={project} categoryLabel={categoryLabel} wantLabel={labels.wantLabel} />
      <ProjectGallery photos={photos} morePhotosLabel={labels.morePhotosLabel} />
      <ProjectDetails project={project} labels={labels} />
      {neighbours && (
        <ProjectPager
          previous={neighbours.previous}
          next={neighbours.next}
          previousLabel={labels.previousLabel}
          nextLabel={labels.nextLabel}
        />
      )}
      <LeadFormSection
        leadForm={labels.leadForm}
        source="portfolio"
        privacyPolicyHref={settings.privacyPolicyHref}
      />
    </>
  );
}
