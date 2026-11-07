/**
 * "Почему своё производство — это выгодно вам": dark plate, heading on the left,
 * 2×2 grid of numbered benefits on the right (one column on mobile).
 */
import { Section } from "@/components/ui/Section";
import type { AboutPage } from "@/lib/content/types";

import { BenefitItem } from "./BenefitItem";

export function OwnProductionSection({
  ownProduction,
}: {
  ownProduction: AboutPage["ownProduction"];
}) {
  return (
    <Section
      id="own-production"
      labelledBy="own-production-title"
      className="flex flex-wrap gap-6 rounded-lg bg-surface-inverse px-4 py-8 text-ink-inverse md:gap-12 md:px-12 md:py-14"
    >
      <h2 id="own-production-title" className="m-0 max-w-90 flex-[1_1_280px] text-h2 md:text-h1">
        {ownProduction.title}
      </h2>
      <ol className="m-0 grid min-w-0 flex-[999_1_560px] list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 md:gap-x-12 md:gap-y-8">
        {ownProduction.benefits.map((benefit, index) => (
          <BenefitItem key={benefit.title} benefit={benefit} index={index} />
        ))}
      </ol>
    </Section>
  );
}
