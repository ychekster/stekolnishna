/**
 * "О компании": text on the left, 2×2 grid of stats on the right.
 */
import { Section } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import type { HomePage } from "@/lib/content/types";

export function AboutSection({ about }: { about: HomePage["about"] }) {
  return (
    <Section id="about" labelledBy="about-title" className="flex flex-wrap justify-between gap-12">
      <div className="max-w-130 flex-[1_1_420px]">
        <h2 id="about-title" className="m-0 text-h2 md:text-h1">
          {about.title}
        </h2>
        {about.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={`m-0 text-body text-ink-muted ${index === 0 ? "mt-4" : "mt-3"}`}
          >
            {paragraph}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-2 content-start gap-x-16 gap-y-8">
        {about.stats.map((stat) => (
          <Stat key={stat.label} stat={stat} />
        ))}
      </div>
    </Section>
  );
}
