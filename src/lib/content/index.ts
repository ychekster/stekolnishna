/**
 * Content access layer — the ONLY place pages get content from.
 *
 * Temporary implementation: returns local placeholder data from src/content.
 * When Payload CMS is connected (see docs/decisions/0002-frontend-first.md), replace the
 * bodies of these functions with CMS queries mapped to the same types. Pages and
 * components must not import from src/content directly.
 */
import { aboutPageContent } from "@/content/about";
import { catalogCategories, catalogPageContent, catalogProducts } from "@/content/catalog";
import { contactsPageContent } from "@/content/contacts";
import { homePageContent } from "@/content/home";
import { servicesPageContent } from "@/content/services";
import { siteSettingsContent } from "@/content/site-settings";

import type {
  AboutPage,
  CatalogCategory,
  CatalogPage,
  CatalogProduct,
  ContactsPage,
  HomePage,
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

export type * from "./types";
