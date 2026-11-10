/**
 * Page container: side gutters 32px desktop / 16px mobile. Max width 1200px for content;
 * `wide` (1440px) only for the header row, which the user wanted wider than the content.
 */
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ContainerProps {
  wide?: boolean;
  className?: string;
  children: ReactNode;
}

export function Container({ wide, className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto px-4 md:px-8", wide ? "max-w-wide" : "max-w-content", className)}>
      {children}
    </div>
  );
}
