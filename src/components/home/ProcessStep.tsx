/**
 * One cooperation step (design: ProcessStep): dark icon circle, title, description,
 * divider line below.
 */
import { Icon } from "@/components/ui/Icon";
import type { ProcessStep as ProcessStepData } from "@/lib/content/types";

export function ProcessStep({ step }: { step: ProcessStepData }) {
  return (
    <li className="flex gap-3 border-b border-line py-3 md:gap-4 md:pt-4 md:pb-6">
      <div className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-inverse text-ink-inverse md:size-10">
        <Icon name={step.icon} size={18} />
      </div>
      <div>
        <h3 className="m-0 pt-1 text-nav font-semibold md:pt-2 md:text-title">{step.title}</h3>
        <p className="m-0 mt-1 max-w-90 text-small text-ink-muted md:mt-3 md:text-body">
          {step.description}
        </p>
      </div>
    </li>
  );
}
