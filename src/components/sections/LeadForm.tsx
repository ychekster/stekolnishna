"use client";

/**
 * Lead form fields (design: ContactForm, right column of the dark block).
 * Shared by every page with a lead form; each placement sets the label of the free-text
 * field and its `source` (see src/lib/leads/schema.ts).
 *
 * Submits to the `submitLead` Server Action via useActionState: works without JS
 * (progressive enhancement) and shows field errors as text and a success message.
 *
 * Deviation from the mockup, on purpose: the mockup has only a consent sentence;
 * Kazakhstan personal data law and the spec (§9) require an explicit consent mechanism,
 * so there is a required checkbox.
 */
import { CircleCheck } from "lucide-react";
import { useActionState } from "react";

import { Button } from "@/components/ui/Button";
import { ConsentCheckbox } from "@/components/ui/ConsentCheckbox";
import { Honeypot } from "@/components/ui/Honeypot";
import { ICON_STROKE } from "@/components/ui/Icon";
import { TextField } from "@/components/ui/TextField";
import { submitLead, type LeadFormState } from "@/lib/leads/actions";
import type { LeadSource } from "@/lib/leads/schema";

const initialState: LeadFormState = { status: "idle" };

interface LeadFormProps {
  source: LeadSource;
  /** Label of the free-text field: "Что нужно изготовить", "Удобный день и время"… */
  detailsLabel: string;
  submitLabel: string;
  successMessage: string;
  privacyPolicyHref: string;
}

export function LeadForm({
  source,
  detailsLabel,
  submitLabel,
  successMessage,
  privacyPolicyHref,
}: LeadFormProps) {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  if (state.status === "success") {
    return (
      <p role="status" className="m-0 flex items-center gap-2 text-label text-ink-inverse">
        <CircleCheck size={22} strokeWidth={ICON_STROKE} aria-hidden="true" />
        {successMessage}
      </p>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : undefined;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <input type="hidden" name="source" value={source} />
      <TextField
        tone="dark"
        label="Имя"
        name="name"
        autoComplete="name"
        defaultValue={values?.name}
        error={errors.name}
      />
      <TextField
        tone="dark"
        label="Телефон"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+7 ___ ___-__-__"
        required
        defaultValue={values?.phone}
        error={errors.phone}
      />
      <TextField
        tone="dark"
        label={detailsLabel}
        name="details"
        defaultValue={values?.details}
        error={errors.details}
      />

      <Honeypot />
      <ConsentCheckbox tone="dark" privacyPolicyHref={privacyPolicyHref} error={errors.consent} />

      {state.status === "error" && state.formError && (
        <p role="alert" className="m-0 text-caption font-medium text-ink-inverse">
          <span aria-hidden="true">⚠ </span>
          {state.formError}
        </p>
      )}

      <Button type="submit" variant="light" className="mt-2 w-full" disabled={isPending}>
        {isPending ? "Отправляем…" : submitLabel}
      </Button>
    </form>
  );
}
