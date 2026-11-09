"use client";

/**
 * Fields of the "Заказать звонок" dialog: name, phone, convenient time, consent. Submits to
 * the `submitCallback` Server Action (works without JS) and swaps to a thank-you message.
 *
 * Deviation from the mockup, on purpose: a required consent checkbox instead of the
 * "Нажимая кнопку, вы соглашаетесь…" line (Kazakhstan personal data law, spec §9).
 */
import { Check, Phone } from "lucide-react";
import { useActionState } from "react";

import { BoxedField } from "@/components/ui/BoxedField";
import { Button } from "@/components/ui/Button";
import { ConsentCheckbox } from "@/components/ui/ConsentCheckbox";
import { Honeypot } from "@/components/ui/Honeypot";
import { ICON_STROKE } from "@/components/ui/Icon";
import type { SiteSettings } from "@/lib/content/types";
import { submitCallback, type CallbackFormState } from "@/lib/leads/actions";

const initialState: CallbackFormState = { status: "idle" };

interface CallbackFormProps {
  content: SiteSettings["callback"];
  privacyPolicyHref: string;
}

export function CallbackForm({ content, privacyPolicyHref }: CallbackFormProps) {
  const [state, formAction, isPending] = useActionState(submitCallback, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="pt-6 pb-2">
        <span className="grid size-14 place-items-center rounded-full bg-success text-ink-inverse">
          <Check size={22} strokeWidth={ICON_STROKE} aria-hidden="true" />
        </span>
        <h2 id="callback-title" className="m-0 mt-5 text-h2 md:text-form-title">
          {content.successTitle}
        </h2>
        <p className="m-0 mt-2 text-body text-ink-muted">{content.successText}</p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : undefined;

  return (
    <>
      <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent-strong">
        <Phone size={20} strokeWidth={ICON_STROKE} aria-hidden="true" />
      </span>
      <h2 id="callback-title" className="m-0 mt-5 text-h2 md:text-form-title">
        {content.title}
      </h2>
      <p className="m-0 mt-2 text-body text-ink-muted">{content.lead}</p>

      <form action={formAction} noValidate className="mt-6 flex flex-col gap-3.5">
        <BoxedField
          label="Имя"
          name="name"
          autoComplete="name"
          placeholder="Как к вам обращаться"
          defaultValue={values?.name}
          error={errors.name}
        />
        <BoxedField
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
        <BoxedField
          control="select"
          label={content.timeLabel}
          name="preferredTime"
          options={content.timeOptions.map((option) => ({ value: option, label: option }))}
          defaultValue={values?.preferredTime}
          error={errors.preferredTime}
        />
        <Honeypot />
        <ConsentCheckbox privacyPolicyHref={privacyPolicyHref} error={errors.consent} />
        {state.status === "error" && state.formError && (
          <p role="alert" className="m-0 text-caption font-medium text-danger">
            {state.formError}
          </p>
        )}
        <Button type="submit" size="lg" className="mt-1.5 w-full" disabled={isPending}>
          {isPending ? "Отправляем…" : content.submitLabel}
        </Button>
      </form>
    </>
  );
}
