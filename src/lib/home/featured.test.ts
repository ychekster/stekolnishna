import { describe, expect, it } from "vitest";

import type { CatalogCategory, PortfolioProject } from "@/lib/content/types";

import { resolveHomeCategories, resolveHomeProjects } from "./featured";

const cover = { src: "/cover.jpg", alt: "Обложка" };
const category = {
  slug: "zerkala",
  name: "Зеркала и панно",
  image: cover,
  price: { kind: "from", amount: 15000, unit: "m2" },
} as CatalogCategory;
const project = {
  slug: "dushevaya",
  title: "Душевая в квартире на Самале",
  cover,
} as PortfolioProject;

describe("resolveHomeCategories", () => {
  it("takes name, price, link and cover from the catalog", () => {
    expect(resolveHomeCategories([{ slug: "zerkala" }], [category])).toEqual([
      {
        title: "Зеркала и панно",
        href: "/katalog/zerkala",
        image: cover,
        price: category.price,
      },
    ]);
  });

  it("uses the homepage photo when one is set", () => {
    const image = { src: "/home.jpg", alt: "Зеркальная стена" };
    expect(resolveHomeCategories([{ slug: "zerkala", image }], [category])[0].image).toBe(image);
  });

  it("skips unknown sections", () => {
    expect(resolveHomeCategories([{ slug: "net" }, { slug: "zerkala" }], [category])).toHaveLength(
      1,
    );
  });
});

describe("resolveHomeProjects", () => {
  it("takes title, cover and link from the portfolio", () => {
    expect(resolveHomeProjects([{ slug: "dushevaya" }], [project])).toEqual([
      { caption: "Душевая в квартире на Самале", href: "/nashi-raboty/dushevaya", image: cover },
    ]);
  });

  it("uses the short caption when one is set", () => {
    expect(
      resolveHomeProjects([{ slug: "dushevaya", caption: "Душевая" }], [project])[0].caption,
    ).toBe("Душевая");
  });

  it("skips unknown projects", () => {
    expect(resolveHomeProjects([{ slug: "net" }], [project])).toEqual([]);
  });
});
