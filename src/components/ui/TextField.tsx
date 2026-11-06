/**
 * Underlined text field with the label on top (design: Input).
 * `tone="dark"` is for use on `surface-inverse` (the lead form block).
 * The error is rendered as text and linked via aria-describedby (never color only).
 */
import { useId, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

interface TextFieldProps extends Omit<ComponentPropsWithoutRef<"input">, "id"> {
  label: string;
  name: string;
  tone?: "light" | "dark";
  error?: string;
}

export function TextField({
  label,
  tone = "light",
  error,
  className,
  ...inputProps
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const dark = tone === "dark";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label
        htmlFor={id}
        className={cn("text-caption", dark ? "text-ink-inverse-muted" : "text-ink-muted")}
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "rounded-none border-0 border-b bg-transparent py-2 text-body outline-none focus-visible:outline-none",
          dark
            ? "border-ink-inverse-muted text-ink-inverse focus:border-ink-inverse"
            : "border-line-strong text-ink focus:border-ink",
          error && "border-danger",
        )}
        {...inputProps}
      />
      {error && (
        <p
          id={errorId}
          className={cn("m-0 text-caption font-medium", dark ? "text-ink-inverse" : "text-danger")}
        >
          {/* On the dark block the danger red lacks contrast, so a warning sign carries the meaning. */}
          {dark && <span aria-hidden="true">⚠ </span>}
          {error}
        </p>
      )}
    </div>
  );
}
