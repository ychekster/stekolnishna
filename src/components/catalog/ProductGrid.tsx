/**
 * Responsive grid of product cards: two columns on phones, three on tablets, four on
 * desktop. Shared by the category sections and the search results.
 */
import type { CatalogPage, CatalogProduct, SiteSettings } from "@/lib/content/types";

import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: CatalogProduct[];
  labels: CatalogPage["productCard"];
  telegramBot: SiteSettings["telegramBot"];
}

export function ProductGrid({ products, labels, telegramBot }: ProductGridProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 md:mt-8 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.slug}
          product={product}
          labels={labels}
          telegramBot={telegramBot}
        />
      ))}
    </div>
  );
}
