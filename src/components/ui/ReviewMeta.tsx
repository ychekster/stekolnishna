/**
 * Caption of a client review: name, what was ordered, then platform and date as plain
 * text. Stars and the link to the original review were removed on the user's request
 * (2026-11-10); the rating and URL stay in the content in case they come back.
 */
import type { Testimonial } from "@/lib/content/types";

export function ReviewMeta({ testimonial }: { testimonial: Testimonial }) {
  const { author, subject, date, source } = testimonial;
  const origin = [source?.label, date].filter(Boolean).join(", ");

  return (
    <span className="block min-w-0">
      <span className="block text-label font-semibold text-ink">{author}</span>
      {subject && <span className="block text-caption text-ink-muted">{subject}</span>}
      {origin && <span className="mt-1 block text-caption text-ink-muted">{origin}</span>}
    </span>
  );
}
