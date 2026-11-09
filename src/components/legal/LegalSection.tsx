/**
 * One section of the legal page (privacy policy, consent, terms, cookies): heading and
 * paragraphs. Its id is the URL anchor the footer, forms and cookie banner link to.
 */
import type { LegalSection as LegalSectionData } from "@/lib/content/types";

export function LegalSection({ section }: { section: LegalSectionData }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="py-8 md:py-10">
      <h2 id={`${section.id}-title`} className="m-0 text-h2 md:text-form-title">
        {section.title}
      </h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="m-0 mt-3.5 text-body text-ink-muted">
          {paragraph}
        </p>
      ))}
    </section>
  );
}
