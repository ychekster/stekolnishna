/**
 * "График работы": heading on the left, a table of departments with weekday and Saturday
 * hours on the right, then the day-off pill and a note. Built from divs with ARIA table
 * roles so `dividers-between` can draw lines only between the rows.
 */
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ContactsPage } from "@/lib/content/types";

const row = "grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 md:gap-4";

export function ScheduleSection({ schedule }: { schedule: ContactsPage["schedule"] }) {
  return (
    <Section id="schedule" labelledBy="schedule-title" className="flex flex-wrap gap-6 md:gap-12">
      <SectionHeading
        id="schedule-title"
        title={schedule.title}
        lead={schedule.lead}
        className="max-w-85 flex-[1_1_280px]"
      />
      <div className="min-w-0 flex-[999_1_560px]">
        <div role="table" aria-labelledby="schedule-title" className="dividers-between">
          <div role="row" className={`${row} pb-3 text-caption text-ink-muted`}>
            <span role="columnheader">{schedule.columns.department}</span>
            <span role="columnheader">{schedule.columns.weekdays}</span>
            <span role="columnheader">{schedule.columns.saturday}</span>
          </div>
          {schedule.rows.map((item) => (
            <div
              key={item.department}
              role="row"
              className={`${row} py-4 text-caption md:py-5 md:text-body`}
            >
              <span role="rowheader" className="font-semibold">
                {item.department}
              </span>
              <span role="cell">{item.weekdays}</span>
              <span role="cell">{item.saturday}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-caption text-ink-muted">
          <span className="rounded-full bg-accent-soft px-3 py-1 font-medium text-ink">
            {schedule.dayOff}
          </span>
          <span>{schedule.note}</span>
        </div>
      </div>
    </Section>
  );
}
