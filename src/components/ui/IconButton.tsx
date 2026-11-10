/**
 * Round 36px icon button (design: IconButton), used for carousel and gallery arrows.
 * `light` is a white circle for use over photos.
 * `aria-label` is required because the button has no visible text.
 *
 * Hover styles apply to enabled buttons only (`enabled:`): a separate `disabled:hover:`
 * reset fought the hover colours by CSS order and could paint the arrow the colour of its
 * own background on the last carousel page.
 */
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  "aria-label": string;
  variant?: "outline" | "solid" | "light";
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
        "disabled:cursor-default disabled:opacity-40",
        variant === "solid" &&
          "border-ink bg-ink text-surface enabled:hover:border-accent-strong enabled:hover:bg-accent-strong",
        variant === "outline" &&
          "border-line-strong bg-transparent text-ink enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-surface",
        variant === "light" &&
          "border-transparent bg-surface text-ink enabled:hover:bg-ink enabled:hover:text-surface",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
