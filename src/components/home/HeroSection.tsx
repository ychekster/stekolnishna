/**
 * Hero banner (design: Hero): photo with 20px rounding, dark scrim so the white title is
 * readable on any photo, title, subtitle and a light CTA button.
 */
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { HomePage } from "@/lib/content/types";

export function HeroSection({ hero }: { hero: HomePage["hero"] }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative mt-4 flex min-h-85 items-start overflow-hidden rounded-md md:mt-6 md:min-h-105 md:items-center md:rounded-lg"
    >
      <MediaFrame image={hero.image} sizes="(min-width: 1200px) 1136px, 100vw" preload cover />
      <div className="absolute inset-0 bg-scrim" aria-hidden="true" />
      <div className="relative max-w-155 px-4 py-6 text-ink-inverse md:px-12 md:py-16">
        <h1 id="hero-title" className="m-0 max-w-[11ch] text-display-sm md:text-display">
          {hero.title}
        </h1>
        <p className="mt-3 max-w-110 text-body md:mt-4 md:text-lead">{hero.lead}</p>
        <div className="mt-6 md:mt-8">
          <Button href={hero.cta.href} variant="light">
            {hero.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
