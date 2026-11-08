/**
 * "Цены на работы": heading on the left, price table on the right (stacked on mobile).
 * Built from divs with ARIA table roles so `dividers-between` draws lines only between
 * rows (same approach as the schedule on the Contacts page).
 */
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServicesPage } from "@/lib/content/types";

const row = "grid grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-3 md:gap-4";

export function PriceListSection({ prices }: { prices: ServicesPage["prices"] }) {
  return (
    <Section id="prices" labelledBy="prices-title" className="flex flex-wrap gap-6 md:gap-12">
      <SectionHeading
        id="prices-title"
        title={prices.title}
        lead={prices.lead}
        className="max-w-85 flex-[1_1_280px]"
      />
      <div
        role="table"
        aria-labelledby="prices-title"
        className="dividers-between min-w-0 flex-[999_1_560px]"
      >
        <div role="row" className={`${row} pb-3 text-caption text-ink-muted`}>
          <span role="columnheader">{prices.columns.name}</span>
          <span role="columnheader">{prices.columns.unit}</span>
          <span role="columnheader" className="text-right">
            {prices.columns.price}
          </span>
        </div>
        {prices.rows.map((item) => (
          <div
            key={item.name}
            role="row"
            className={`${row} py-3 text-caption md:py-4 md:text-body`}
          >
            <span role="rowheader" className="font-medium">
              {item.name}
            </span>
            <span role="cell" className="text-ink-muted">
              {item.unit}
            </span>
            <span role="cell" className="text-right font-semibold">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
