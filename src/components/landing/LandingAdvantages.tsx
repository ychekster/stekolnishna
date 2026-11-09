/**
 * "Почему заказывают у нас" on an SEO landing: heading on the left, four numbered points in
 * a 2×2 grid on the right (one column on phones), lines between rows.
 */
import { Section } from "@/components/ui/Section";
import type { SeoLanding } from "@/lib/content/types";

export function LandingAdvantages({ advantages }: { advantages: SeoLanding["advantages"] }) {
  return (
    <Section
      labelledBy="landing-advantages-title"
      className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
    >
      <h2 id="landing-advantages-title" className="m-0 text-h2 md:text-h1">
        {advantages.title}
      </h2>
      <ol className="m-0 dividers-between grid list-none grid-cols-1 gap-x-8 p-0 sm:grid-cols-2">
        {advantages.items.map((item, index) => (
          <li key={item.title} className="py-4">
            <span className="text-caption font-semibold text-accent-strong">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="m-0 mt-1 text-label font-semibold">{item.title}</h3>
            <p className="m-0 mt-1 text-caption text-ink-muted">{item.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
