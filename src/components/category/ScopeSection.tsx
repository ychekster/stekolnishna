/**
 * "Что входит в работу" on a category page without products: four outlined cards with a
 * dark icon circle, title and one line (two columns on phones).
 */
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import type { CategoryPageCopy } from "@/lib/content/types";

export function ScopeSection({ copy }: { copy: CategoryPageCopy["noProducts"] }) {
  return (
    <Section labelledBy="scope-title">
      <h2 id="scope-title" className="m-0 text-h2 md:text-h1">
        {copy.scopeTitle}
      </h2>
      <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-3 p-0 md:mt-8 md:grid-cols-4 md:gap-4">
        {copy.scope.map((item) => (
          <li key={item.title} className="rounded-lg border border-line p-4 md:p-5">
            <span className="grid size-9 place-items-center rounded-full bg-surface-inverse text-ink-inverse">
              <Icon name={item.icon} size={18} />
            </span>
            <h3 className="m-0 mt-4 text-nav font-semibold md:text-title">{item.title}</h3>
            <p className="m-0 mt-1.5 text-small text-ink-muted md:text-caption">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
