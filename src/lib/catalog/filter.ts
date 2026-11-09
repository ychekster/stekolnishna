/**
 * Filtering, search and sorting of catalog products (catalog page toolbar).
 *
 * Pure functions, so the client component stays thin and the rules are unit-tested.
 * Products come in "popular" order (the order the owner sets in the CMS); sorting by price
 * keeps that order among equal prices.
 */
import type { CatalogProduct, CatalogSort, Price, ProductTag } from "@/lib/content/types";

export interface CatalogQuery {
  /** null = all products. */
  tag: ProductTag | null;
  query: string;
  sort: CatalogSort;
}

export const DEFAULT_CATALOG_QUERY: CatalogQuery = { tag: null, query: "", sort: "popular" };

/** The untouched toolbar: the page shows category sections instead of a flat result list. */
export function isDefaultQuery({ tag, query, sort }: CatalogQuery): boolean {
  return tag === null && normalizeSearch(query) === "" && sort === "popular";
}

/** Case- and "ё"-insensitive form of search text: people type "закаленное" without "ё". */
export function normalizeSearch(text: string): string {
  return text.toLowerCase().replace(/ё/g, "е").replace(/\s+/g, " ").trim();
}

/** Comparable amount; prices without a number (individual or not set) sort after the rest. */
function sortAmount(price: Price): number | null {
  return price.kind === "from" ? price.amount : null;
}

function compareByPrice(a: CatalogProduct, b: CatalogProduct, direction: 1 | -1): number {
  const x = sortAmount(a.price);
  const y = sortAmount(b.price);
  if (x === null && y === null) return 0;
  if (x === null) return 1;
  if (y === null) return -1;
  return (x - y) * direction;
}

/**
 * Products matching the toolbar. Search looks at the product name, its summary and the
 * category name (so "зеркало" finds every product of "Зеркала"); every word must match.
 */
export function filterProducts(
  products: readonly CatalogProduct[],
  { tag, query, sort }: CatalogQuery,
  categoryNames: Readonly<Record<string, string>>,
): CatalogProduct[] {
  const words = normalizeSearch(query).split(" ").filter(Boolean);

  const matched = products.filter((product) => {
    if (tag !== null && !product.tags.includes(tag)) return false;
    if (words.length === 0) return true;
    const haystack = normalizeSearch(
      `${product.name} ${product.summary} ${categoryNames[product.categorySlug] ?? ""}`,
    );
    return words.every((word) => haystack.includes(word));
  });

  return sortProducts(matched, sort);
}

/** Products in the given order: "popular" keeps the owner's order, the rest sort by price. */
export function sortProducts(
  products: readonly CatalogProduct[],
  sort: CatalogSort,
): CatalogProduct[] {
  if (sort === "popular") return [...products];
  // Array.prototype.sort is stable, so equal prices keep the popular order.
  return [...products].sort((a, b) => compareByPrice(a, b, sort === "price-asc" ? 1 : -1));
}

/**
 * Category page filter: products that have ALL ticked tags ("для дома" + "с монтажом"
 * narrows the list). No tags ticked = every product.
 */
export function filterByTags(
  products: readonly CatalogProduct[],
  tags: readonly ProductTag[],
): CatalogProduct[] {
  return products.filter((product) => tags.every((tag) => product.tags.includes(tag)));
}

/** How many products carry each tag, for the counters next to the filter checkboxes. */
export function countTags(products: readonly CatalogProduct[]): Record<ProductTag, number> {
  const counts: Record<ProductTag, number> = { home: 0, office: 0, installation: 0, tempered: 0 };
  for (const product of products) for (const tag of product.tags) counts[tag] += 1;
  return counts;
}
