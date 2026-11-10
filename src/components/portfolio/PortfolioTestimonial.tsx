/**
 * Big client quote on the portfolio page: grey block with an accent quote mark, the quote,
 * name, what was done, stars and platform, and a square photo of the object on the right.
 */
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ReviewMeta } from "@/components/ui/ReviewMeta";
import type { PortfolioPage } from "@/lib/content/types";

export function PortfolioTestimonial({
  testimonial,
}: {
  testimonial: PortfolioPage["testimonial"];
}) {
  return (
    <section
      aria-label="Отзыв клиента"
      className="mt-12 flex flex-wrap items-center gap-8 rounded-lg bg-surface-alt p-6 md:mt-24 md:gap-12 md:px-12 md:py-14"
    >
      <figure className="m-0 min-w-0 flex-[999_1_520px]">
        <div aria-hidden="true" className="h-8 text-quote-mark text-accent">
          “
        </div>
        <blockquote className="m-0 mt-4 text-quote-sm md:text-quote">
          {testimonial.quote}
        </blockquote>
        <figcaption className="mt-6">
          <ReviewMeta testimonial={testimonial} />
        </figcaption>
      </figure>
      <div className="aspect-square max-w-85 flex-[1_1_280px] overflow-hidden rounded-lg">
        <MediaFrame image={testimonial.image} sizes="340px" />
      </div>
    </section>
  );
}
