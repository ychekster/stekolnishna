"use client";

/**
 * Gallery of glass-drawing samples: list of sets with counters on the left (sideways chips on
 * phones), the chosen set's square previews with their number in the corner, "Показать ещё
 * 24" and a lightbox. The number is the sample's position in its set: the client tells it
 * to the manager. Controlled by `slug` so the URL wrapper can keep the set in `?nabor=`.
 */
import { cn } from "@/lib/cn";
import type { DrawingSet, DrawingsPageCopy } from "@/lib/content/types";

import { DrawingSetGallery } from "./DrawingSetGallery";
import { NoMatchCard } from "./NoMatchCard";

interface DrawingsBrowserProps {
  sets: DrawingSet[];
  copy: DrawingsPageCopy;
  slug: string;
  onSelect?: (slug: string) => void;
  telegramHref: string;
}

export function DrawingsBrowser({
  sets,
  copy,
  slug,
  onSelect,
  telegramHref,
}: DrawingsBrowserProps) {
  const set = sets.find((item) => item.slug === slug) ?? sets[0];
  if (!set) return null;

  return (
    <section
      aria-label={copy.setsTitle}
      className="mt-8 grid grid-cols-1 gap-6 md:mt-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8"
    >
      <nav aria-label={copy.setsTitle} className="min-w-0">
        <div className="hidden rounded-lg bg-surface-alt p-3 lg:block">
          <h2 className="m-0 px-3 pt-2 pb-2 text-label font-semibold">{copy.setsTitle}</h2>
          <ul className="m-0 list-none p-0">
            {sets.map((item) => (
              <li key={item.slug}>
                <button
                  type="button"
                  aria-pressed={item.slug === set.slug}
                  onClick={() => onSelect?.(item.slug)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-sm border-0 px-3 py-1.5 text-left text-caption",
                    item.slug === set.slug
                      ? "bg-ink text-surface"
                      : "bg-transparent text-ink hover:bg-surface",
                  )}
                >
                  {item.name}
                  <span className="opacity-60">{item.images.length}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="-mx-4 scrollbar-none flex gap-2 overflow-x-auto px-4 lg:hidden">
          {sets.map((item) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={item.slug === set.slug}
              onClick={() => onSelect?.(item.slug)}
              className={cn(
                "shrink-0 cursor-pointer rounded-full border px-4 py-2 text-nav whitespace-nowrap",
                item.slug === set.slug
                  ? "border-ink bg-ink text-surface"
                  : "border-line-strong bg-transparent text-ink",
              )}
            >
              {item.name} <span className="opacity-60">{item.images.length}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="min-w-0">
        {/* A new set starts from its first page and with the lightbox closed. */}
        <DrawingSetGallery key={set.slug} set={set} copy={copy} />
        <NoMatchCard copy={copy.noMatch} telegramHref={telegramHref} />
      </div>
    </section>
  );
}
