"use client";

/**
 * Products of a category with filters (design handoff "Страница категории"):
 * desktop: sidebar with tag checkboxes and the list of sections, "Найдено: N" and sort above
 * a three-column grid; phones: "Фильтры" button (bottom sheet with the same checkboxes), sort
 * select and a sideways row of quick tag chips, two-column grid.
 * Ticked tags narrow the list (all must match). State lives in the tab only.
 */
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { ProductGrid } from "@/components/catalog/ProductGrid";
import { FilterChip } from "@/components/ui/FilterChip";
import { ICON_STROKE } from "@/components/ui/Icon";
import { countTags, filterByTags, sortProducts } from "@/lib/catalog/filter";
import type {
  CatalogPage,
  CatalogProduct,
  CatalogSort,
  CategoryPageCopy,
  ProductTag,
  SiteSettings,
} from "@/lib/content/types";
import { fillTemplate } from "@/lib/format/template";

import { FilterSheet } from "./FilterSheet";
import { SectionsNav } from "./SectionsNav";
import { TagFilters } from "./TagFilters";

interface CategoryBrowserProps {
  products: CatalogProduct[];
  tags: CatalogPage["filters"]["tags"];
  copy: CategoryPageCopy;
  productLabels: CatalogPage["productCard"];
  sections: { slug: string; name: string }[];
  currentSlug: string;
  telegramBot: SiteSettings["telegramBot"];
}

export function CategoryBrowser({
  products,
  tags,
  copy,
  productLabels,
  sections,
  currentSlug,
  telegramBot,
}: CategoryBrowserProps) {
  const [selected, setSelected] = useState<ProductTag[]>([]);
  const [sort, setSort] = useState<CatalogSort>("popular");
  const sheetRef = useRef<HTMLDialogElement>(null);

  const counts = useMemo(() => countTags(products), [products]);
  const shown = useMemo(
    () => sortProducts(filterByTags(products, selected), sort),
    [products, selected, sort],
  );
  const tagLabels = Object.fromEntries(tags.map(({ tag, label }) => [tag, label]));
  const availableTags = tags.filter(({ tag }) => counts[tag] > 0);

  const toggle = (tag: ProductTag) =>
    setSelected((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  const reset = () => setSelected([]);

  const filters = (
    <TagFilters
      tags={tags}
      counts={counts}
      selected={selected}
      onToggle={toggle}
      onReset={reset}
      resetLabel={copy.resetFilters}
    />
  );

  const sortSelect = (
    <label className="flex items-center gap-1.5 text-nav font-normal text-ink-muted">
      <span className="hidden md:inline">{copy.sortLabel}:</span>
      <select
        value={sort}
        onChange={(event) => setSort(event.target.value as CatalogSort)}
        aria-label={copy.sortLabel}
        className="h-10 cursor-pointer rounded-full border border-line-strong bg-transparent px-3 text-nav text-ink md:h-auto md:border-0 md:px-0"
      >
        {copy.sorts.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <section
      aria-label={copy.filtersTitle}
      className="mt-8 grid grid-cols-1 gap-8 md:mt-12 lg:grid-cols-[260px_minmax(0,1fr)]"
    >
      <aside className="hidden flex-col gap-4 lg:flex">
        <div className="rounded-lg bg-surface-alt p-5">
          <h2 className="m-0 mb-3 text-label font-semibold">{copy.filtersTitle}</h2>
          {filters}
        </div>
        <SectionsNav title={copy.sectionsTitle} categories={sections} currentSlug={currentSlug} />
      </aside>

      <div className="min-w-0">
        {/* Phones and tablets: filters button, sort, quick chips */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => sheetRef.current?.showModal()}
            aria-haspopup="dialog"
            className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-ink px-4 text-nav text-surface"
          >
            <SlidersHorizontal size={16} strokeWidth={ICON_STROKE} aria-hidden="true" />
            {copy.filtersButton}
            {selected.length > 0 && <span className="opacity-70">({selected.length})</span>}
          </button>
          {sortSelect}
        </div>
        {availableTags.length > 0 && (
          <div className="-mx-4 mt-3 scrollbar-none flex gap-2 overflow-x-auto px-4 lg:hidden">
            {availableTags.map(({ tag, label }) => (
              <FilterChip
                key={tag}
                label={label}
                pressed={selected.includes(tag)}
                onClick={() => toggle(tag)}
              />
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-4 border-b border-line pb-3 lg:mt-0">
          <span className="text-caption text-ink-muted" aria-live="polite">
            {fillTemplate(copy.foundLabel, { count: shown.length })}
          </span>
          <div className="hidden lg:block">{sortSelect}</div>
        </div>

        {shown.length > 0 ? (
          <ProductGrid
            products={shown}
            columns="sidebar"
            labels={productLabels}
            telegramBot={telegramBot}
            details={{ label: copy.detailsLabel }}
            tagLabels={tagLabels}
          />
        ) : (
          <p className="m-0 mt-8 max-w-120 text-body text-ink-muted">{copy.emptyResults}</p>
        )}
      </div>

      <FilterSheet ref={sheetRef} title={copy.filtersTitle} applyLabel={copy.filtersApply}>
        {filters}
      </FilterSheet>
    </section>
  );
}
