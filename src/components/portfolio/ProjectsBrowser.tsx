"use client";

/**
 * "Все проекты": heading with the shown count, category chips with counters (spec §3.4
 * filters), the project grid and "Показать ещё". State lives in the tab only; projects are
 * few enough to filter in the browser (move to a Payload query if the list grows).
 * Chips scroll sideways on phones instead of wrapping into a tall block.
 */
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { FilterChip } from "@/components/ui/FilterChip";
import type { PortfolioPage, PortfolioProject, ProjectCategory } from "@/lib/content/types";
import { countByCategory, filterProjects } from "@/lib/portfolio/projects";

import { ProjectCard } from "./ProjectCard";

interface ProjectsBrowserProps {
  projects: PortfolioProject[];
  categories: PortfolioPage["categories"];
  list: PortfolioPage["list"];
}

export function ProjectsBrowser({ projects, categories, list }: ProjectsBrowserProps) {
  const [category, setCategory] = useState<ProjectCategory | null>(null);
  const [visible, setVisible] = useState(list.pageSize);

  const counts = useMemo(() => countByCategory(projects), [projects]);
  const labels = useMemo(
    () => Object.fromEntries(categories.map((item) => [item.category, item.label])),
    [categories],
  );
  const shown = filterProjects(projects, category);

  const pick = (next: ProjectCategory | null) => {
    setCategory(next);
    setVisible(list.pageSize);
  };

  return (
    <section aria-labelledby="projects-title" className="mt-12 md:mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <h2 id="projects-title" className="m-0 text-h2 md:text-h1">
          {list.title}
        </h2>
        <span className="text-caption text-ink-muted" aria-live="polite">
          {list.shownLabel
            .replace("{shown}", String(Math.min(visible, shown.length)))
            .replace("{total}", String(shown.length))}
        </span>
      </div>

      <div
        role="group"
        aria-label="Фильтр по категориям"
        className="-mx-4 mt-6 scrollbar-none flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        <FilterChip
          label={list.allLabel}
          count={projects.length}
          pressed={category === null}
          onClick={() => pick(null)}
        />
        {categories
          .filter((item) => counts[item.category])
          .map((item) => (
            <FilterChip
              key={item.category}
              label={item.label}
              count={counts[item.category]}
              pressed={category === item.category}
              onClick={() => pick(item.category)}
            />
          ))}
      </div>

      <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-x-4 gap-y-8 p-0 md:mt-8 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
        {shown.slice(0, visible).map((project) => (
          <li key={project.slug}>
            <ProjectCard
              project={project}
              categoryLabel={labels[project.category] ?? ""}
              photosLabel={list.photosLabel}
            />
          </li>
        ))}
      </ul>

      {visible < shown.length && (
        <div className="mt-8 flex justify-center md:mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setVisible((count) => count + list.pageSize)}
          >
            {list.moreLabel}
          </Button>
        </div>
      )}
    </section>
  );
}
