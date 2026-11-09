/** Tests for catalog filtering, search and sorting. */
import { describe, expect, it } from "vitest";

import type { CatalogProduct } from "@/lib/content/types";

import {
  countTags,
  DEFAULT_CATALOG_QUERY,
  filterByTags,
  filterProducts,
  isDefaultQuery,
  normalizeSearch,
  sortProducts,
} from "./filter";

function product(slug: string, overrides: Partial<CatalogProduct> = {}): CatalogProduct {
  return {
    slug,
    categorySlug: "steklo",
    name: slug,
    summary: "",
    price: { kind: "individual" },
    badge: null,
    tags: [],
    image: null,
    gallery: [],
    leadTime: null,
    description: [],
    seo: null,
    ...overrides,
  };
}

const categories = { steklo: "Стекло", zerkala: "Зеркала", dveri: "Стеклянные двери" };

const products = [
  product("a", {
    name: "Закалённое стекло",
    tags: ["tempered", "office"],
    price: { kind: "from", amount: 12000, unit: "m2" },
  }),
  product("b", {
    categorySlug: "zerkala",
    name: "Зеркало с подсветкой",
    tags: ["home"],
    price: { kind: "from", amount: 45000, unit: "piece" },
  }),
  product("c", { categorySlug: "dveri", name: "Маятниковая дверь", tags: ["office"] }),
  product("d", {
    name: "Прозрачное стекло",
    summary: "резка по размеру",
    tags: ["home"],
    price: { kind: "from", amount: 4500, unit: "m2" },
  }),
];

const slugs = (list: CatalogProduct[]) => list.map((item) => item.slug);

describe("filterProducts", () => {
  it("returns everything in popular order by default", () => {
    expect(slugs(filterProducts(products, DEFAULT_CATALOG_QUERY, categories))).toEqual([
      "a",
      "b",
      "c",
      "d",
    ]);
  });

  it("filters by tag", () => {
    const result = filterProducts(
      products,
      { ...DEFAULT_CATALOG_QUERY, tag: "office" },
      categories,
    );
    expect(slugs(result)).toEqual(["a", "c"]);
  });

  it("searches name, summary and category, ignoring case and ё", () => {
    const search = (query: string) =>
      slugs(filterProducts(products, { ...DEFAULT_CATALOG_QUERY, query }, categories));
    expect(search("ЗАКАЛЕННОЕ")).toEqual(["a"]);
    expect(search("резка")).toEqual(["d"]);
    expect(search("зеркала")).toEqual(["b"]);
    expect(search("стекло прозрачное")).toEqual(["d"]);
    expect(search("стекло дверь")).toEqual([]);
  });

  it("sorts by price, keeping items without a number last", () => {
    const asc = filterProducts(
      products,
      { ...DEFAULT_CATALOG_QUERY, sort: "price-asc" },
      categories,
    );
    expect(slugs(asc)).toEqual(["d", "a", "b", "c"]);
    const desc = filterProducts(
      products,
      { ...DEFAULT_CATALOG_QUERY, sort: "price-desc" },
      categories,
    );
    expect(slugs(desc)).toEqual(["b", "a", "d", "c"]);
  });

  it("does not mutate the input", () => {
    const copy = [...products];
    filterProducts(products, { ...DEFAULT_CATALOG_QUERY, sort: "price-desc" }, categories);
    expect(products).toEqual(copy);
  });
});

describe("isDefaultQuery", () => {
  it("treats whitespace-only search as empty", () => {
    expect(isDefaultQuery({ ...DEFAULT_CATALOG_QUERY, query: "   " })).toBe(true);
    expect(isDefaultQuery({ ...DEFAULT_CATALOG_QUERY, tag: "home" })).toBe(false);
    expect(isDefaultQuery({ ...DEFAULT_CATALOG_QUERY, sort: "price-asc" })).toBe(false);
  });
});

describe("normalizeSearch", () => {
  it("lowercases, replaces ё and collapses spaces", () => {
    expect(normalizeSearch("  Ёлочное   СТЕКЛО ")).toBe("елочное стекло");
  });
});

describe("category page filter", () => {
  const item = (slug: string, tags: CatalogProduct["tags"], amount: number) =>
    ({ slug, tags, price: { kind: "from", amount, unit: "m2" } }) as CatalogProduct;
  const list = [
    item("a", ["home"], 30),
    item("b", ["home", "installation"], 10),
    item("c", [], 20),
  ];

  it("keeps products that have every ticked tag", () => {
    expect(filterByTags(list, []).map((p) => p.slug)).toEqual(["a", "b", "c"]);
    expect(filterByTags(list, ["home"]).map((p) => p.slug)).toEqual(["a", "b"]);
    expect(filterByTags(list, ["home", "installation"]).map((p) => p.slug)).toEqual(["b"]);
  });

  it("counts tags and sorts without changing the input", () => {
    expect(countTags(list)).toEqual({ home: 2, office: 0, installation: 1, tempered: 0 });
    expect(sortProducts(list, "price-asc").map((p) => p.slug)).toEqual(["b", "c", "a"]);
    expect(list.map((p) => p.slug)).toEqual(["a", "b", "c"]);
  });
});
