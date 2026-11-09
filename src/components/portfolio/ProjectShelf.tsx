/**
 * A few portfolio projects under a heading with "Все проекты →": "Наши работы" on SEO
 * landings (three in a row) and next to the text on category pages without products (two).
 */
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ICON_STROKE } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { PortfolioPage, PortfolioProject } from "@/lib/content/types";
import { routes } from "@/lib/routes";

import { ProjectCard } from "./ProjectCard";

interface ProjectShelfProps {
  title: string;
  allLabel: string;
  projects: PortfolioProject[];
  categories: PortfolioPage["categories"];
  photosLabel: string;
  /** "section": big heading, 3 columns; "compact": small heading, 2 columns. */
  size?: "section" | "compact";
  className?: string;
}

export function ProjectShelf({
  title,
  allLabel,
  projects,
  categories,
  photosLabel,
  size = "section",
  className,
}: ProjectShelfProps) {
  const label = (project: PortfolioProject) =>
    categories.find((item) => item.category === project.category)?.label ?? "";
  return (
    <section aria-label={title} className={className}>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <h2 className={cn("m-0", size === "section" ? "text-h2 md:text-h1" : "text-h2")}>
          {title}
        </h2>
        <Link
          href={routes.portfolio}
          className="inline-flex items-center gap-1 text-label text-accent-strong hover:text-ink"
        >
          {allLabel}
          <ArrowRight size={16} strokeWidth={ICON_STROKE} aria-hidden="true" />
        </Link>
      </div>
      <ul
        className={cn(
          "m-0 mt-6 grid list-none grid-cols-1 gap-x-4 gap-y-8 p-0",
          size === "section" ? "md:mt-8 md:grid-cols-3" : "sm:grid-cols-2",
        )}
      >
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard
              project={project}
              categoryLabel={label(project)}
              photosLabel={photosLabel}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
