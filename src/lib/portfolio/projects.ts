/**
 * Portfolio logic: category filter with counts and previous/next navigation between
 * project pages. Pure functions, unit-tested; the client components only hold state.
 */
import type { PortfolioProject, ProjectCategory } from "@/lib/content/types";

/** Projects of one category in their original order; null = all projects. */
export function filterProjects(
  projects: PortfolioProject[],
  category: ProjectCategory | null,
): PortfolioProject[] {
  return category === null ? projects : projects.filter((p) => p.category === category);
}

/** Number of projects per category, for the counters on the filter chips. */
export function countByCategory(
  projects: PortfolioProject[],
): Partial<Record<ProjectCategory, number>> {
  const counts: Partial<Record<ProjectCategory, number>> = {};
  for (const project of projects) {
    counts[project.category] = (counts[project.category] ?? 0) + 1;
  }
  return counts;
}

/**
 * Neighbours of a project for the "Предыдущий / Следующий проект" links. The list wraps
 * around, so the first and last project still get both links. Null when the project is
 * not in the list or is the only one.
 */
export function adjacentProjects(
  projects: PortfolioProject[],
  slug: string,
): { previous: PortfolioProject; next: PortfolioProject } | null {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) return null;
  const at = (offset: number) => projects[(index + offset + projects.length) % projects.length]!;
  return { previous: at(-1), next: at(1) };
}
