/**
 * One machine: dark icon circle, name and what it lets the workshop do.
 */
import { Icon } from "@/components/ui/Icon";
import type { EquipmentItem as EquipmentData } from "@/lib/content/types";

export function EquipmentItem({ item }: { item: EquipmentData }) {
  return (
    <li className="flex gap-4 py-5">
      <div className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-inverse text-ink-inverse">
        <Icon name={item.icon} />
      </div>
      <div>
        <h3 className="m-0 text-title">{item.title}</h3>
        <p className="m-0 mt-1.5 text-body text-ink-muted">{item.description}</p>
      </div>
    </li>
  );
}
