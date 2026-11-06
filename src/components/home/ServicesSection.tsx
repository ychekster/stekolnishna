/**
 * "Направления работы": heading + responsive grid of service cards.
 */
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomePage } from "@/lib/content/types";

import { ServiceCard } from "./ServiceCard";

export function ServicesSection({ services }: { services: HomePage["services"] }) {
  return (
    <Section id="services" labelledBy="services-title">
      <SectionHeading id="services-title" title={services.title} lead={services.lead} />
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 md:mt-10">
        {services.items.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </Section>
  );
}
