/**
 * "География работы": heading and the list of regions on the left, service-area map on
 * the right.
 */
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AboutPage } from "@/lib/content/types";

import { CoverageMap } from "./CoverageMap";

export function GeographySection({ geography }: { geography: AboutPage["geography"] }) {
  return (
    <Section id="geography" labelledBy="geography-title" className="flex flex-wrap gap-6 md:gap-12">
      <div className="max-w-100 flex-[1_1_320px]">
        <SectionHeading id="geography-title" title={geography.title} lead={geography.lead} />
        <ul className="m-0 mt-6 flex list-none flex-col gap-5 p-0 md:mt-8">
          {geography.regions.map((region) => (
            <li key={region.name}>
              <h3 className="m-0 text-title">{region.name}</h3>
              <p className="m-0 mt-1 text-body text-ink-muted">{region.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <CoverageMap map={geography.map} />
    </Section>
  );
}
