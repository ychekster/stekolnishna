/**
 * Breadcrumbs at the top of inner pages: "Главная / О компании".
 * The last item is the current page — plain text with aria-current, not a link.
 */
import Link from "next/link";
import { Fragment } from "react";

import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page. */
  href?: string;
}

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Хлебные крошки" className={cn("text-caption text-ink-muted", className)}>
      <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
        {items.map((item, index) => (
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
