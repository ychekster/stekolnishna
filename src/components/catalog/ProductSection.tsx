/**
 * One category on the catalog page: two-tone heading ("Стекло. Листовое и закалённое."),
 * link to the full category page and the first few products. The section id is the
 * category slug, the anchor of its thumbnail in the category strip.
 */
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ICON_STROKE } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import type {
  CatalogCategory,
  CatalogPage,
  CatalogProduct,
  SiteSettings,
} from "@/lib/content/types";
import { routes } from "@/lib/routes";

import { ProductGrid } from "./ProductGrid";

interface ProductSectionProps {
  category: CatalogCategory;
  products: CatalogProduct[];
  linkLabel: string;
  labels: CatalogPage["productCard"];
  telegramBot: SiteSettings["telegramBot"];
}

export function ProductSection({
  category,
  products,
  linkLabel,
  labels,
  telegramBot,
}: ProductSectionProps) {
  const titleId = `${category.slug}-title`;
  return (
    <Section id={category.slug} labelledBy={titleId}>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <h2 id={titleId} className="m-0 text-h2 md:text-h1">
          {category.name}. <span className="text-ink-muted">{category.tagline}</span>
        </h2>
        <Link
          href={routes.catalogCategory(category.slug)}
          className="inline-flex items-center gap-1 text-label text-accent-strong hover:text-ink"
        >
          {linkLabel}
          <ArrowRight size={16} strokeWidth={ICON_STROKE} aria-hidden="true" />
        </Link>
      </div>
      <ProductGrid products={products} labels={labels} telegramBot={telegramBot} />
    </Section>
  );
}
