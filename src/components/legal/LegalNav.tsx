/**
 * Table of contents of the legal page: grey panel with anchor links to the sections.
 * Sticks below the header on desktop so the reader can jump between long sections; on
 * phones it is a plain block above the text.
 */
import type { LegalPage } from "@/lib/content/types";

export function LegalNav({ label, sections }: { label: string; sections: LegalPage["sections"] }) {
  return (
    <nav
      aria-label={label}
      className="rounded-lg bg-surface-alt p-3 md:sticky md:top-[calc(var(--header-height)+--spacing(6))]"
    >
      <ul className="m-0 list-none p-0">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="block rounded-sm px-3 py-2 text-nav text-ink hover:bg-surface hover:text-accent-strong"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
