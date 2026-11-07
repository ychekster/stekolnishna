/**
 * Map block. Renders the 2GIS / Yandex Maps embed when the owner has set its URL,
 * otherwise a placeholder with a pin, as in the design. Used on the homepage and the
 * Contacts page; the caller sets the size and rounding via `className`.
 */
import { MapPin } from "lucide-react";

import { ICON_STROKE } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { SiteSettings } from "@/lib/content/types";

interface MapEmbedProps {
  map: SiteSettings["map"];
  /** Size, flex and rounding of the block. */
  className?: string;
  /**
   * Where the placeholder pin stands. `right` (from md) keeps it clear of a panel laid
   * over the left part of the map, as on the Contacts page.
   */
  pin?: "center" | "right";
}

export function MapEmbed({ map, className, pin = "center" }: MapEmbedProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {map.embedUrl ? (
        <iframe
          src={map.embedUrl}
          title={`Карта: ${map.label}`}
          loading="lazy"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <>
          <div className="photo-placeholder absolute inset-0" />
          <div
            className={cn(
              "absolute top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center gap-2",
              pin === "right" ? "left-1/2 md:left-[62%]" : "left-1/2",
            )}
          >
            <span className="rounded-full bg-surface px-4 py-2 text-caption font-semibold shadow-pop">
              {map.label}
            </span>
            <span className="grid size-11 place-items-center rounded-full bg-surface-inverse text-ink-inverse">
              <MapPin size={20} strokeWidth={ICON_STROKE} aria-hidden="true" />
            </span>
          </div>
          <span className="absolute right-4 bottom-4 rounded-full bg-surface px-3 py-1 text-small text-ink-muted">
            Здесь встраивается карта 2ГИС или Яндекс
          </span>
        </>
      )}
    </div>
  );
}
