/**
 * A titled row of product cards with a "Весь раздел →" link: "Похожие товары" on product
 * pages, "Душевые из каталога" on SEO landings. Cards lead to the product pages.
 */
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ICON_STROKE } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import type { CatalogPage, CatalogProduct, ProductTag, SiteSettings } from "@/lib/content/types";

import { ProductGrid } from "./ProductGrid";

interface ProductShelfProps {
  title: string;
  link: { label: string; href: string };
  products: CatalogProduct[];
  labels: CatalogPage["productCard"];
  detailsLabel: string;
  tagLabels: Partial<Record<ProductTag, string>>;
  telegramBot: SiteSettings["telegramBot"];
}

export function ProductShelf({
  title,
  link,
  products,
  labels,
  detailsLabel,
  tagLabels,
  telegramBot,
}: ProductShelfProps) {
  return (
    <Section labelledBy="product-shelf-title">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <h2 id="product-shelf-title" className="m-0 text-h2 md:text-h1">
          {title}
        </h2>
        <Link
          href={link.href}
          className="inline-flex items-center gap-1 text-label text-accent-strong hover:text-ink"
        >
          {link.label}
          <ArrowRight size={16} strokeWidth={ICON_STROKE} aria-hidden="true" />
        </Link>
      </div>
      <ProductGrid
        products={products}
        labels={labels}
        telegramBot={telegramBot}
        details={{ label: detailsLabel }}
        tagLabels={tagLabels}
      />
    </Section>
  );
}
