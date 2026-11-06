/**
 * "Как мы работаем": heading and a 4:5 photo with an accent sticker on the left,
 * the list of steps on the right.
 */
import { AccentBadge } from "@/components/ui/AccentBadge";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomePage } from "@/lib/content/types";

import { ProcessStep } from "./ProcessStep";

export function ProcessSection({ process }: { process: HomePage["process"] }) {
  return (
    <Section id="steps" labelledBy="steps-title" className="flex flex-wrap gap-12">
      <div className="max-w-130 flex-[1_1_400px]">
        <SectionHeading id="steps-title" title={process.title} lead={process.lead} />
        <div className="relative mt-16 aspect-4/5 max-w-100">
          <MediaFrame image={process.image} sizes="400px" className="rounded-md" />
          {/* Sticker overlaps the photo's top-right corner, as in the design. */}
          <AccentBadge className="absolute -top-12 right-0 md:-right-6">
            {process.badge}
          </AccentBadge>
        </div>
      </div>
      <ol className="m-0 min-w-0 flex-[999_1_480px] list-none p-0">
        {process.steps.map((step) => (
          <ProcessStep key={step.title} step={step} />
        ))}
      </ol>
    </Section>
  );
}
