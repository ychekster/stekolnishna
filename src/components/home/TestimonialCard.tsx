/**
 * Client review card (design: TestimonialCard): accent quote mark, text, avatar or
 * initials, name and what was ordered.
 */
import Image from "next/image";

import type { Testimonial } from "@/lib/content/types";

/** First letters of the first two words: "Айгерим Сапарова" → "АС". */
function initials(name: string): string {
  return name
    .replace(/[[\]]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="m-0 flex h-full flex-col gap-4 rounded-md bg-surface-alt p-6">
      <div className="h-7 text-quote-mark text-accent" aria-hidden="true">
        “
      </div>
      <blockquote className="m-0 text-body text-ink">{testimonial.quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar.src}
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-nav font-semibold text-ink"
            aria-hidden="true"
          >
            {initials(testimonial.author)}
          </span>
        )}
        <span>
          <span className="block text-label font-semibold text-ink">{testimonial.author}</span>
          <span className="block text-caption text-ink-muted">{testimonial.subject}</span>
        </span>
      </figcaption>
    </figure>
  );
}
