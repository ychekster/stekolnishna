import { describe, expect, it } from "vitest";

import { formatCount, pluralRu } from "./plural";

const forms: [string, string, string] = ["товар", "товара", "товаров"];

describe("pluralRu", () => {
  it("picks the Russian plural form", () => {
    expect([1, 2, 4, 5, 11, 12, 14, 21, 22, 25, 101, 111].map((n) => pluralRu(n, forms))).toEqual([
      "товар",
      "товара",
      "товара",
      "товаров",
      "товаров",
      "товаров",
      "товаров",
      "товар",
      "товара",
      "товаров",
      "товар",
      "товаров",
    ]);
    expect(formatCount(0, forms)).toBe("0 товаров");
  });
});
