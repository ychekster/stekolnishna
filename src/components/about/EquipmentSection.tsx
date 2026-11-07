/**
 * "Оборудование": tinted plate with the heading on the left and a two-column list of
 * machines on the right.
 */
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AboutPage } from "@/lib/content/types";

import { EquipmentItem } from "./EquipmentItem";

export function EquipmentSection({ equipment }: { equipment: AboutPage["equipment"] }) {
  return (
    <Section
      id="equipment"
      labelledBy="equipment-title"
      className="flex flex-wrap gap-6 rounded-lg bg-surface-alt px-4 py-8 md:gap-12 md:px-12 md:py-14"
    >
      <SectionHeading
        id="equipment-title"
        title={equipment.title}
        lead={equipment.lead}
        wide
        className="max-w-80 flex-[1_1_280px]"
      />
      <ul className="m-0 grid min-w-0 flex-[999_1_560px] list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-x-8 p-0">
        {equipment.items.map((item) => (
          <EquipmentItem key={item.title} item={item} />
        ))}
      </ul>
    </Section>
  );
}
