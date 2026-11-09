/**
 * Pill toggle of a filter row (catalog tags, portfolio categories): dark when pressed,
 * outlined otherwise. `count` is shown dimmed after the label.
 */
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

interface FilterChipProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  label: string;
  pressed: boolean;
  count?: number;
}

export function FilterChip({ label, pressed, count, className, ...rest }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cn(
        "shrink-0 cursor-pointer rounded-full border px-4 py-2 text-nav whitespace-nowrap transition-colors duration-150",
        pressed
          ? "border-ink bg-ink text-surface"
          : "border-line-strong bg-transparent text-ink hover:border-ink",
        className,
      )}
      {...rest}
    >
      {label}
      {count !== undefined && <span className="ml-1 opacity-60">{count}</span>}
    </button>
  );
}
