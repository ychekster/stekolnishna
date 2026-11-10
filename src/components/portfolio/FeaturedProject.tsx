/**
 * "Проект месяца" block of the portfolio page: a photo mosaic (one wide photo over two
 * small ones, "+N фото" on the last when there are more; a single photo fills the whole
 * mosaic) and a grey card with the story,
 * materials, works and two buttons. Stacks on phones.
 */
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { PortfolioPage, PortfolioProject } from "@/lib/content/types";
import { mosaicTiles } from "@/lib/portfolio/projects";
import { routes } from "@/lib/routes";

import { FeaturedList } from "./FeaturedList";

interface FeaturedProjectProps {
  project: PortfolioProject;
  featured: PortfolioPage["featured"];
  categoryLabel: string;
  labels: Pick<PortfolioPage["project"], "materialsTitle" | "worksTitle" | "morePhotosLabel">;
}

const TILES = 3;

export function FeaturedProject({
  project,
  featured,
  categoryLabel,
  labels,
}: FeaturedProjectProps) {
  const href = routes.project(project.slug);
  const photos = [project.cover, ...project.gallery].filter((photo) => photo !== null);
  const tiles = mosaicTiles(photos, TILES);
  const single = tiles.length === 1;
  const morePhotos = photos.length - TILES;

  return (
    <section
      aria-labelledby="featured-project-title"
      className="mt-8 grid grid-cols-1 gap-4 md:mt-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]"
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="grid auto-rows-[120px] grid-cols-2 gap-3 md:auto-rows-auto md:grid-rows-[340px_200px] md:gap-4"
      >
        {tiles.map((photo, index) => (
          <div
            key={index}
            className={
              index === 0
                ? single
                  ? "relative col-span-2 row-span-2 overflow-hidden rounded-lg"
                  : "relative col-span-2 row-span-2 overflow-hidden rounded-lg md:row-span-1"
                : "relative overflow-hidden rounded-md"
            }
          >
            <MediaFrame
              image={photo}
              sizes={
                index === 0 ? "(min-width: 1024px) 670px, 100vw" : "(min-width: 1024px) 330px, 50vw"
              }
            />
            {index === 0 && (
              <span className="absolute top-4 left-4 rounded-full bg-surface px-3 py-1.5 text-caption font-semibold text-accent-strong">
                {featured.label}
              </span>
            )}
            {index === TILES - 1 && morePhotos > 0 && (
              <span className="absolute inset-0 grid place-items-center bg-scrim text-title text-ink-inverse">
                {labels.morePhotosLabel.replace("{count}", String(morePhotos))}
              </span>
            )}
          </div>
        ))}
      </Link>

      <div className="flex flex-col rounded-lg bg-surface-alt p-6 md:p-9">
        <div className="text-caption text-ink-muted">
          {categoryLabel}, {project.place}, {project.year}
        </div>
        <h2 id="featured-project-title" className="m-0 mt-2.5 text-h2 md:text-form-title">
          {project.title}
        </h2>
        <p className="m-0 mt-3 text-body text-ink-muted">{project.excerpt}</p>
        <div className="mt-6 grid grid-cols-2 gap-5">
          <FeaturedList title={labels.materialsTitle} items={project.materials} />
          <FeaturedList title={labels.worksTitle} items={project.works} />
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-7">
          <Button href={href}>{featured.viewLabel}</Button>
          <Button href={routes.pageLeadForm} variant="outline">
            {featured.wantLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
