/**
 * Photo mosaic of a project page (mockup "Проект — страница кейса"): one big photo, five
 * smaller ones around it, "+N фото" over the last tile when there are more. Four columns on
 * desktop, two on phones. Placeholders fill the mosaic until real photos are uploaded.
 *
 * Opening the full gallery (lightbox) is not built yet: there are no photos to browse
 * (docs/backlog.md).
 */
import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/lib/content/types";

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

  return (
    <section
      aria-label="Фотографии проекта"
      className="mt-6 grid auto-rows-[140px] grid-cols-2 gap-3 md:mt-10 md:auto-rows-[240px] md:grid-cols-4 md:gap-4"
    >
      {TILE_CLASSES.map((tileClass, index) => (
        <div key={index} className={cn("relative overflow-hidden", tileClass)}>
          <MediaFrame
            image={photos[index] ?? null}
            sizes={index === 0 ? "(min-width: 768px) 75vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
            preload={index === 0}
          />
          {index === TILE_CLASSES.length - 1 && morePhotos > 0 && (
            <span className="absolute inset-0 grid place-items-center bg-scrim text-title text-ink-inverse">
              {morePhotosLabel.replace("{count}", String(morePhotos))}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}
