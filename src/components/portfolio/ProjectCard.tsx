/**
 * Project in the portfolio grid: 4:3 photo with the category pill (and the photo count when
 * there are photos), title, place and year, key materials. Photo and title lead to the
 * project page.
 */
import Link from "next/link";

import { MediaFrame } from "@/components/ui/MediaFrame";
import type { PortfolioProject } from "@/lib/content/types";
import { fillTemplate } from "@/lib/format/template";
import { routes } from "@/lib/routes";

interface ProjectCardProps {
  project: PortfolioProject;
  categoryLabel: string;
  /** "{count} фото". */
  photosLabel: string;
}

export function ProjectCard({ project, categoryLabel, photosLabel }: ProjectCardProps) {
  const href = routes.project(project.slug);
  const photoCount = (project.cover ? 1 : 0) + project.gallery.length;

  return (
    <article>
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="group relative block aspect-[4/3] overflow-hidden rounded-lg"
      >
        <MediaFrame
          image={project.cover}
          sizes="(min-width: 1024px) 370px, (min-width: 768px) 50vw, 100vw"
          imageClassName="transition-transform duration-400 group-hover:scale-103"
        />
        <span className="absolute top-3 left-3 rounded-full bg-surface px-2.5 py-1 text-small font-semibold text-ink">
          {categoryLabel}
        </span>
        {photoCount > 0 && (
          <span className="absolute right-3 bottom-3 rounded-full bg-surface px-2.5 py-1 text-small text-ink-muted">
            {fillTemplate(photosLabel, { count: photoCount })}
          </span>
        )}
      </Link>
      <h3 className="m-0 mt-4 text-lead font-semibold">
        <Link href={href} className="text-ink hover:text-accent-strong">
          {project.title}
        </Link>
      </h3>
      <div className="mt-1 text-caption text-ink-muted">
        {project.place}, {project.year}
      </div>
      <div className="mt-2.5 text-caption text-ink">{project.summary}</div>
    </article>
  );
}
