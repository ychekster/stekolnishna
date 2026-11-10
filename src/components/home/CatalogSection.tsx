/**
 * "Популярные категории": heading and arrows in a narrow left column, card carousel on
 * the right (4 visible on desktop, swipeable on mobile).
 */
import { Carousel, CarouselControls, CarouselTrack } from "@/components/ui/Carousel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CatalogItem, HomePage } from "@/lib/content/types";

import { CatalogCard } from "./CatalogCard";

interface CatalogSectionProps {
  catalog: HomePage["catalog"];
  /** Cards resolved from the catalog (src/lib/home/featured.ts). */
  items: CatalogItem[];
}

export function CatalogSection({ catalog, items }: CatalogSectionProps) {
  return (
    <Section id="catalog" labelledBy="catalog-title">
      <Carousel className="flex flex-col gap-6 md:flex-row md:gap-12">
        <div className="flex flex-col justify-between gap-6 md:max-w-75 md:flex-[1_1_260px]">
          <SectionHeading id="catalog-title" title={catalog.title} lead={catalog.lead} />
          <CarouselControls labels={{ prev: "Назад", next: "Вперёд" }} />
        </div>
        <CarouselTrack
          label={catalog.title}
          className="min-w-0 md:flex-[999_1_560px]"
          // 4 cards per row on desktop (3 gaps of 16px); ~1.4 cards on mobile hints at swiping.
          itemClassName="basis-[70%] md:basis-[calc((100%-48px)/4)]"
        >
          {items.map((item) => (
            <CatalogCard key={item.title} item={item} />
          ))}
        </CarouselTrack>
      </Carousel>
    </Section>
  );
}
