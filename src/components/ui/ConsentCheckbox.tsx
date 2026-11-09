/**
 * Required personal-data consent checkbox of every form (Kazakhstan personal data law,
 * spec §9). `tone="dark"` is for the dark lead-form block. The error is text, linked via
 * aria-describedby; on the dark block a warning sign carries it (danger red lacks contrast).
 */
import Link from "next/link";
import { useId } from "react";

import { cn } from "@/lib/cn";

interface ConsentCheckboxProps {
  privacyPolicyHref: string;
  error?: string;
  tone?: "light" | "dark";
  className?: string;
}

export function ConsentCheckbox({
  privacyPolicyHref,
  error,
  tone = "light",
  className,
}: ConsentCheckboxProps) {
  const errorId = `${useId()}-consent-error`;
  const dark = tone === "dark";

  return (
    <div className={className}>
      <label
        className={cn(
          "flex cursor-pointer items-start gap-2 text-small",
          dark ? "text-ink-inverse-muted" : "text-ink-muted",
        )}
      >
        <input
          type="checkbox"
          name="consent"
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn("mt-0.5 size-4 shrink-0", dark ? "accent-accent" : "accent-ink")}
        />
        <span>
          Я согласен(на) на обработку персональных данных в соответствии с{" "}
          <Link
            href={privacyPolicyHref}
            className={cn(
              "underline underline-offset-2",
              dark ? "text-ink-inverse" : "text-accent-strong hover:text-ink",
            )}
          >
            политикой конфиденциальности
          </Link>
        </span>
      </label>
      {error && (
        <p
          id={errorId}
          className={cn(
            "m-0 mt-1 text-caption font-medium",
            dark ? "text-ink-inverse" : "text-danger",
          )}
        >
          {dark && <span aria-hidden="true">⚠ </span>}
          {error}
        </p>
      )}
    </div>
  );
}
