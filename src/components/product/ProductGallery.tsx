"use client";

/**
 * Product photos: a big square photo with the "1 / 5" counter and arrows, thumbnails under
 * it (scroll sideways on phones). One photo: no arrows or thumbnails; none: placeholder.
 */
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

import { ICON_STROKE } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/lib/content/types";

export function ProductGallery({ photos }: { photos: ImageAsset[] }) {
  const [index, setIndex] = useState(0);
  const count = photos.length;
  const go = (step: number) => setIndex((current) => (current + step + count) % count);

  return (
    <div className="min-w-0">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-alt">
        <MediaFrame
          image={photos[index] ?? null}
          sizes="(min-width: 1024px) 560px, 100vw"
          preload={index === 0}
        />
        {count > 1 && (
          <>
            <span className="absolute bottom-4 left-4 rounded-full bg-surface px-2.5 py-1 text-small font-semibold">
              {index + 1} / {count}
            </span>
            <div className="absolute right-4 bottom-4 flex gap-2">
              <IconButton aria-label="Предыдущее фото" variant="light" onClick={() => go(-1)}>
                <ArrowLeft size={16} strokeWidth={ICON_STROKE} aria-hidden="true" />
              </IconButton>
              <IconButton aria-label="Следующее фото" variant="solid" onClick={() => go(1)}>
                <ArrowRight size={16} strokeWidth={ICON_STROKE} aria-hidden="true" />
              </IconButton>
            </div>
          </>
        )}
      </div>
      {count > 1 && (
        <ul className="-mx-4 mt-3 mb-0 scrollbar-none flex list-none gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
          {photos.map((photo, photoIndex) => (
            <li key={photo.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(photoIndex)}
                aria-label={`Фото ${photoIndex + 1}`}
                aria-current={photoIndex === index ? "true" : undefined}
                className={cn(
                  "block size-16 cursor-pointer overflow-hidden rounded-md border-2 p-0 md:size-20",
                  photoIndex === index ? "border-ink" : "border-transparent",
                )}
              >
                <MediaFrame image={photo} sizes="80px" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
