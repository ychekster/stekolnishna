"use client";

/**
 * Catalog toolbar: filter chips, search field and sort select. Controlled: the state lives
 * in CatalogBrowser. Chips scroll sideways on phones instead of wrapping into rows.
 *
 * Sticky under the site header while the catalog is scrolled (user's request): no lines
 * while it sits in the page flow, a full-width divider once it is pinned, like the header.
 * Its height is published as `--catalog-toolbar-height`, so category anchors from the
 * strip land below it (`scroll-mt-catalog-toolbar`).
 */
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { FilterChip } from "@/components/ui/FilterChip";
import { ICON_STROKE } from "@/components/ui/Icon";
import type { CatalogQuery } from "@/lib/catalog/filter";
import { cn } from "@/lib/cn";
import type { CatalogPage, CatalogSort, ProductTag } from "@/lib/content/types";

interface CatalogToolbarProps {
  filters: CatalogPage["filters"];
  value: CatalogQuery;
  onChange: (value: CatalogQuery) => void;
}

export function CatalogToolbar({ filters, value, onChange }: CatalogToolbarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isPinned, setPinned] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const root = document.documentElement;

    // Pinned = the bar's top reached its sticky offset (the header height).
    const update = () => {
      const offset = parseFloat(getComputedStyle(bar).top) || 0;
      setPinned(bar.getBoundingClientRect().top <= offset + 0.5 && window.scrollY > 0);
    };
    const publishHeight = () =>
      root.style.setProperty("--catalog-toolbar-height", `${bar.offsetHeight}px`);

    update();
    publishHeight();
    const observer = new ResizeObserver(publishHeight);
    observer.observe(bar);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      root.style.removeProperty("--catalog-toolbar-height");
    };
  }, []);

  const chips: { tag: ProductTag | null; label: string }[] = [
    { tag: null, label: filters.allLabel },
    ...filters.tags,
  ];

  return (
    <div
      ref={barRef}
      className="sticky top-(--header-height) z-30 mt-6 bg-surface py-3 bleed-surface md:mt-8 md:py-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4">
        <div className="-mx-4 scrollbar-none flex max-w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 md:mx-0 md:max-w-none md:flex-wrap md:overflow-visible md:px-0">
          {chips.map(({ tag, label }) => (
            <FilterChip
              key={label}
              label={label}
              pressed={value.tag === tag}
              onClick={() => onChange({ ...value, tag })}
            />
          ))}
        </div>
        {/* Search and sort share one row on phones too: a pinned bar must stay low. */}
        <div className="flex items-center gap-3 md:gap-4">
          <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full bg-surface-alt px-4 text-ink-muted focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus md:w-60 md:flex-none">
            <Search size={16} strokeWidth={ICON_STROKE} aria-hidden="true" className="shrink-0" />
            <input
              type="search"
              value={value.query}
              onChange={(event) => onChange({ ...value, query: event.target.value })}
              placeholder={filters.searchLabel}
              aria-label={filters.searchLabel}
              className="w-full min-w-0 border-0 bg-transparent text-nav font-normal text-ink outline-none placeholder:text-ink-muted"
            />
          </label>
          <label className="flex shrink-0 items-center gap-1.5 text-nav font-normal text-ink-muted">
            <span className="hidden sm:inline">{filters.sortLabel}:</span>
            <select
              value={value.sort}
              onChange={(event) => onChange({ ...value, sort: event.target.value as CatalogSort })}
              aria-label={filters.sortLabel}
              className="cursor-pointer border-0 bg-transparent text-nav text-ink"
            >
              {filters.sorts.map((sort) => (
                <option key={sort.value} value={sort.value}>
                  {sort.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-px bleed-line transition-opacity duration-200",
          isPinned ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
