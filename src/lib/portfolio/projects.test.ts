import { describe, expect, it } from "vitest";

import type { PortfolioProject, ProjectCategory } from "@/lib/content/types";

import { adjacentProjects, countByCategory, filterProjects, mosaicTiles } from "./projects";

const project = (slug: string, category: ProjectCategory) =>
  ({ slug, category }) as PortfolioProject;

const projects = [project("a", "shower"), project("b", "mirror"), project("c", "shower")];

describe("portfolio", () => {
  it("filters by category, keeping the order", () => {
    expect(filterProjects(projects, null)).toHaveLength(3);
    expect(filterProjects(projects, "shower").map((p) => p.slug)).toEqual(["a", "c"]);
    expect(filterProjects(projects, "door")).toEqual([]);
  });

  it("counts projects per category", () => {
    expect(countByCategory(projects)).toEqual({ shower: 2, mirror: 1 });
  });

  it("finds neighbours, wrapping around the ends", () => {
    expect(adjacentProjects(projects, "b")).toMatchObject({
      previous: { slug: "a" },
      next: { slug: "c" },
    });
    expect(adjacentProjects(projects, "a")).toMatchObject({
      previous: { slug: "c" },
      next: { slug: "b" },
    });
    expect(adjacentProjects(projects, "zzz")).toBeNull();
    expect(adjacentProjects([project("a", "door")], "a")).toBeNull();
  });
});

describe("mosaicTiles", () => {
  it("fills every slot with placeholders when there are no photos", () => {
    expect(mosaicTiles([], 3)).toEqual([null, null, null]);
  });

  it("shows only real photos when there are fewer than the slots", () => {
    expect(mosaicTiles(["a"], 6)).toEqual(["a"]);
  });

  it("cuts extra photos to the number of slots", () => {
    expect(mosaicTiles(["a", "b", "c", "d"], 3)).toEqual(["a", "b", "c"]);
  });
});
