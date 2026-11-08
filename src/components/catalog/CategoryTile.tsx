/**
 * Compact category link for "Ещё в каталоге": thumbnail, name, what is inside, price from.
 */
import Link from "next/link";

import { MediaFrame } from "@/components/ui/MediaFrame";
import type { CatalogCategory } from "@/lib/content/types";
import { formatPrice } from "@/lib/format/price";
import { routes } from "@/lib/routes";

export function CategoryTile({ category }: { category: CatalogCategory }) {
  return (
    <Link
      href={routes.catalogCategory(category.slug)}
      className="group flex items-center gap-4 rounded-lg bg-surface-alt p-4 text-ink"
    >
      <span className="block size-18 shrink-0 overflow-hidden rounded-md">
        <MediaFrame
          image={category.image}
          sizes="72px"
          imageClassName="transition-transform duration-400 group-hover:scale-105"
        />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-label font-semibold group-hover:text-accent-strong">
          {category.name}
        </span>
        <span className="mt-0.5 text-caption text-ink-muted">{category.description}</span>
        <span className="mt-1.5 text-caption font-semibold text-accent-strong">
          {formatPrice(category.price)}
        </span>
      </span>
    </Link>
  );
}
