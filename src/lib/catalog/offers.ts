/**
 * Resolves the offer cards of an SEO landing ("Что мы делаем. Цены от.") from references to
 * catalog sections, products and services. Prices, photos and links come from the catalog
 * and the Services page, so a landing never shows a price that differs from the catalog.
 * Unknown references are skipped: an item removed from the catalog must not break a page.
 */
import type {
  CatalogCategory,
  CatalogProduct,
  OfferCard,
  OfferRef,
  ServiceOffer,
} from "@/lib/content/types";
import { formatPrice } from "@/lib/format/price";
import { routes } from "@/lib/routes";

interface OfferSources {
  categories: readonly CatalogCategory[];
  products: readonly CatalogProduct[];
  services: readonly ServiceOffer[];
}

export function resolveOffers(refs: readonly OfferRef[], sources: OfferSources): OfferCard[] {
  return refs.flatMap((ref): OfferCard[] => {
    if (ref.kind === "category") {
      const category = sources.categories.find((item) => item.slug === ref.slug);
      if (!category) return [];
      return [
        {
          title: category.name,
          description: ref.description ?? category.description,
          priceLabel: formatPrice(category.price),
          href: routes.catalogCategory(category.slug),
          image: category.image,
        },
      ];
    }
    if (ref.kind === "product") {
      const product = sources.products.find((item) => item.slug === ref.slug);
      if (!product) return [];
      return [
        {
          title: product.name,
          description: ref.description ?? product.summary,
          priceLabel: formatPrice(product.price),
          href: routes.product(product.categorySlug, product.slug),
          image: product.image,
        },
      ];
    }
    const service = sources.services.find((item) => item.slug === ref.slug);
    if (!service) return [];
    return [
      {
        title: service.title,
        description: service.description,
        priceLabel: service.price,
        href: `${routes.services}#${service.slug}`,
        image: service.image,
      },
    ];
  });
}
