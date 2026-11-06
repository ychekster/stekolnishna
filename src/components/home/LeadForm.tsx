"use client";

/**
 * Lead form fields (design: ContactForm, right column of the dark block).
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
import { ICON_STROKE } from "@/components/ui/Icon";
import { TextField } from "@/components/ui/TextField";
import { submitLead, type LeadFormState } from "@/lib/leads/actions";
import { HONEYPOT_FIELD } from "@/lib/leads/schema";

const initialState: LeadFormState = { status: "idle" };

interface LeadFormProps {
  submitLabel: string;
  successMessage: string;
  privacyPolicyHref: string;
}

export function LeadForm({ submitLabel, successMessage, privacyPolicyHref }: LeadFormProps) {
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
        label="Что нужно изготовить"
        name="task"
        defaultValue={values?.task}
        error={errors.task}
      />

      {/* Honeypot: hidden from people and screen readers, filled only by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Не заполняйте это поле
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-2 text-small text-ink-inverse-muted">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 size-4 shrink-0 accent-accent"
          />
          <span>
            Я согласен(на) на обработку персональных данных в соответствии с{" "}
            <a href={privacyPolicyHref} className="text-ink-inverse underline underline-offset-2">
              политикой конфиденциальности
            </a>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="m-0 mt-1 text-caption font-medium text-ink-inverse">
            <span aria-hidden="true">⚠ </span>
            {errors.consent}
          </p>
        )}
      </div>

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
