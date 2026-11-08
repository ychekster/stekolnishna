/**
 * Catalog index /katalog (spec §3.2). Composes sections in the order of the design mockup
 * "Каталог — десктоп", minus its calculator (docs/decisions/0003). Content, categories and
 * products come from the content layer; header, footer and <main> come from the root
 * layout. The folder name must match `routes.catalog`.
 */
import type { Metadata } from "next";

import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { CatalogHero } from "@/components/catalog/CatalogHero";
import { CategoryStrip } from "@/components/catalog/CategoryStrip";
import { FeaturedPromoCard } from "@/components/catalog/FeaturedPromoCard";
import { MoreCategoriesSection } from "@/components/catalog/MoreCategoriesSection";
import { PhotoOrderPromoCard } from "@/components/catalog/PhotoOrderPromoCard";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  getCatalogCategories,
  getCatalogPage,
  getCatalogProducts,
  getSiteSettings,
} from "@/lib/content";
import { routes } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const catalog = await getCatalogPage();
  return { title: catalog.seo.title, description: catalog.seo.description };
}

export default async function CatalogPage() {
  const [settings, catalog, categories, products] = await Promise.all([
    getSiteSettings(),
    getCatalogPage(),
    getCatalogCategories(),
    getCatalogProducts(),
  ]);

  const featuredSlugs = catalog.featuredCategorySlugs;
  const promo = catalog.promos.featured;
  // The promo jumps to its section when the category is shown on this page.
  const promoHref = featuredSlugs.includes(promo.categorySlug)
    ? `#${promo.categorySlug}`
    : routes.catalogCategory(promo.categorySlug);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Главная", href: routes.home }, { label: catalog.name }]}
        className="mt-4 md:mt-8"
      />
      <CatalogHero hero={catalog.hero} telegramBot={settings.telegramBot} />
      <CategoryStrip
        label={catalog.categoriesNavLabel}
        categories={categories}
        onPageSlugs={featuredSlugs}
      />
      <CatalogBrowser
        page={catalog}
        categories={categories}
        products={products}
        telegramBot={settings.telegramBot}
        intro={
          <div className="mt-6 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
            <FeaturedPromoCard promo={promo} href={promoHref} />
            <PhotoOrderPromoCard
              promo={catalog.promos.photoOrder}
              telegramBot={settings.telegramBot}
            />
          </div>
        }
      />
      <MoreCategoriesSection
        more={catalog.more}
        categories={categories.filter((category) => !featuredSlugs.includes(category.slug))}
      />
      <LeadFormSection
        leadForm={catalog.leadForm}
        source="catalog"
        privacyPolicyHref={settings.privacyPolicyHref}
      />
    </>
  );
}
