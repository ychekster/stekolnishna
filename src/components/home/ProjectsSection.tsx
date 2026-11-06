/**
 * "Выполненные проекты": heading with "all projects" button, then a mosaic grid —
 * 4 columns on desktop with the first tile spanning 2×2, 2 columns on mobile.
 */
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import type { HomePage } from "@/lib/content/types";

import { ProjectTile } from "./ProjectTile";

export function ProjectsSection({ projects }: { projects: HomePage["projects"] }) {
  return (
    <Section id="projects" labelledBy="projects-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="projects-title" title={projects.title} lead={projects.lead} />
        <Button href={projects.allProjectsLink.href} variant="outline">
          {projects.allProjectsLink.label}
        </Button>
      </div>
      <ul className="m-0 mt-6 grid list-none auto-rows-[160px] grid-cols-2 gap-3 p-0 md:mt-10 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
        {projects.items.map((project, index) => (
          <li key={project.caption} className={cn(index === 0 && "col-span-2 row-span-2")}>
            <ProjectTile project={project} featured={index === 0} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
