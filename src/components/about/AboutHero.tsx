/**
 * Top of the About page: H1 with an intro paragraph beside it (below it on mobile),
 * a wide photo and a row of key numbers closed by a divider.
 */
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Stat } from "@/components/ui/Stat";
import type { AboutPage } from "@/lib/content/types";

export function AboutHero({ hero }: { hero: AboutPage["hero"] }) {
  return (
    <section aria-labelledby="about-title" className="mt-4 md:mt-6">
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-12">
        <h1
          id="about-title"
          className="m-0 max-w-190 flex-[1_1_560px] text-display-sm md:text-display"
        >
          {hero.title}
        </h1>
        <p className="m-0 max-w-95 flex-[1_1_300px] text-body text-ink-muted md:text-intro">
          {hero.lead}
        </p>
      </div>
      <div className="mt-6 h-60 overflow-hidden rounded-md md:mt-12 md:h-120 md:rounded-lg">
        <MediaFrame
          image={hero.image}
          sizes="(min-width: 1200px) 1136px, 100vw"
          preload
          // Keep the glass facade in frame when the wide photo is cropped to a short band.
          imageClassName="object-[70%_60%]"
        />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6 border-b border-line pb-6 md:mt-12 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:gap-8 md:pb-12">
        {hero.stats.map((stat) => (
          <Stat key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
