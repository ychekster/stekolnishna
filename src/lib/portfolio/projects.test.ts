import { describe, expect, it } from "vitest";

import type { PortfolioProject, ProjectCategory } from "@/lib/content/types";

import { adjacentProjects, countByCategory, filterProjects } from "./projects";

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
