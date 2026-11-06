/**
 * Homepage section wrapper: consistent vertical rhythm between sections
 * (96px desktop / 48px mobile) and an optional anchor id for the menu.
 */
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionProps {
  id?: string;
  /** Accessible name of the section; usually the id of its heading. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("mt-12 md:mt-24", className)}>
      {children}
    </section>
  );
}
