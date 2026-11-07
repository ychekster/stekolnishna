/**
 * "Реквизиты": company legal details for B2B clients, as a definition list in two columns
 * (one on mobile).
 */
import { Section } from "@/components/ui/Section";
import type { ContactsPage } from "@/lib/content/types";

export function RequisitesSection({ requisites }: { requisites: ContactsPage["requisites"] }) {
  return (
    <Section
      id="requisites"
      labelledBy="requisites-title"
      className="flex flex-wrap gap-6 border-t border-line pt-8 md:gap-12 md:pt-12"
    >
      <div className="max-w-85 flex-[1_1_280px]">
        <h2 id="requisites-title" className="m-0 text-h2">
          {requisites.title}
        </h2>
        <p className="m-0 mt-2 text-body text-ink-muted">{requisites.lead}</p>
      </div>
      <dl className="m-0 grid min-w-0 flex-[999_1_560px] grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
        {requisites.items.map((item) => (
          <div key={item.label}>
            <dt className="text-caption text-ink-muted">{item.label}</dt>
            <dd className="m-0 mt-1 text-label font-semibold">{item.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
