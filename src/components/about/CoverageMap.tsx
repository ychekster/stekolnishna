/**
 * Service-area picture for "География работы".
 *
 * Until the owner uploads a map image, it is drawn: placeholder pattern, a dashed circle
 * for the installation radius and the production pin in the middle (as in the mockup).
 * An uploaded image is expected to show the area itself, so the drawn overlay is skipped
 * and only the note stays. A static picture, not an interactive map: the real map with
 * the address lives in the contacts block (MapEmbed).
 */
import { MapPin } from "lucide-react";

import { ICON_STROKE } from "@/components/ui/Icon";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { AboutPage } from "@/lib/content/types";

export function CoverageMap({ map }: { map: AboutPage["geography"]["map"] }) {
  return (
    <div className="relative min-h-80 min-w-0 flex-[999_1_480px] overflow-hidden rounded-lg md:min-h-110">
      {map.image ? (
        <MediaFrame image={map.image} sizes="(min-width: 768px) 60vw, 100vw" cover />
      ) : (
        <>
          <div className="photo-placeholder absolute inset-0" />
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-accent-strong md:size-65"
          />
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center gap-2">
            <span className="rounded-full bg-surface px-4 py-2 text-caption font-semibold whitespace-nowrap shadow-pop">
              {map.label}
            </span>
            <span className="grid size-11 place-items-center rounded-full bg-surface-inverse text-ink-inverse">
              <MapPin size={20} strokeWidth={ICON_STROKE} aria-hidden="true" />
            </span>
          </div>
        </>
      )}
      <span className="absolute right-4 bottom-4 max-w-[calc(100%-32px)] rounded-full bg-surface px-3 py-1 text-small text-ink-muted">
        {map.note}
      </span>
    </div>
  );
}
