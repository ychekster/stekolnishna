/**
 * "Другие разделы каталога" at the bottom of category pages: every section as a thumbnail
 * with its name in one sideways-scrolling row; the current one is outlined.
 */
import Link from "next/link";

import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import type { CatalogCategory } from "@/lib/content/types";
import { routes } from "@/lib/routes";

interface OtherSectionsStripProps {
  title: string;
  categories: CatalogCategory[];
  currentSlug: string;
}

export function OtherSectionsStrip({ title, categories, currentSlug }: OtherSectionsStripProps) {
  return (
    <Section labelledBy="other-sections-title">
      <h2 id="other-sections-title" className="m-0 text-h2 md:text-h1">
        {title}
      </h2>
      <ul className="-mx-4 mt-6 mb-0 scrollbar-none flex list-none gap-3 overflow-x-auto px-4 pt-1 pb-2 md:mx-0 md:mt-8 md:gap-4 md:px-1">
        {categories.map((category) => {
          const current = category.slug === currentSlug;
          return (
            <li key={category.slug} className="w-24 shrink-0 md:w-28">
              <Link
                href={routes.catalogCategory(category.slug)}
                aria-current={current ? "page" : undefined}
                className="group flex flex-col items-center gap-2.5 text-center text-ink"
              >
                <span
                  className={cn(
                    "block size-20 overflow-hidden rounded-lg border-2 md:size-24",
                    current ? "border-ink" : "border-transparent",
                  )}
                >
                  <MediaFrame
                    image={category.image}
                    sizes="96px"
                    imageClassName="transition-transform duration-400 group-hover:scale-105"
                  />
                </span>
                <span className="text-small font-medium group-hover:text-accent-strong md:text-caption">
                  {category.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
