/**
 * "Отзывы клиентов": heading with arrows on the right, carousel of review cards
 * (3 visible on desktop, swipeable on mobile).
 */
import { Carousel, CarouselControls, CarouselTrack } from "@/components/ui/Carousel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomePage } from "@/lib/content/types";

import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection({ testimonials }: { testimonials: HomePage["testimonials"] }) {
  return (
    <Section id="reviews" labelledBy="reviews-title">
      <Carousel>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="reviews-title" title={testimonials.title} />
          <CarouselControls labels={{ prev: "Предыдущие отзывы", next: "Следующие отзывы" }} />
        </div>
        <CarouselTrack
          label={testimonials.title}
          className="mt-6 md:mt-10"
          // 3 cards per row on desktop (2 gaps of 16px).
          itemClassName="basis-[85%] md:basis-[calc((100%-32px)/3)]"
        >
          {testimonials.items.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </CarouselTrack>
      </Carousel>
    </Section>
  );
}
