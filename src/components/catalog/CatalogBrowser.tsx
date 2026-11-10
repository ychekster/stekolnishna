"use client";

/**
 * Interactive part of the catalog page: the toolbar plus what it controls.
 *
 * Untouched toolbar → the curated view: promo cards (`intro`) and one section per featured
 * category. Any filter, search or sort → one flat list of matching products across the
 * whole catalog, with a count and a reset button. Products are few enough to filter in the
 * browser; when the catalog grows, move filtering to the server (Payload query) and keep
 * the same toolbar.
 */
import { useMemo, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import {
  DEFAULT_CATALOG_QUERY,
  filterProducts,
  isDefaultQuery,
  type CatalogQuery,
} from "@/lib/catalog/filter";
import type {
  CatalogCategory,
  CatalogPage,
  CatalogProduct,
  SiteSettings,
} from "@/lib/content/types";
import { routes } from "@/lib/routes";

import { CatalogToolbar } from "./CatalogToolbar";
import { ProductGrid } from "./ProductGrid";
import { ProductSection } from "./ProductSection";

interface CatalogBrowserProps {
  page: Pick<
    CatalogPage,
    "filters" | "productCard" | "sectionLinkLabel" | "featuredCategorySlugs" | "productsPerSection"
  >;
  categories: CatalogCategory[];
  products: CatalogProduct[];
  telegramBot: SiteSettings["telegramBot"];
  /** Shown above the sections in the curated view only (promo cards). */
  intro: ReactNode;
}

export function CatalogBrowser({
  page,
  categories,
  products,
  telegramBot,
  intro,
}: CatalogBrowserProps) {
  const [query, setQuery] = useState<CatalogQuery>(DEFAULT_CATALOG_QUERY);
  const curated = isDefaultQuery(query);

  const categoryNames = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.slug, category.name])),
    [categories],
  );
  const results = useMemo(
    () => (curated ? [] : filterProducts(products, query, categoryNames)),
    [curated, products, query, categoryNames],
  );

  const featured = page.featuredCategorySlugs
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter((category) => category !== undefined);

  // The wrapper bounds the sticky toolbar: it unpins once the products end, instead of
  // riding over the sections below.
  return (
    <div>
      <CatalogToolbar filters={page.filters} value={query} onChange={setQuery} />

      {curated ? (
        <>
          {intro}
          {featured.map((category) => (
            <ProductSection
              key={category.slug}
              category={category}
              products={products
                .filter((product) => product.categorySlug === category.slug)
                .slice(0, page.productsPerSection)}
              linkLabel={page.sectionLinkLabel}
              labels={page.productCard}
              telegramBot={telegramBot}
            />
          ))}
        </>
      ) : (
        <section aria-labelledby="catalog-results-title" className="mt-6 md:mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="catalog-results-title" aria-live="polite" className="m-0 text-title text-ink">
              {page.filters.resultsLabel.replace("{count}", String(results.length))}
            </h2>
            <Button variant="ghost" onClick={() => setQuery(DEFAULT_CATALOG_QUERY)}>
              {page.filters.resetLabel}
            </Button>
          </div>
          {results.length > 0 ? (
            <ProductGrid products={results} labels={page.productCard} telegramBot={telegramBot} />
          ) : (
            <div className="mt-6 rounded-lg bg-surface-alt p-6 md:p-9">
              <p className="m-0 text-title text-ink">{page.filters.emptyTitle}</p>
              <p className="m-0 mt-2 max-w-120 text-body text-ink-muted">
                {page.filters.emptyText}
              </p>
              <Button href={routes.pageLeadForm} size="sm" className="mt-4">
                {page.productCard.orderLabel}
              </Button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
