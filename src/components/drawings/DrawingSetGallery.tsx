"use client";

/**
 * Previews of one drawing set: title with "Показано N из M", square tiles with the sample
 * number in the corner, "Показать ещё 24" and the lightbox. Remounted per set (key), so a new
 * set starts from its first page.
 */
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { sampleNumber } from "@/lib/catalog/drawings";
import type { DrawingSet, DrawingsPageCopy } from "@/lib/content/types";
import { fillTemplate } from "@/lib/format/template";

import { DrawingLightbox } from "./DrawingLightbox";

export function DrawingSetGallery({ set, copy }: { set: DrawingSet; copy: DrawingsPageCopy }) {
  const [visible, setVisible] = useState(copy.pageSize);
  const [open, setOpen] = useState<number | null>(null);
  const shown = set.images.slice(0, visible);
  const rest = set.images.length - shown.length;

  return (
    <>
      <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
        <h2 className="m-0 text-h2">{set.name}</h2>
        <span className="text-caption text-ink-muted" aria-live="polite">
          {fillTemplate(copy.shownLabel, { shown: shown.length, total: set.images.length })}
        </span>
      </div>
      <ul className="m-0 mt-4 grid list-none grid-cols-3 gap-2 p-0 sm:grid-cols-5 md:gap-3 xl:grid-cols-7">
        {shown.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={image.alt}
              className="relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-md border-0 bg-surface-alt p-0"
            >
              <MediaFrame
                image={image}
                sizes="(min-width: 1280px) 120px, (min-width: 640px) 20vw, 33vw"
                imageClassName="object-contain p-1"
              />
              <span className="absolute bottom-1.5 left-1.5 rounded-full bg-surface px-1.5 py-0.5 text-small font-semibold text-ink">
                № {sampleNumber(index)}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        {rest > 0 && (
          <Button variant="outline" onClick={() => setVisible((count) => count + copy.pageSize)}>
            {fillTemplate(copy.moreLabel, { count: Math.min(rest, copy.pageSize) })}
          </Button>
        )}
        <span className="text-caption text-ink-muted">{copy.zoomHint}</span>
      </div>
      <DrawingLightbox
        set={set}
        index={open}
        onIndexChange={setOpen}
        chooseLabel={copy.chooseLabel}
      />
    </>
  );
}
