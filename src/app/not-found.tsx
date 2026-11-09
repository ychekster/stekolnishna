/**
 * 404 page (design mockup "404"): big accent "404", heading with a muted second half,
 * buttons to the homepage and the catalog, the hero glass photo on the right (below the
 * text on phones). Copy from the content layer.
 */
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { getNotFoundPage } from "@/lib/content";
import { routes } from "@/lib/routes";

export default async function NotFound() {
  const page = await getNotFoundPage();

  return (
    <section
      aria-labelledby="not-found-title"
      className="mt-8 flex flex-wrap items-center gap-8 md:mt-16 md:min-h-130 md:gap-12"
    >
      <div className="flex-[1_1_480px]">
        <div aria-hidden="true" className="text-code-sm text-accent md:text-code">
          404
        </div>
        <h1 id="not-found-title" className="m-0 mt-4 text-display-sm md:mt-6 md:text-h1">
          {page.title} <span className="text-ink-muted">{page.titleMuted}</span>
        </h1>
        <p className="m-0 mt-4 max-w-115 text-body text-ink-muted md:text-intro">{page.text}</p>
        <div className="mt-6 flex flex-wrap gap-2 md:mt-8">
          <Button href={routes.home} size="lg">
            {page.homeLabel}
          </Button>
          <Button href={routes.catalog} size="lg" variant="outline">
            {page.catalogLabel}
          </Button>
        </div>
      </div>
      <div className="aspect-square max-w-115 flex-[1_1_380px] overflow-hidden rounded-lg">
        <MediaFrame
          image={page.image}
          sizes="(min-width: 768px) 460px, 100vw"
          imageClassName="object-[80%_70%]"
        />
      </div>
    </section>
  );
}
