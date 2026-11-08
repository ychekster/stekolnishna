/**
 * Row of all categories with square thumbnails. Categories shown as sections on this page
 * jump to their section; the rest open their category page. Scrolls sideways on phones and
 * tablets; on desktop all twelve fit in one row.
 */
import Link from "next/link";

import { MediaFrame } from "@/components/ui/MediaFrame";
import type { CatalogCategory } from "@/lib/content/types";
import { routes } from "@/lib/routes";

interface CategoryStripProps {
  label: string;
  categories: CatalogCategory[];
  /** Slugs that have a section on this page (linked by anchor). */
  onPageSlugs: string[];
}

export function CategoryStrip({ label, categories, onPageSlugs }: CategoryStripProps) {
  return (
    <nav aria-label={label} className="mt-8 md:mt-14">
      <ul className="-mx-4 my-0 scrollbar-none flex list-none gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-12 lg:overflow-visible lg:px-0">
        {categories.map((category) => {
          const onPage = onPageSlugs.includes(category.slug);
          return (
            <li key={category.slug} className="w-24 shrink-0 lg:w-auto">
              <Link
                href={onPage ? `#${category.slug}` : routes.catalogCategory(category.slug)}
                className="group flex flex-col items-center gap-2.5 text-center text-ink"
              >
                <span className="block size-20 overflow-hidden rounded-lg xl:size-22">
                  <MediaFrame
                    image={category.image}
                    sizes="88px"
                    imageClassName="transition-transform duration-400 group-hover:scale-105"
                  />
                </span>
                <span className="text-caption font-medium">{category.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
