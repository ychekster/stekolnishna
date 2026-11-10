/**
 * Title and description of a record page (category, product, project). A record's own `seo`
 * wins; otherwise the page's fallback template from the content is filled with the record's
 * fields, so every page gets a distinct title without the editor writing one each time.
 */
import type { PageSeo } from "@/lib/content/types";
import { fillTemplate } from "@/lib/format/template";

export function recordSeo(
  own: PageSeo | null | undefined,
  fallback: PageSeo,
  values: Record<string, string>,
): PageSeo {
  return {
    title: own?.title || fillTemplate(fallback.title, values),
    description: own?.description || fillTemplate(fallback.description, values),
  };
}
