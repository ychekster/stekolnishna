/**
 * "Описание" and "Характеристики" of a product page in two columns. The table shows only
 * filled rows; without any, the description takes one column up to 760px.
 */
import { RichText } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import type { CatalogProduct, ProductPageCopy } from "@/lib/content/types";

interface ProductDetailsProps {
  product: CatalogProduct;
  copy: ProductPageCopy;
}

export function ProductDetails({ product, copy }: ProductDetailsProps) {
  const specs = (product.specs ?? []).filter((row) => row.value.trim() !== "");
  if (product.description.length === 0 && specs.length === 0) return null;

  return (
    <Section
      className={cn(
        "grid grid-cols-1 gap-10 md:gap-12",
        specs.length > 0 ? "md:grid-cols-2" : "max-w-190",
      )}
    >
      {product.description.length > 0 && (
        <div>
          <h2 className="m-0 text-h2">{copy.descriptionTitle}</h2>
          <RichText blocks={product.description} className="mt-4" />
        </div>
      )}
      {specs.length > 0 && (
        <div>
          <h2 className="m-0 text-h2">{copy.specsTitle}</h2>
          <dl className="m-0 dividers-between mt-4 border-y border-line">
            {specs.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-3"
              >
                <dt className="text-caption text-ink-muted">{row.label}</dt>
                <dd className="m-0 text-caption">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </Section>
  );
}
