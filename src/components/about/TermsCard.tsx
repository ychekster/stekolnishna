/**
 * Card with a list of terms (delivery or installation): icon + title, then check-marked
 * lines; the optional `highlight` of a line is bold — e.g. "Гарантия 2 года".
 */
import { Icon } from "@/components/ui/Icon";
import type { TermsCard as TermsCardData } from "@/lib/content/types";

export function TermsCard({ card }: { card: TermsCardData }) {
  return (
    <article className="rounded-md bg-surface-alt p-6 md:p-8">
      <div className="flex items-center gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-inverse text-ink-inverse">
          <Icon name={card.icon} />
        </div>
        <h3 className="m-0 text-title md:text-h2">{card.title}</h3>
      </div>
      <ul className="m-0 mt-6 flex list-none flex-col gap-3.5 p-0">
        {card.items.map((item) => (
          <li key={`${item.highlight ?? ""}${item.text}`} className="flex gap-3 text-body">
            <span className="shrink-0 text-accent-strong">
              <Icon name="check" />
            </span>
            <span>
              {item.highlight && <strong className="font-semibold">{item.highlight} </strong>}
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
