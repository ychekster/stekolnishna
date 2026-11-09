/**
 * Row of soft accent chips with short facts: "от 9 000 ₸/м²", "Срок изготовления от 3 дней".
 */
import { cn } from "@/lib/cn";

export function InfoChips({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("m-0 flex list-none flex-wrap gap-2 p-0", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-accent-soft px-3 py-1.5 text-caption font-medium text-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
