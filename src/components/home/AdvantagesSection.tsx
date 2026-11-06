/**
 * "Почему выбирают нас": 3×2 grid of numbered advantages on a tinted plate.
 */
import { Section } from "@/components/ui/Section";
import type { HomePage } from "@/lib/content/types";

import { AdvantageItem } from "./AdvantageItem";

export function AdvantagesSection({ advantages }: { advantages: HomePage["advantages"] }) {
  return (
    <Section
      id="advantages"
      labelledBy="advantages-title"
      className="rounded-lg bg-surface-alt px-4 py-8 md:px-12 md:py-14"
    >
      <h2 id="advantages-title" className="m-0 text-h2 md:text-h1">
        {advantages.title}
      </h2>
      <ol className="m-0 mt-6 grid list-none grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-12 p-0 md:mt-10">
        {advantages.items.map((advantage, index) => (
          <AdvantageItem key={advantage.title} advantage={advantage} index={index} />
        ))}
      </ol>
    </Section>
  );
}
