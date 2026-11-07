/**
 * "Наша история": heading in a narrow left column, timeline of milestones on the right.
 */
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AboutPage } from "@/lib/content/types";

import { HistoryMilestone } from "./HistoryMilestone";

export function HistorySection({ history }: { history: AboutPage["history"] }) {
  return (
    <Section id="history" labelledBy="history-title" className="flex flex-wrap gap-6 md:gap-12">
      <div className="max-w-90 flex-[1_1_300px]">
        <SectionHeading id="history-title" title={history.title} lead={history.lead} />
      </div>
      <ol className="m-0 dividers-between min-w-0 flex-[999_1_560px] list-none p-0">
        {history.milestones.map((milestone) => (
          <HistoryMilestone key={milestone.title} milestone={milestone} />
        ))}
      </ol>
    </Section>
  );
}
