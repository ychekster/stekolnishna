/**
 * Long SEO text of a category or landing page: title and first paragraph visible, the rest
 * folded in <details> "Развернуть". The folded text stays in the HTML for search engines.
 * `children` go under it (e.g. "Полезно: <landing>" on category pages).
 */
import { ArrowDown } from "lucide-react";
import type { ReactNode } from "react";

import { ICON_STROKE } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/cn";
import type { DescriptionBlock } from "@/lib/content/types";

interface SeoTextProps {
  title: string;
  blocks: DescriptionBlock[];
  moreLabel: string;
  /** Heading level size: `h2` for a standalone block, `h3`-like inside a two-column block. */
  size?: "section" | "compact";
  className?: string;
  children?: ReactNode;
}

export function SeoText({
  title,
  blocks,
  moreLabel,
  size = "section",
  className,
  children,
}: SeoTextProps) {
  const [first, ...rest] = blocks;
  return (
    <section aria-label={title} className={cn("max-w-190", className)}>
      <h2 className={cn("m-0", size === "section" ? "text-h2" : "text-title")}>{title}</h2>
      {first && <RichText blocks={[first]} className="mt-3" />}
      {rest.length > 0 && (
        <details className="group mt-3">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-label font-semibold text-accent-strong group-open:hidden hover:text-ink [&::-webkit-details-marker]:hidden">
            {moreLabel}
            <ArrowDown size={16} strokeWidth={ICON_STROKE} aria-hidden="true" />
          </summary>
          <RichText blocks={rest} />
        </details>
      )}
      {children}
    </section>
  );
}
