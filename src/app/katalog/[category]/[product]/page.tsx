/**
 * Product page /katalog/[category]/[product] (spec §3.2, design handoff "Карточка товара"):
 * gallery and summary with price, variants and buttons; description and specification
 * table; similar products of the section; "Как мы работаем"; the lead form with the product
 * pre-filled. Every product is prerendered; a product under the wrong category is a 404.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductShelf } from "@/components/catalog/ProductShelf";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSummary } from "@/components/product/ProductSummary";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { BackLink } from "@/components/ui/BackLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { telegramHref } from "@/lib/contact-links";
import {
  getCatalogCategory,
  getCatalogPage,
  getCatalogProduct,
  getCatalogProducts,
  getCategoryPageCopy,
  getHomePage,
  getProductPageCopy,
  getSiteSettings,
} from "@/lib/content";
import { routes } from "@/lib/routes";

const SIMILAR_COUNT = 4;

export async function generateStaticParams() {
  const products = await getCatalogProducts();
  return products.map((product) => ({ category: product.categorySlug, product: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/katalog/[category]/[product]">): Promise<Metadata> {
  const { category, product: slug } = await params;
  const product = await getCatalogProduct(category, slug);
  if (!product) return {};
  return {
    title: product.seo?.title ?? `${product.name} на заказ в Алматы | Стекло&Центр`,
    description:
      product.seo?.description ||
      `${product.name} по вашим размерам в Алматы. ${product.summary}. Замер, изготовление и монтаж.`,
  };
}

export default async function ProductPage({ params }: PageProps<"/katalog/[category]/[product]">) {
  const { category: categorySlug, product: slug } = await params;
  const [settings, catalog, copy, categoryCopy, home, products, category, product] =
    await Promise.all([
      getSiteSettings(),
      getCatalogPage(),
      getProductPageCopy(),
      getCategoryPageCopy(),
      getHomePage(),
      getCatalogProducts(),
      getCatalogCategory(categorySlug),
      getCatalogProduct(categorySlug, slug),
    ]);
  if (!category || !product) notFound();

  const photos =
    product.gallery.length > 0 ? product.gallery : product.image ? [product.image] : [];
  const similar = products
    .filter((item) => item.categorySlug === category.slug && item.slug !== product.slug)
    .slice(0, SIMILAR_COUNT);
  const telegram = telegramHref(settings.telegramBot, product.slug);
  const tagLabels = Object.fromEntries(catalog.filters.tags.map(({ tag, label }) => [tag, label]));

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главная", href: routes.home },
          { label: catalog.name, href: routes.catalog },
          { label: category.name, href: routes.catalogCategory(category.slug) },
          { label: product.name },
        ]}
        className="mt-4 md:mt-8"
      />
      <BackLink href={routes.catalogCategory(category.slug)} label={category.name} />
      <section
        aria-labelledby="product-title"
        className="mt-4 grid grid-cols-1 items-start gap-6 md:mt-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-12"
      >
        <ProductGallery photos={photos} />
        <ProductSummary product={product} category={category} copy={copy} telegramHref={telegram} />
      </section>
      <ProductDetails product={product} copy={copy} />
      {similar.length > 0 && (
        <ProductShelf
          title={copy.similarTitle}
          link={{ label: copy.allLabel, href: routes.catalogCategory(category.slug) }}
          products={similar}
          labels={catalog.productCard}
          detailsLabel={categoryCopy.detailsLabel}
          tagLabels={tagLabels}
          telegramBot={settings.telegramBot}
        />
      )}
      <ProcessSection process={home.process} />
      <LeadFormSection
        leadForm={{ ...copy.leadForm, title: copy.leadFormTitle.replace("{name}", product.name) }}
        source="product"
        privacyPolicyHref={settings.privacyPolicyHref}
        telegram={{ href: telegram, label: copy.telegramLabel }}
        product={{ label: copy.productFieldLabel, value: product.name }}
      />
    </>
  );
}
