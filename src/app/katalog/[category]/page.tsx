/**
 * Catalog category page /katalog/[category] (spec §3.2, design handoff "Страница категории").
 * One template for every section, in three states picked from the data:
 *  - with products: hero, filters and product grid, SEO text;
 *  - without products ("Безрамное остекление"): photo with a price card, "Что входит в
 *    работу", text beside projects, "Как мы работаем";
 *  - "Рисунки на стекле": the gallery of drawing samples, set kept in `?nabor=`.
 * All end with the other sections and the lead form. Every category is prerendered.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CategoryBrowser } from "@/components/category/CategoryBrowser";
import { CategoryHero } from "@/components/category/CategoryHero";
import { ScopeSection } from "@/components/category/ScopeSection";
import { ServiceCategoryHero } from "@/components/category/ServiceCategoryHero";
import { OtherSectionsStrip } from "@/components/catalog/OtherSectionsStrip";
import { DrawingsBrowser } from "@/components/drawings/DrawingsBrowser";
import { DrawingsHero } from "@/components/drawings/DrawingsHero";
import { DrawingsUrlBrowser } from "@/components/drawings/DrawingsUrlBrowser";
import { ProjectShelf } from "@/components/portfolio/ProjectShelf";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SeoText } from "@/components/sections/SeoText";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { telegramHref } from "@/lib/contact-links";
import {
  getCatalogCategories,
  getCatalogCategory,
  getCatalogPage,
  getCatalogProducts,
  getCategoryPageCopy,
  getDrawingSets,
  getDrawingsPageCopy,
  getHomePage,
  getPortfolioPage,
  getPortfolioProjects,
  getSeoLandings,
  getSiteSettings,
} from "@/lib/content";
import { formatPrice } from "@/lib/format/price";
import { formatCount } from "@/lib/format/plural";
import { routes } from "@/lib/routes";

export async function generateStaticParams() {
  const categories = await getCatalogCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/katalog/[category]">): Promise<Metadata> {
  const category = await getCatalogCategory((await params).category);
  if (!category) return {};
  return {
    title: category.seo?.title ?? `${category.name} на заказ в Алматы | Стекло&Центр`,
    description: category.seo?.description || category.description,
  };
}

export default async function CategoryPage({ params }: PageProps<"/katalog/[category]">) {
  const { category: slug } = await params;
  const [settings, catalog, copy, categories, allProducts, category] = await Promise.all([
    getSiteSettings(),
    getCatalogPage(),
    getCategoryPageCopy(),
    getCatalogCategories(),
    getCatalogProducts(),
    getCatalogCategory(slug),
  ]);
  if (!category) notFound();

  const [drawingsCopy, drawingSets, home, portfolio, projects, landings] = await Promise.all([
    getDrawingsPageCopy(),
    getDrawingSets(),
    getHomePage(),
    getPortfolioPage(),
    getPortfolioProjects(),
    getSeoLandings(),
  ]);

  const products = allProducts.filter((product) => product.categorySlug === category.slug);
  const telegram = telegramHref(settings.telegramBot, category.slug);
  const landing = landings.find((item) => item.categorySlug === category.slug);
  const isDrawings = category.slug === drawingsCopy.categorySlug;
  const priceChip = formatPrice(category.price);
  // Lead times are stored as whole phrases ("Изготовление от 5–7 дней"), shown as they are.
  const leadTimeChip = category.leadTime;

  const seoText = category.intro.length > 0 && (
    <SeoText
      title={copy.seoTitle.replace("{name}", category.name)}
      blocks={category.intro}
      moreLabel={copy.seoMoreLabel}
      size={isDrawings || products.length > 0 ? "section" : "compact"}
    >
      {landing && (
        <p className="m-0 mt-5 text-label font-semibold">
          {copy.usefulLabel}{" "}
          <Link
            href={routes.landing(landing.slug)}
            className="font-normal text-accent-strong underline underline-offset-2 hover:text-ink"
          >
            {landing.navLabel}
          </Link>
        </p>
      )}
    </SeoText>
  );

  let body;
  if (isDrawings) {
    const total = drawingSets.reduce((sum, set) => sum + set.images.length, 0);
    const browserProps = {
      sets: drawingSets,
      copy: drawingsCopy,
      telegramHref: telegram,
    };
    body = (
      <>
        <DrawingsHero
          category={category}
          copy={drawingsCopy}
          telegramHref={telegram}
          chips={[
            priceChip,
            drawingsCopy.countLabel
              .replace("{sets}", String(drawingSets.length))
              .replace("{count}", String(total)),
          ]}
        />
        <Suspense
          fallback={<DrawingsBrowser {...browserProps} slug={drawingSets[0]?.slug ?? ""} />}
        >
          <DrawingsUrlBrowser {...browserProps} />
        </Suspense>
        {seoText && <Section>{seoText}</Section>}
      </>
    );
  } else if (products.length === 0) {
    const matching = projects.filter((project) => project.category === category.portfolioCategory);
    const shelf = (matching.length > 0 ? matching : projects).slice(0, 2);
    body = (
      <>
        <ServiceCategoryHero category={category} copy={copy} telegramHref={telegram} />
        <ScopeSection copy={copy.noProducts} />
        <Section className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {seoText || <div />}
          <ProjectShelf
            title={copy.noProducts.projectsTitle}
            allLabel={copy.noProducts.allProjectsLabel}
            projects={shelf}
            categories={portfolio.categories}
            photosLabel={portfolio.list.photosLabel}
            size="compact"
          />
        </Section>
        <ProcessSection process={home.process} />
      </>
    );
  } else {
    const chips = [priceChip, leadTimeChip, formatCount(products.length, copy.productForms)];
    body = (
      <>
        <CategoryHero category={category} chips={chips.filter((chip) => chip !== null)} />
        <CategoryBrowser
          products={products}
          tags={catalog.filters.tags}
          copy={copy}
          productLabels={catalog.productCard}
          sections={categories.map(({ slug: s, name }) => ({ slug: s, name }))}
          currentSlug={category.slug}
          telegramBot={settings.telegramBot}
        />
        {seoText && <Section>{seoText}</Section>}
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главная", href: routes.home },
          { label: catalog.name, href: routes.catalog },
          { label: category.name },
        ]}
        className="mt-4 md:mt-8"
      />
      {body}
      <OtherSectionsStrip
        title={copy.otherSectionsTitle}
        categories={categories}
        currentSlug={category.slug}
      />
      <LeadFormSection
        leadForm={isDrawings ? drawingsCopy.leadForm : copy.leadForm}
        source="category"
        privacyPolicyHref={settings.privacyPolicyHref}
        telegram={{ href: telegram, label: copy.telegramLabel }}
        sample={
          isDrawings
            ? { label: drawingsCopy.sampleLabel, placeholder: drawingsCopy.samplePlaceholder }
            : undefined
        }
      />
    </>
  );
}
