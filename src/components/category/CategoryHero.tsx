/**
 * Top of a category page with products: two-tone H1 ("Зеркала и панно. Настенные…"), the
 * description, chips with the "from" price, lead time and product count, and the cover
 * photo on the right (hidden on phones, where the products matter more).
 */
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { CatalogCategory } from "@/lib/content/types";

import { InfoChips } from "./InfoChips";

interface CategoryHeroProps {
  category: CatalogCategory;
  chips: string[];
}

export function CategoryHero({ category, chips }: CategoryHeroProps) {
  return (
    <section
      aria-labelledby="category-title"
      className="mt-4 grid grid-cols-1 items-start gap-8 md:mt-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-12"
    >
      <div>
        <h1 id="category-title" className="m-0 text-display-sm md:text-display">
          {category.name}. <span className="text-ink-muted">{category.tagline}</span>
        </h1>
        <p className="m-0 mt-4 max-w-150 text-body text-ink-muted md:text-intro">
          {category.description}
        </p>
        <InfoChips items={chips} className="mt-5" />
      </div>
      <div className="hidden aspect-4/3 overflow-hidden rounded-lg md:block">
        <MediaFrame image={category.image} sizes="460px" preload />
      </div>
    </section>
  );
}
