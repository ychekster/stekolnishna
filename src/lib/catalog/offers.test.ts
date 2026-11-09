import { describe, expect, it } from "vitest";

import type { CatalogCategory, CatalogProduct, ServiceOffer } from "@/lib/content/types";

import { resolveOffers } from "./offers";

const category = {
  slug: "zerkala",
  name: "Зеркала",
  description: "На стену",
  image: null,
  price: { kind: "from", amount: 15000, unit: "m2" },
} as CatalogCategory;
const product = {
  slug: "plitka",
  categorySlug: "zerkala",
  name: "Плитка",
  summary: "От 5 дней",
  image: null,
  price: { kind: "individual" },
} as CatalogProduct;
const service = {
  slug: "rezka",
  title: "Резка",
  description: "По размерам",
  price: "от [300] ₸",
  image: null,
} as ServiceOffer;

describe("resolveOffers", () => {
  it("builds cards from the catalog and services, in the given order", () => {
    const cards = resolveOffers(
      [
        { kind: "service", slug: "rezka" },
        { kind: "product", slug: "plitka", description: "Своё описание" },
        { kind: "category", slug: "zerkala" },
      ],
      { categories: [category], products: [product], services: [service] },
    );
    expect(cards.map((card) => card.href)).toEqual([
      "/uslugi#rezka",
      "/katalog/zerkala/plitka",
      "/katalog/zerkala",
    ]);
    expect(cards[1]?.description).toBe("Своё описание");
    expect(cards[2]?.priceLabel).toContain("15");
  });

  it("skips references to items that no longer exist", () => {
    expect(
      resolveOffers([{ kind: "product", slug: "gone" }], {
        categories: [],
        products: [],
        services: [],
      }),
    ).toEqual([]);
  });
});
