/**
 * Content access layer — the ONLY place pages get content from.
 *
 * Temporary implementation: returns local placeholder data from src/content.
 * When Payload CMS is connected (see docs/decisions/0002-frontend-first.md), replace the
 * bodies of these functions with CMS queries mapped to the same types. Pages and
 * components must not import from src/content directly.
 */
import { aboutPageContent } from "@/content/about";
import {
  catalogCategories,
  catalogPageContent,
  catalogProducts,
  categoryPageCopy,
  drawingSets,
  drawingsPageCopy,
  productPageCopy,
} from "@/content/catalog";
import { contactsPageContent } from "@/content/contacts";
import { homePageContent } from "@/content/home";
import { legalPageContent } from "@/content/legal";
import { notFoundPageContent } from "@/content/not-found";
import { orderPageContent } from "@/content/order";
import { portfolioPageContent, portfolioProjects } from "@/content/portfolio";
import { seoLandings } from "@/content/landings";
import { servicesPageContent } from "@/content/services";
import { siteSettingsContent } from "@/content/site-settings";

import type {
  AboutPage,
  CatalogCategory,
  CatalogPage,
  CatalogProduct,
  CategoryPageCopy,
  DrawingSet,
  DrawingsPageCopy,
  ProductPageCopy,
  SeoLanding,
  ContactsPage,
  HomePage,
  LegalPage,
  NotFoundPage,
  OrderPage,
  PortfolioPage,
  PortfolioProject,
  ServicesPage,
  SiteSettings,
} from "./types";

/** Global settings: company name, contacts, navigation, map. */
export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettingsContent;
}

/** All blocks of the homepage. */
export async function getHomePage(): Promise<HomePage> {
  return homePageContent;
}

/** All blocks of the About page (/o-kompanii). */
export async function getAboutPage(): Promise<AboutPage> {
  return aboutPageContent;
}

/** All blocks of the Contacts page (/kontakty). */
export async function getContactsPage(): Promise<ContactsPage> {
  return contactsPageContent;
}

/** All blocks of the Services page (/uslugi). */
export async function getServicesPage(): Promise<ServicesPage> {
  return servicesPageContent;
}

/** Copy and settings of the catalog index page (/katalog). */
export async function getCatalogPage(): Promise<CatalogPage> {
  return catalogPageContent;
}

/** All catalog categories in display order. */
export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  return catalogCategories;
}

/** All published products, in "popular" order. */
export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  return catalogProducts;
}

/** Copy of the portfolio page (/nashi-raboty) and of the project pages. */
export async function getPortfolioPage(): Promise<PortfolioPage> {
  return portfolioPageContent;
}

/** All published projects, in display order (newest first, as the owner sorts them). */
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return portfolioProjects;
}

/** One project by slug, or null (→ 404). */
export async function getPortfolioProject(slug: string): Promise<PortfolioProject | null> {
  return portfolioProjects.find((project) => project.slug === slug) ?? null;
}

/** Copy of the order page (/zayavka). */
export async function getOrderPage(): Promise<OrderPage> {
  return orderPageContent;
}

/** Legal texts (/pravovaya-informaciya). */
export async function getLegalPage(): Promise<LegalPage> {
  return legalPageContent;
}

/** Copy of the 404 page. */
export async function getNotFoundPage(): Promise<NotFoundPage> {
  return notFoundPageContent;
}

/** One category by slug, or null (→ 404). */
export async function getCatalogCategory(slug: string): Promise<CatalogCategory | null> {
  return catalogCategories.find((category) => category.slug === slug) ?? null;
}

/** One product of a category, or null (→ 404, also when the category does not match). */
export async function getCatalogProduct(
  categorySlug: string,
  slug: string,
): Promise<CatalogProduct | null> {
  return (
    catalogProducts.find(
      (product) => product.slug === slug && product.categorySlug === categorySlug,
    ) ?? null
  );
}

/** Copy shared by the category pages. */
export async function getCategoryPageCopy(): Promise<CategoryPageCopy> {
  return categoryPageCopy;
}

/** Copy of the "Рисунки на стекле" page. */
export async function getDrawingsPageCopy(): Promise<DrawingsPageCopy> {
  return drawingsPageCopy;
}

/** Glass-drawing sample sets, in display order. */
export async function getDrawingSets(): Promise<DrawingSet[]> {
  return drawingSets;
}

/** Copy shared by the product pages. */
export async function getProductPageCopy(): Promise<ProductPageCopy> {
  return productPageCopy;
}

/** Published SEO landing pages, in footer order. */
export async function getSeoLandings(): Promise<SeoLanding[]> {
  return seoLandings;
}

/** One SEO landing by slug, or null (→ 404). */
export async function getSeoLanding(slug: string): Promise<SeoLanding | null> {
  return seoLandings.find((landing) => landing.slug === slug) ?? null;
}

export type * from "./types";
