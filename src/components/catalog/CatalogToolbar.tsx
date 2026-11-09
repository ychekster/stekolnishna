/**
 * Catalog toolbar: filter chips, search field and sort select. Controlled: the state lives
 * in CatalogBrowser. Chips scroll sideways on phones instead of wrapping into rows.
 */
import { Search } from "lucide-react";

import { FilterChip } from "@/components/ui/FilterChip";
import { ICON_STROKE } from "@/components/ui/Icon";
import type { CatalogQuery } from "@/lib/catalog/filter";
import type { CatalogPage, CatalogSort, ProductTag } from "@/lib/content/types";

interface CatalogToolbarProps {
  filters: CatalogPage["filters"];
  value: CatalogQuery;
  onChange: (value: CatalogQuery) => void;
}

export function CatalogToolbar({ filters, value, onChange }: CatalogToolbarProps) {
  const chips: { tag: ProductTag | null; label: string }[] = [
    { tag: null, label: filters.allLabel },
    ...filters.tags,
  ];

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4 md:mt-10">
      <div className="-mx-4 scrollbar-none flex max-w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 md:mx-0 md:max-w-none md:flex-wrap md:overflow-visible md:px-0">
        {chips.map(({ tag, label }) => {
          return (
            <FilterChip
              key={label}
              label={label}
              pressed={value.tag === tag}
              onClick={() => onChange({ ...value, tag })}
            />
          );
        })}
      </div>
      <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-3 md:w-auto">
        <label className="flex h-10 w-full items-center gap-2 rounded-full bg-surface-alt px-4 text-ink-muted focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus sm:w-60">
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
        <label className="flex items-center gap-1.5 text-nav font-normal text-ink-muted">
          {filters.sortLabel}:
          <select
            value={value.sort}
            onChange={(event) => onChange({ ...value, sort: event.target.value as CatalogSort })}
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
  );
}
