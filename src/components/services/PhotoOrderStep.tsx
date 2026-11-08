/**
 * One step of "Заказ по фото или чертежу": big accent number, title, description.
 * The number is decorative: the surrounding <ol> already conveys the order.
 */
import type { InstructionStep } from "@/lib/content/types";

export function PhotoOrderStep({ step, number }: { step: InstructionStep; number: number }) {
  return (
    <li className="rounded-md border border-line p-5 md:p-7">
      <div aria-hidden="true" className="text-stat-sm text-accent md:text-stat">
        {number}
      </div>
      <h3 className="m-0 mt-3 text-title md:mt-4">{step.title}</h3>
      <p className="m-0 mt-2 text-body text-ink-muted">{step.description}</p>
    </li>
  );
}
