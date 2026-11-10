/**
 * Caption of a client review: name, what was ordered, then stars, platform and date. The
 * platform links to the original review page, so a visitor can check that it is real.
 */
import type { Testimonial } from "@/lib/content/types";

export function ReviewMeta({ testimonial }: { testimonial: Testimonial }) {
  const { author, subject, rating, date, source } = testimonial;
  const origin = [source?.label, date].filter(Boolean).join(", ");

  return (
    <span className="block min-w-0">
      <span className="block text-label font-semibold text-ink">{author}</span>
      {subject && <span className="block text-caption text-ink-muted">{subject}</span>}
      {(rating !== undefined || origin) && (
        <span className="mt-1 flex flex-wrap items-center gap-x-2 text-caption text-ink-muted">
          {rating !== undefined && (
            <span className="text-accent-strong" aria-label={`Оценка ${rating} из 5`}>
              {"★".repeat(rating)}
            </span>
          )}
          {source ? (
            <a
              href={source.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="underline decoration-line-strong underline-offset-2 hover:text-accent-strong"
            >
              {origin}
            </a>
          ) : (
            origin && <span>{origin}</span>
          )}
        </span>
      )}
    </span>
  );
}
