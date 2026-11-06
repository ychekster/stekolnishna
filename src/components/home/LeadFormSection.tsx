/**
 * "Рассчитаем стоимость вашего проекта": dark block with intro on the left and the form
 * on the right. Anchor `#form` — target of every "Оставить заявку" button.
 * On mobile the block goes full-bleed (edge to edge, no rounding), as in the design.
 */
import { Section } from "@/components/ui/Section";
import type { HomePage, SiteSettings } from "@/lib/content/types";

import { LeadForm } from "./LeadForm";

interface LeadFormSectionProps {
  leadForm: HomePage["leadForm"];
  privacyPolicyHref: SiteSettings["privacyPolicyHref"];
}

export function LeadFormSection({ leadForm, privacyPolicyHref }: LeadFormSectionProps) {
  return (
    <Section
      id="form"
      labelledBy="form-title"
      className="-mx-4 grid grid-cols-1 gap-6 bg-surface-inverse px-4 py-6 text-ink-inverse md:mx-0 md:grid-cols-2 md:gap-12 md:rounded-lg md:p-12"
    >
      <div>
        <h2 id="form-title" className="m-0 text-h2 md:text-form-title">
          {leadForm.title}
        </h2>
        <p className="m-0 mt-2 max-w-90 text-caption text-ink-inverse-muted md:mt-4 md:text-body">
          {leadForm.lead}
        </p>
      </div>
      <LeadForm
        submitLabel={leadForm.submitLabel}
        successMessage={leadForm.successMessage}
        privacyPolicyHref={privacyPolicyHref}
      />
    </Section>
  );
}
