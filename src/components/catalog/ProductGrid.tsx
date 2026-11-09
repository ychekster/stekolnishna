/**
 * Responsive grid of product cards: two columns on phones, three on tablets, four on
 * desktop (`columns="wide"`); next to the category filters three at most (`"sidebar"`).
 * Shared by the catalog sections, search results, category pages and product shelves.
 */
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";
import type { CatalogProduct } from "@/lib/content/types";

import { ProductCard } from "./ProductCard";

type CardProps = Omit<ComponentProps<typeof ProductCard>, "product">;

interface ProductGridProps extends CardProps {
  products: CatalogProduct[];
  columns?: "wide" | "sidebar";
  className?: string;
}

export function ProductGrid({
  products,
  columns = "wide",
  className = "mt-6 md:mt-8",
  ...cardProps
}: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-4",
        columns === "wide" ? "md:grid-cols-3 lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} {...cardProps} />
      ))}
    </div>
  );
}
