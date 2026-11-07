/**
 * Top of the Contacts page: H1 with an intro paragraph beside it (below it on mobile).
 */
import type { ContactsPage } from "@/lib/content/types";

export function ContactsHero({ hero }: { hero: ContactsPage["hero"] }) {
  return (
    <section
      aria-labelledby="contacts-page-title"
      className="mt-4 flex flex-wrap items-end justify-between gap-4 md:mt-6 md:gap-12"
    >
      <h1 id="contacts-page-title" className="m-0 text-display-sm md:text-display">
        {hero.title}
      </h1>
      <p className="m-0 max-w-105 flex-[0_1_420px] text-body text-ink-muted md:text-intro">
        {hero.lead}
      </p>
    </section>
  );
}
