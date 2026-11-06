/**
 * Page container: max 1200px, side gutters 32px desktop / 16px mobile.
 */
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto max-w-content px-4 md:px-8", className)}>{children}</div>;
}
