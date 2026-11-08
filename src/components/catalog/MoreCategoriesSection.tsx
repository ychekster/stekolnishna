/**
 * "Ещё в каталоге": tiles of the categories that have no product section on this page.
 */
import { Section } from "@/components/ui/Section";
import type { CatalogCategory, CatalogPage } from "@/lib/content/types";

import { CategoryTile } from "./CategoryTile";

interface MoreCategoriesSectionProps {
  more: CatalogPage["more"];
  categories: CatalogCategory[];
}

export function MoreCategoriesSection({ more, categories }: MoreCategoriesSectionProps) {
  if (categories.length === 0) return null;
  return (
    <Section id="more" labelledBy="more-title">
      <h2 id="more-title" className="m-0 text-h2 md:text-h1">
        {more.title} <span className="text-ink-muted">{more.subtitle}</span>
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 md:gap-4 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryTile key={category.slug} category={category} />
        ))}
      </div>
    </Section>
  );
}
