/**
 * Business direction card (design: ServiceCard): dark circle with an icon, title, text.
 */
import { Icon } from "@/components/ui/Icon";
import type { ServiceItem } from "@/lib/content/types";

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className="flex min-h-50 flex-col gap-3 rounded-md bg-surface-alt p-6">
      <div className="grid size-10 place-items-center rounded-full bg-surface-inverse text-ink-inverse">
        <Icon name={service.icon} />
      </div>
      {/* mt-auto pushes the text to the bottom so titles line up across cards. */}
      <h3 className="m-0 mt-auto text-title">{service.title}</h3>
      <p className="m-0 text-body text-ink-muted">{service.description}</p>
    </article>
  );
}
