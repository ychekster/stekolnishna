/**
 * Top of a project page: tags (category, place, year), the project title as H1 and a
 * "Хочу так же" button to the lead form below (beside the title on desktop).
 */
import { Button } from "@/components/ui/Button";
import type { PortfolioProject } from "@/lib/content/types";
import { routes } from "@/lib/routes";

interface ProjectHeroProps {
  project: PortfolioProject;
  categoryLabel: string;
  wantLabel: string;
}

export function ProjectHero({ project, categoryLabel, wantLabel }: ProjectHeroProps) {
  const tags = [categoryLabel, project.place, project.year];
  return (
    <section
      aria-labelledby="project-title"
      className="mt-3 flex flex-wrap items-end justify-between gap-6 md:mt-4"
    >
      <div className="max-w-205">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-accent-soft px-3 py-1.5 text-caption font-medium text-ink"
            >
              {tag}
            </li>
          ))}
        </ul>
        <h1 id="project-title" className="m-0 mt-4 text-display-sm md:text-display">
          {project.title}
        </h1>
      </div>
      <Button href={routes.pageLeadForm} size="lg">
        {wantLabel}
      </Button>
    </section>
  );
}
