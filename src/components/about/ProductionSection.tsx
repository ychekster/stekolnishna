/**
 * "Производство": mosaic of workshop photos, then cards with production capabilities
 * (sheet size, thickness, drilling, lead time).
 */
import { PhotoTile } from "@/components/ui/PhotoTile";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import type { AboutPage } from "@/lib/content/types";

import { CapabilityCard } from "./CapabilityCard";

/**
 * Tile size by position: the first photo is 2×2, every third one after it spans two
 * columns. With 4 photos this gives the mockup's layout; with more, rows still fill up
 * on the 4-column grid, so editors can add photos without breaking the mosaic.
 */
function tileClass(index: number): string | false {
  if (index === 0) return "col-span-2 row-span-2";
  return index % 3 === 0 && "col-span-2";
}

export function ProductionSection({ production }: { production: AboutPage["production"] }) {
  return (
    <Section id="production" labelledBy="production-title">
      <SectionHeading id="production-title" title={production.title} lead={production.lead} />
      <ul className="m-0 mt-6 grid list-none auto-rows-[160px] grid-cols-2 gap-3 p-0 md:mt-10 md:auto-rows-[200px] md:grid-cols-4 md:gap-4">
        {production.photos.map((photo, index) => (
          <li key={photo.caption} className={cn(tileClass(index))}>
            <PhotoTile image={photo.image} caption={photo.caption} featured={index === 0} />
          </li>
        ))}
      </ul>
      <ul className="m-0 mt-6 grid list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-3 p-0 md:mt-12 md:gap-4">
        {production.capabilities.map((capability) => (
          <CapabilityCard key={capability.label} capability={capability} />
        ))}
      </ul>
    </Section>
  );
}
