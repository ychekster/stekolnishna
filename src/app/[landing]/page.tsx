/**
 * SEO landing page /[landing] (spec §6, design handoff "SEO-лендинг"): one page per search
 * topic at the site root ("/steklyannye-dushevye-almaty"), not in the main menu; linked from
 * the footer and from the matching catalog section. Static routes (/katalog, /uslugi…) win
 * over this segment; an unknown slug is a 404. Offer prices and photos come from the
 * catalog. Schema.org FAQPage markup is added for the questions block.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductShelf } from "@/components/catalog/ProductShelf";
import { FaqSection } from "@/components/landing/FaqSection";
import { LandingAdvantages } from "@/components/landing/LandingAdvantages";
import { LandingHero } from "@/components/landing/LandingHero";
import { OfferGrid } from "@/components/landing/OfferGrid";
import { ProjectShelf } from "@/components/portfolio/ProjectShelf";
import { ContactsSection } from "@/components/sections/ContactsSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SeoText } from "@/components/sections/SeoText";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { resolveOffers } from "@/lib/catalog/offers";
import { telegramHref } from "@/lib/contact-links";
import {
  getCatalogCategories,
  getCatalogPage,
  getCatalogProducts,
  getCategoryPageCopy,
  getHomePage,
  getPortfolioPage,
  getPortfolioProjects,
  getSeoLanding,
  getSeoLandings,
  getServicesPage,
  getSiteSettings,
} from "@/lib/content";
import { routes } from "@/lib/routes";
import { faqPageJsonLd, serializeJsonLd } from "@/lib/seo/json-ld";

const SHELF_SIZE = 4;
const PROJECTS_SIZE = 3;

export async function generateStaticParams() {
  const landings = await getSeoLandings();
  return landings.map((landing) => ({ landing: landing.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[landing]">): Promise<Metadata> {
  const landing = await getSeoLanding((await params).landing);
  if (!landing) return {};
  return { title: landing.seo.title, description: landing.seo.description };
}

export default async function LandingPage({ params }: PageProps<"/[landing]">) {
  const landing = await getSeoLanding((await params).landing);
  if (!landing) notFound();

  const [
    settings,
    catalog,
    categoryCopy,
    home,
    categories,
    products,
    services,
    portfolio,
    projects,
  ] = await Promise.all([
    getSiteSettings(),
    getCatalogPage(),
    getCategoryPageCopy(),
    getHomePage(),
    getCatalogCategories(),
    getCatalogProducts(),
    getServicesPage(),
    getPortfolioPage(),
    getPortfolioProjects(),
  ]);

  const telegram = telegramHref(settings.telegramBot, landing.slug);
  const cards = resolveOffers(landing.offers.items, {
    categories,
    products,
    services: services.offers.items,
  });
  // Shelf products: the topic's sections, minus those already shown as offer cards.
  const offered = new Set(cards.map((card) => card.href));
  const shelf = landing.catalog
    ? products
        .filter((product) => landing.catalog?.categorySlugs.includes(product.categorySlug))
        .filter((product) => !offered.has(routes.product(product.categorySlug, product.slug)))
        .slice(0, SHELF_SIZE)
    : [];
  const shelfLink = landing.catalog?.categorySlugs[0];
  const projectShelf = landing.projects
    ? projects
        .filter((project) => project.category === landing.projects?.category)
        .slice(0, PROJECTS_SIZE)
    : [];
  const tagLabels = Object.fromEntries(catalog.filters.tags.map(({ tag, label }) => [tag, label]));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqPageJsonLd(landing.faq.items)) }}
      />
      <Breadcrumbs
        items={[{ label: "Главная", href: routes.home }, { label: landing.hero.title }]}
        className="mt-4 md:mt-8"
      />
      <LandingHero
        hero={landing.hero}
        facts={landing.facts}
        orderLabel={home.hero.cta.label}
        telegramLabel={categoryCopy.telegramLabel}
        telegramHref={telegram}
      />
      <OfferGrid offers={landing.offers} cards={cards} />
      {landing.catalog && shelf.length > 0 && shelfLink && (
        <ProductShelf
          title={landing.catalog.title}
          link={{ label: landing.catalog.linkLabel, href: routes.catalogCategory(shelfLink) }}
          products={shelf}
          labels={catalog.productCard}
          detailsLabel={categoryCopy.detailsLabel}
          tagLabels={tagLabels}
          telegramBot={settings.telegramBot}
        />
      )}
      {landing.projects && projectShelf.length > 0 && (
        <Section>
          <ProjectShelf
            title={landing.projects.title}
            allLabel={categoryCopy.noProducts.allProjectsLabel}
            projects={projectShelf}
            categories={portfolio.categories}
            photosLabel={portfolio.list.photosLabel}
          />
        </Section>
      )}
      <LandingAdvantages advantages={landing.advantages} />
      <ProcessSection
        process={home.process}
        title={landing.process.title}
        lead={landing.process.lead}
      />
      <FaqSection faq={landing.faq} telegramHref={telegram} />
      <LeadFormSection
        leadForm={landing.leadForm}
        source="landing"
        privacyPolicyHref={settings.privacyPolicyHref}
        telegram={{ href: telegram, label: categoryCopy.telegramLabel }}
      />
      <ContactsSection contacts={{ title: landing.contactsTitle }} settings={settings} />
      <Section>
        <SeoText
          title={landing.seoText.title}
          blocks={landing.seoText.blocks}
          moreLabel={categoryCopy.seoMoreLabel}
        />
      </Section>
    </>
  );
}
