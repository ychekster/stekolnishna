/**
 * Round 36px icon button (design: IconButton), used for carousel arrows.
 * `aria-label` is required because the button has no visible text.
 */
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  "aria-label": string;
  variant?: "outline" | "solid";
  children: ReactNode;
}

export function IconButton({
  variant = "outline",
  className,
  children,
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-grid size-9 cursor-pointer place-items-center rounded-full border p-0 transition-colors duration-150",
        "hover:border-ink hover:bg-ink hover:text-surface disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink",
        variant === "solid"
          ? "border-ink bg-ink text-surface disabled:hover:bg-ink disabled:hover:text-surface"
          : "border-line-strong bg-transparent text-ink",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
