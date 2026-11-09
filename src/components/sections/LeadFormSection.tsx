/**
 * Dark lead-form block (design: ContactSection): intro on the left, the form on the right.
 * Placed on several pages with different copy — homepage "Рассчитаем стоимость вашего
 * проекта", About page "Приезжайте посмотреть производство". Anchor `#form`: on the
 * homepage it is the target of every "Оставить заявку" button.
 * On mobile the block goes full-bleed (edge to edge, no rounding), as in the design.
 */
import type { ComponentProps } from "react";

import { Section } from "@/components/ui/Section";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import type { LeadFormContent, SiteSettings } from "@/lib/content/types";
import type { LeadSource } from "@/lib/leads/schema";

import { LeadForm } from "./LeadForm";

interface LeadFormSectionProps {
  leadForm: LeadFormContent;
  source: LeadSource;
  privacyPolicyHref: SiteSettings["privacyPolicyHref"];
  /** Outlined "Написать в Telegram" button under the intro (catalog and landing pages). */
  telegram?: { href: string; label: string };
  product?: ComponentProps<typeof LeadForm>["product"];
  sample?: ComponentProps<typeof LeadForm>["sample"];
}

export function LeadFormSection({
  leadForm,
  source,
  privacyPolicyHref,
  telegram,
  product,
  sample,
}: LeadFormSectionProps) {
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
        {telegram && (
          <a
            href={telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-9 items-center gap-2 rounded-full border border-ink-inverse-muted px-4 text-nav text-ink-inverse transition-colors duration-150 hover:border-ink-inverse"
          >
            <TelegramIcon size={16} />
            {telegram.label}
          </a>
        )}
      </div>
      <LeadForm
        source={source}
        product={product}
        sample={sample}
        detailsLabel={leadForm.detailsLabel}
        submitLabel={leadForm.submitLabel}
        successMessage={leadForm.successMessage}
        privacyPolicyHref={privacyPolicyHref}
      />
    </Section>
  );
}
