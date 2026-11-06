/**
 * Catalog category card (design: CatalogCard): 3:4 photo, title, "от [цена] ₸".
 */
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { CatalogItem } from "@/lib/content/types";
import { formatPrice } from "@/lib/format/price";

export function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <a href={item.href} className="group block rounded-md">
      <div className="aspect-3/4 overflow-hidden rounded-md bg-surface-alt">
        <MediaFrame
          image={item.image}
          sizes="(min-width: 768px) 25vw, 70vw"
          imageClassName="transition-transform duration-400 group-hover:scale-103"
        />
      </div>
      <div className="mt-3 text-label text-ink">{item.title}</div>
      <div className="mt-0.5 text-caption text-ink-muted">{formatPrice(item.price)}</div>
    </a>
  );
}
