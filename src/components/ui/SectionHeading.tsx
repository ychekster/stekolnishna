/**
 * Section title + muted lead (design: SectionHeading).
 * On desktop the title is narrow (≈10 characters) so it wraps onto two lines, as in the design.
 */
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  /** Used as the heading id so the parent <section> can reference it via aria-labelledby. */
  id?: string;
  title: string;
  lead?: string;
  /** Disable the narrow title width (for headings that should stay on one line). */
  wide?: boolean;
  className?: string;
}

export function SectionHeading({ id, title, lead, wide, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 id={id} className={cn("m-0 text-h2 text-ink md:text-h1", !wide && "md:max-w-[10ch]")}>
        {title}
      </h2>
      {lead && (
        <p className="mt-2 max-w-80 text-caption text-ink-muted md:mt-4 md:text-body">{lead}</p>
      )}
    </div>
  );
}
