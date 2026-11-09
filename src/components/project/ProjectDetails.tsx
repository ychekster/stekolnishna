/**
 * Body of a project page (spec §3.4: description, materials, works): "О проекте" text and
 * the client's quote on the left; materials, works and the key numbers on the dark plate
 * on the right (below the text on phones).
 */
import { cn } from "@/lib/cn";
import type { PortfolioPage, PortfolioProject } from "@/lib/content/types";

import { ProjectListCard } from "./ProjectListCard";

interface ProjectDetailsProps {
  project: PortfolioProject;
  labels: Pick<PortfolioPage["project"], "aboutTitle" | "materialsTitle" | "worksTitle">;
}

export function ProjectDetails({ project, labels }: ProjectDetailsProps) {
  return (
    <section
      aria-labelledby="project-about-title"
      className="mt-12 flex flex-wrap gap-8 md:mt-18 md:gap-12"
    >
      <div className="min-w-0 flex-[999_1_520px]">
        <h2 id="project-about-title" className="m-0 text-h2 md:text-form-title">
          {labels.aboutTitle}
        </h2>
        {project.description.map((paragraph, index) => (
          <p
            key={paragraph}
            className={cn(
              "m-0 text-body text-ink-muted md:text-intro",
              index === 0 ? "mt-4" : "mt-3",
            )}
          >
            {paragraph}
          </p>
        ))}
        {project.testimonial && (
          <figure className="m-0 mt-8 rounded-lg bg-surface-alt p-6 md:mt-10 md:p-7">
            <blockquote className="m-0 text-title md:text-quote-sm">
              «{project.testimonial.quote}»
            </blockquote>
            <figcaption className="mt-3 text-nav font-normal text-ink-muted">
              {project.testimonial.author}
            </figcaption>
          </figure>
        )}
      </div>

      <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
        <ProjectListCard title={labels.materialsTitle} items={project.materials} />
        <ProjectListCard title={labels.worksTitle} items={project.works} />
        {project.facts.length > 0 && (
          <dl className="m-0 grid grid-cols-2 gap-4 rounded-lg bg-surface-inverse p-6 text-ink-inverse md:p-7">
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-small text-ink-inverse-muted">{fact.label}</dt>
                <dd className="m-0 mt-1 text-h2">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </aside>
    </section>
  );
}
