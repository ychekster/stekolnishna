/**
 * List of all catalog sections in the category sidebar (desktop); the current one is
 * highlighted. On phones the sections are reachable from the strip at the bottom of the page.
 */
import Link from "next/link";

import { cn } from "@/lib/cn";
import type { CatalogCategory } from "@/lib/content/types";
import { routes } from "@/lib/routes";

interface SectionsNavProps {
  title: string;
  categories: { slug: string; name: CatalogCategory["name"] }[];
  currentSlug: string;
  className?: string;
}

export function SectionsNav({ title, categories, currentSlug, className }: SectionsNavProps) {
  return (
    <nav aria-label={title} className={cn("rounded-lg bg-surface-alt p-3", className)}>
      <h2 className="m-0 px-3 pt-2 pb-2 text-label font-semibold">{title}</h2>
      <ul className="m-0 list-none p-0">
        {categories.map((category) => {
          const current = category.slug === currentSlug;
          return (
            <li key={category.slug}>
              <Link
                href={routes.catalogCategory(category.slug)}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "block rounded-sm px-3 py-1.5 text-caption",
                  current ? "bg-ink text-surface" : "text-ink hover:bg-surface",
                )}
              >
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
