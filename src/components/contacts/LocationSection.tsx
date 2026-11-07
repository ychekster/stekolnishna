/**
 * Map with the "Как добраться" panel. On desktop the panel floats over the left part of
 * the map (the pin moves right to stay visible); on mobile it sits under the map, since a
 * floating panel would cover a phone-sized map entirely.
 * Route buttons search the address in 2GIS / Yandex Maps (see `mapRouteHrefs`).
 */
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { ICON_STROKE } from "@/components/ui/Icon";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { mapRouteHrefs } from "@/lib/contact-links";
import type { ContactsPage, SiteSettings } from "@/lib/content/types";

interface LocationSectionProps {
  directions: ContactsPage["directions"];
  settings: SiteSettings;
}

export function LocationSection({ directions, settings }: LocationSectionProps) {
  const routeHrefs = mapRouteHrefs(settings.address);

  return (
    <section id="map" aria-labelledby="directions-title" className="mt-3 md:relative md:mt-6">
      <MapEmbed map={settings.map} pin="right" className="h-80 rounded-md md:h-130 md:rounded-lg" />
      <div className="mt-3 flex flex-col rounded-md bg-surface-alt p-6 md:absolute md:inset-y-6 md:left-6 md:mt-0 md:w-90 md:bg-surface md:p-7 md:shadow-pop">
        <div className="text-caption text-ink-muted">{directions.label}</div>
        <h2 id="directions-title" className="m-0 mt-1.5 text-h2">
          {settings.address}
        </h2>
        <p className="m-0 mt-3 text-body text-ink-muted">{directions.text}</p>
        <div className="mt-6 flex flex-col gap-2 md:mt-auto">
          <Button
            href={routeHrefs.twoGis}
            target="_blank"
            rel="noopener noreferrer"
            icon={<ArrowRight size={18} strokeWidth={ICON_STROKE} aria-hidden="true" />}
          >
            {directions.twoGisLabel}
          </Button>
          <Button
            href={routeHrefs.yandex}
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {directions.yandexLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
