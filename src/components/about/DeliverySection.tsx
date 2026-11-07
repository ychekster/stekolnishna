/**
 * "Доставка и монтаж": heading and two tinted cards with the terms.
 */
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AboutPage } from "@/lib/content/types";

import { TermsCard } from "./TermsCard";

export function DeliverySection({ delivery }: { delivery: AboutPage["delivery"] }) {
  return (
    <Section id="delivery" labelledBy="delivery-title">
      <SectionHeading id="delivery-title" title={delivery.title} lead={delivery.lead} />
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-3 md:mt-10 md:gap-4">
        {delivery.cards.map((card) => (
          <TermsCard key={card.title} card={card} />
        ))}
      </div>
    </Section>
  );
}
