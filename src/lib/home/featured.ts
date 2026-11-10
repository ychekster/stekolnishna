/**
 * Resolves the homepage picks ("Популярные категории", "Проекты") from slugs.
 * Names, prices, photos and links come from the catalog and the portfolio, so the homepage
 * can never show a price or a photo that differs from those pages, and the admin edits each
 * fact in one place. Unknown slugs are skipped: a removed section must not break the page.
 */
import type {
  CatalogCategory,
  CatalogItem,
  HomeCategoryRef,
  HomeProjectRef,
  PortfolioProject,
  ProjectItem,
} from "@/lib/content/types";
import { routes } from "@/lib/routes";

export function resolveHomeCategories(
  refs: readonly HomeCategoryRef[],
  categories: readonly CatalogCategory[],
): CatalogItem[] {
  return refs.flatMap((ref): CatalogItem[] => {
    const category = categories.find((item) => item.slug === ref.slug);
    if (!category) return [];
    return [
      {
        title: category.name,
        href: routes.catalogCategory(category.slug),
        image: ref.image ?? category.image,
        price: category.price,
      },
    ];
  });
}

export function resolveHomeProjects(
  refs: readonly HomeProjectRef[],
  projects: readonly PortfolioProject[],
): ProjectItem[] {
  return refs.flatMap((ref): ProjectItem[] => {
    const project = projects.find((item) => item.slug === ref.slug);
    if (!project) return [];
    return [
      {
        caption: ref.caption ?? project.title,
        href: routes.project(project.slug),
        image: project.cover,
      },
    ];
  });
}
