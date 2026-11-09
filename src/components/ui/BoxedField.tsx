/**
 * Boxed form control with the label on top (mockups "Оформление заявки", "Заказать звонок"):
 * white field, strong border, small radius. The underlined `TextField` stays for the dark
 * lead-form block; this one is for forms on light surfaces. Renders an input, a textarea or
 * a select. The error is text, linked via aria-describedby (never color only).
 */
import { useId, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

interface CommonProps {
  label: string;
  name: string;
  error?: string;
  className?: string;
}

type InputProps = CommonProps & { control?: "input" } & Omit<
    ComponentPropsWithoutRef<"input">,
    "id" | "className"
  >;
type TextareaProps = CommonProps & { control: "textarea" } & Omit<
    ComponentPropsWithoutRef<"textarea">,
    "id" | "className"
  >;
type SelectProps = CommonProps & {
  control: "select";
  /** Options; an empty `value` works as the "nothing chosen" placeholder. */
  options: { value: string; label: string }[];
} & Omit<ComponentPropsWithoutRef<"select">, "id" | "className" | "children">;

const controlClass =
  "w-full rounded-sm border bg-surface px-3 py-2.5 text-body font-medium text-ink outline-none placeholder:font-normal placeholder:text-ink-muted focus:border-ink";

export function BoxedField(props: InputProps | TextareaProps | SelectProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const { label, error, className, required } = props;
  const shared = {
    id,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    className: cn(controlClass, error ? "border-danger" : "border-line-strong"),
  };

  // Each branch drops the wrapper's own props before spreading the rest onto the element.
  let element;
  if (props.control === "textarea") {
    const { control, label, error, className, ...rest } = props;
    element = <textarea {...rest} {...shared} className={cn(shared.className, "resize-y")} />;
  } else if (props.control === "select") {
    const { control, label, error, className, options, ...rest } = props;
    element = (
      <select {...rest} {...shared} className={cn(shared.className, "cursor-pointer")}>
        {options.map((option) => (
          <option key={option.value + option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    const { control, label, error, className, ...rest } = props;
    element = <input {...rest} {...shared} />;
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-caption text-ink-muted">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {element}
      {error && (
        <p id={errorId} className="m-0 text-caption font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
