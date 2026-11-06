/**
 * Map block. Renders the 2GIS / Yandex Maps embed when the owner has set its URL,
 * otherwise a placeholder with a pin, as in the design.
 */
import { MapPin } from "lucide-react";

import { ICON_STROKE } from "@/components/ui/Icon";
import type { SiteSettings } from "@/lib/content/types";

export function MapEmbed({ map }: { map: SiteSettings["map"] }) {
  return (
    <div className="relative min-h-80 min-w-0 flex-[999_1_480px] overflow-hidden rounded-lg md:min-h-105">
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
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center gap-2">
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
