/**
 * Site routes — single source of truth for internal URLs.
 *
 * Paths follow docs/sitemap.md (transliterated Russian slugs, spec §6 "ЧПУ"). Link to pages
 * only through these constants, so renaming a route is a one-line change.
 * Pages marked "planned" do not exist yet and currently render the not-found page.
 */
export const routes = {
  home: "/",
  /** Catalog index (planned). */
  catalog: "/katalog",
  /** Catalog category page (planned). */
  catalogCategory: (slug: string) => `/katalog/${slug}`,
  /** Services (planned). */
  services: "/uslugi",
  /** Portfolio — "Наши работы" (planned). */
  portfolio: "/nashi-raboty",
  /** About the company (planned). */
  about: "/o-kompanii",
  /** Contacts (planned). */
  contacts: "/kontakty",
  /** Privacy policy (planned). */
  privacyPolicy: "/politika-konfidencialnosti",
  /** Lead form on the homepage — target of every "Оставить заявку" button. */
  leadForm: "/#form",
} as const;

/**
 * Whether a nav item should be highlighted for the current path: exact match for the
 * homepage, prefix match for sections (so /katalog/zerkala highlights "Каталог").
 */
export function isActiveRoute(href: string, pathname: string): boolean {
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}
