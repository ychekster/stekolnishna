/**
 * Photo mosaic of a project page (mockup "Проект — страница кейса"): one big photo, five
 * smaller ones around it, "+N фото" over the last tile when there are more. Four columns on
 * desktop, two on phones. Without photos placeholders fill the mosaic; with photos only the
 * real ones are shown, and a single photo takes the whole width.
 *
 * Opening the full gallery (lightbox) is not built yet: there are no photos to browse
 * (docs/backlog.md).
 */
import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/lib/content/types";
import { fillTemplate } from "@/lib/format/template";
import { mosaicTiles } from "@/lib/portfolio/projects";

/** Span of each tile, in mosaic order. */
const TILE_CLASSES = [
  "col-span-2 row-span-2 rounded-lg md:col-span-3",
  "rounded-md",
  "rounded-md",
  "col-span-2 rounded-md",
  "rounded-md",
  "rounded-md",
];

interface ProjectGalleryProps {
  photos: ImageAsset[];
  /** "+{count} фото". */
  morePhotosLabel: string;
}

export function ProjectGallery({ photos, morePhotosLabel }: ProjectGalleryProps) {
  const morePhotos = photos.length - TILE_CLASSES.length;
  const tiles = mosaicTiles(photos, TILE_CLASSES.length);
  const single = tiles.length === 1;

  return (
    <section
      aria-label="Фотографии проекта"
      className="mt-6 grid auto-rows-[140px] grid-cols-2 gap-3 md:mt-10 md:auto-rows-[240px] md:grid-cols-4 md:gap-4"
    >
      {tiles.map((photo, index) => (
        <div
          key={index}
          className={cn(
            "relative overflow-hidden",
            single ? "col-span-2 row-span-2 rounded-lg md:col-span-4" : TILE_CLASSES[index],
          )}
        >
          <MediaFrame
            image={photo}
            sizes={index === 0 ? "(min-width: 768px) 75vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
            preload={index === 0}
          />
          {index === TILE_CLASSES.length - 1 && morePhotos > 0 && (
            <span className="absolute inset-0 grid place-items-center bg-scrim text-title text-ink-inverse">
              {fillTemplate(morePhotosLabel, { count: morePhotos })}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}
