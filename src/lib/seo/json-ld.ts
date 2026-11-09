/**
 * Schema.org structured data (spec §6) as plain objects, rendered by pages into
 * <script type="application/ld+json">. FAQPage now; LocalBusiness and BreadcrumbList need the
 * real company data and the final domain (absolute URLs), see docs/backlog.md.
 */
import type { FaqItem } from "@/lib/content/types";

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** JSON for a <script> tag: `<` escaped so text can never close the tag early. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
