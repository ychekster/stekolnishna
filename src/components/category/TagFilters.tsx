/**
 * Filter checkboxes of a category page ("для дома", "для офиса"…) with product counts and
 * "Сбросить фильтры". Tags without products in this category are disabled. Controlled:
 * the state lives in CategoryBrowser; used in the desktop sidebar and the mobile sheet.
 */
import type { CatalogPage, ProductTag } from "@/lib/content/types";

interface TagFiltersProps {
  tags: CatalogPage["filters"]["tags"];
  counts: Record<ProductTag, number>;
  selected: ProductTag[];
  onToggle: (tag: ProductTag) => void;
  onReset: () => void;
  resetLabel: string;
}

export function TagFilters({
  tags,
  counts,
  selected,
  onToggle,
  onReset,
  resetLabel,
}: TagFiltersProps) {
  return (
    <div>
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {tags.map(({ tag, label }) => {
          const count = counts[tag];
          return (
            <li key={tag}>
              <label
                className={
                  count === 0
                    ? "flex cursor-not-allowed items-center gap-2.5 py-1.5 text-nav font-normal text-ink-muted opacity-60"
                    : "flex cursor-pointer items-center gap-2.5 py-1.5 text-nav font-normal text-ink"
                }
              >
                <input
                  type="checkbox"
                  checked={selected.includes(tag)}
                  disabled={count === 0}
                  onChange={() => onToggle(tag)}
                  className="size-4 shrink-0 accent-ink"
                />
                <span className="flex-1">{label}</span>
                <span className="text-caption text-ink-muted">{count}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={onReset}
        disabled={selected.length === 0}
        className="mt-3 cursor-pointer border-0 bg-transparent p-0 text-caption font-medium text-accent-strong hover:text-ink disabled:cursor-default disabled:opacity-50"
      >
        {resetLabel}
      </button>
    </div>
  );
}
