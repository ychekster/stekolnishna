/**
 * Grid of all service cards: one column on phones, two on tablets, three on desktop.
 */
import type { ServicesPage } from "@/lib/content/types";

import { ServiceCard } from "./ServiceCard";

interface ServiceListProps {
  offers: ServicesPage["offers"];
  orderHref: string;
}

export function ServiceList({ offers, orderHref }: ServiceListProps) {
  return (
    <section
      aria-label={offers.navLabel}
      className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 md:mt-14 md:grid-cols-2 lg:grid-cols-3"
    >
      {offers.items.map((offer, index) => (
        <ServiceCard
          key={offer.slug}
          offer={offer}
          number={index + 1}
          priceLabel={offers.priceLabel}
          orderLabel={offers.orderLabel}
          orderHref={orderHref}
        />
      ))}
    </section>
  );
}
