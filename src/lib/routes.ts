/**
 * Site routes — single source of truth for internal URLs.
 *
 * Paths follow docs/sitemap.md (transliterated Russian slugs, spec §6 "ЧПУ"). Link to pages
 * only through these constants, so renaming a route is a one-line change.
 */
export const routes = {
  home: "/",
  /** Catalog index — src/app/katalog. */
  catalog: "/katalog",
  /** Catalog category page — src/app/katalog/[category]. */
  catalogCategory: (slug: string) => `/katalog/${slug}`,
  /** Product card — src/app/katalog/[category]/[product]. */
  product: (categorySlug: string, productSlug: string) => `/katalog/${categorySlug}/${productSlug}`,
  /** Services — src/app/uslugi. */
  services: "/uslugi",
  /** Portfolio — "Наши работы", src/app/nashi-raboty. */
  portfolio: "/nashi-raboty",
  /** One portfolio project — src/app/nashi-raboty/[project]. */
  project: (slug: string) => `/nashi-raboty/${slug}`,
  /** About the company — src/app/o-kompanii. */
  about: "/o-kompanii",
  /** Contacts — src/app/kontakty. */
  contacts: "/kontakty",
  /** Full order form with file upload — src/app/zayavka. Target of the header CTA. */
  order: "/zayavka",
  /**
   * Legal information — src/app/pravovaya-informaciya: one page with the privacy policy,
   * personal-data consent, terms and cookie policy as anchored sections (design mockup
   * "Правовая информация"). The anchors are the section ids in src/content/legal.ts.
   */
  legal: "/pravovaya-informaciya",
  privacyPolicy: "/pravovaya-informaciya#privacy",
  consent: "/pravovaya-informaciya#consent",
  cookiePolicy: "/pravovaya-informaciya#cookies",
  /**
   * SEO landing page — src/app/[landing]: one page per search topic at the site root
   * (`/steklyannye-dushevye-almaty`), not in the main menu; linked from the footer.
   */
  landing: (slug: string) => `/${slug}`,
  /** Lead form on the homepage — target of every "Оставить заявку" button. */
  leadForm: "/#form",
  /** Lead form on the current page, for pages that place their own `LeadFormSection`. */
  pageLeadForm: "#form",
} as const;

/**
 * Whether a nav item should be highlighted for the current path: exact match for the
 * homepage, prefix match for sections (so /katalog/zerkala highlights "Каталог").
 */
export function isActiveRoute(href: string, pathname: string): boolean {
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}
