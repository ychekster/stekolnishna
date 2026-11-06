/**
 * Pill button (design: Button). Renders `<a>` when `href` is given, otherwise `<button>`.
 *
 * Variants: primary (dark fill) · light (white, for photos and dark blocks) ·
 * outline (border) · ghost (text link). Sizes: sm 36px · md 44px · lg 52px.
 */
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "light" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-label transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-45";

// Border color lives in each variant (not in `base`): two border-color utilities on one
// element conflict, and CSS order — not class order — would decide the winner.
const variants: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-ink text-surface hover:bg-accent-strong",
  light:
    "border-transparent bg-ink-inverse text-surface-inverse hover:bg-accent-soft hover:text-ink",
  outline: "bg-transparent text-ink border-line-strong hover:border-ink",
  ghost: "border-transparent bg-transparent text-accent-strong underline-offset-4 hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-nav",
  md: "h-11 px-6",
  lg: "h-13 px-8 text-[16px]",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon rendered after the label. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href">;
type ButtonAsButton = CommonProps & { href?: undefined } & ComponentPropsWithoutRef<"button">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", icon, className, children, ...rest } = props;
  const classes = cn(
    base,
    variants[variant],
    // Ghost is a text link: no fixed height or horizontal padding.
    variant === "ghost" ? "h-auto px-0" : sizes[size],
    className,
  );
  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    // Internal routes go through next/link (prefetching); anchors and external URLs stay <a>.
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
