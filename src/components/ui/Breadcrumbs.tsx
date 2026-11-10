/**
 * Breadcrumbs at the top of inner pages: "Главная / О компании".
 * Pages pass only the trail after the homepage; the home link and the gap under the header
 * live here so every inner page starts the same way. The last item is the current page:
 * plain text with aria-current, not a link.
 */
import Link from "next/link";
import { Fragment } from "react";

import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page. */
  href?: string;
}

// UI chrome, not content (docs/data-model.md): the label is the same on every page.
const HOME: BreadcrumbItem = { label: "Главная", href: routes.home };

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav
      aria-label="Хлебные крошки"
      className={cn("mt-4 text-caption text-ink-muted md:mt-8", className)}
    >
      <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
        {[HOME, ...items].map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && (
              <li aria-hidden="true" role="presentation">
                /
              </li>
            )}
            <li>
              {item.href ? (
                <Link href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
