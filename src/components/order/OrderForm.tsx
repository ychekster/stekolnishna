"use client";

/**
 * Full order form (spec §4.2, mockup "Оформление заявки"): name, phone, product type,
 * sizes, quantity, comment, photos or drawings, consent. Grey card, two columns on desktop.
 *
 * Submits to the `submitOrder` Server Action. With JS the form is sent by hand, so the
 * picked files come from state (they can be added in several goes and removed) and React
 * does not reset the fields; without JS the browser posts the form itself, files included.
 * On success the card turns into a confirmation; "Новая заявка" asks the parent to remount.
 *
 * Deviations from the mockup: no lead number (leads are not stored yet), no "copy in
 * WhatsApp" (docs/decisions/0003); the product list is the catalog sections plus "Другое".
 */
import { Check } from "lucide-react";
import { startTransition, useActionState, useState, type FormEvent } from "react";

import { BoxedField } from "@/components/ui/BoxedField";
import { Button } from "@/components/ui/Button";
import { ConsentCheckbox } from "@/components/ui/ConsentCheckbox";
import { Honeypot } from "@/components/ui/Honeypot";
import { ICON_STROKE } from "@/components/ui/Icon";
import type { OrderPage } from "@/lib/content/types";
import { submitOrder, type OrderFormState } from "@/lib/leads/actions";

import { FileDrop } from "./FileDrop";

const initialState: OrderFormState = { status: "idle" };

interface OrderFormProps {
  form: OrderPage["form"];
  success: OrderPage["success"];
  /** Catalog section names for the "Вид изделия" select. */
  productTypes: string[];
  catalogHref: string;
  privacyPolicyHref: string;
  onReset: () => void;
}

export function OrderForm({
  form,
  success,
  productTypes,
  catalogHref,
  privacyPolicyHref,
  onReset,
}: OrderFormProps) {
  const [state, formAction, isPending] = useActionState(submitOrder, initialState);
  const [files, setFiles] = useState<File[]>([]);
  // The server's file error belongs to the files it saw; hide it once they change.
  const [filesChangedAt, setFilesChangedAt] = useState<OrderFormState | null>(null);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-lg bg-surface-alt p-6 md:p-12"
      >
        <span className="grid size-14 place-items-center rounded-full bg-success text-ink-inverse">
          <Check size={24} strokeWidth={ICON_STROKE} aria-hidden="true" />
        </span>
        <h2 className="m-0 text-h2 md:text-form-title">{success.title}</h2>
        <p className="m-0 max-w-120 text-body text-ink-muted">{success.text}</p>
        <div className="flex flex-wrap gap-2">
          <Button href={catalogHref}>{success.catalogLabel}</Button>
          <Button variant="outline" onClick={onReset}>
            {success.againLabel}
          </Button>
        </div>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : undefined;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.delete("files");
    for (const file of files) data.append("files", file);
    startTransition(() => formAction(data));
  };

  const options = [
    { value: "", label: form.productTypePlaceholder },
    ...[...productTypes, form.productTypeOther].map((name) => ({ value: name, label: name })),
  ];

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="grid grid-cols-1 gap-x-6 gap-y-5 rounded-lg bg-surface-alt p-5 md:grid-cols-2 md:p-10"
    >
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
        label={form.productTypeLabel}
        name="productType"
        options={options}
        defaultValue={values?.productType ?? ""}
        error={errors.productType}
      />
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-3">
        <BoxedField
          label={form.sizeLabel}
          name="size"
          placeholder={form.sizePlaceholder}
          defaultValue={values?.size}
          error={errors.size}
        />
        <BoxedField
          label={form.quantityLabel}
          name="quantity"
          type="number"
          inputMode="numeric"
          min={1}
          max={9999}
          defaultValue={values?.quantity || "1"}
          error={errors.quantity}
        />
      </div>
      <BoxedField
        control="textarea"
        label={form.detailsLabel}
        name="details"
        rows={4}
        placeholder={form.detailsPlaceholder}
        defaultValue={values?.details}
        error={errors.details}
        className="md:col-span-2"
      />
      <FileDrop
        files={files}
        onChange={(next) => {
          setFiles(next);
          setFilesChangedAt(state);
        }}
        labels={form}
        serverError={filesChangedAt === state ? undefined : errors.files}
        className="md:col-span-2"
      />
      <Honeypot />

      {state.status === "error" && state.formError && (
        <p role="alert" className="m-0 text-caption font-medium text-danger md:col-span-2">
          {state.formError}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 md:col-span-2">
        <ConsentCheckbox
          privacyPolicyHref={privacyPolicyHref}
          error={errors.consent}
          className="max-w-115"
        />
        <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? "Отправляем…" : form.submitLabel}
        </Button>
      </div>
    </form>
  );
}
