/**
 * A tile of the contact cards row: round icon at the top, content pushed to the bottom.
 * `dark` is the highlighted tile (the Telegram bot), the rest are light grey.
 */
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { IconName } from "@/lib/content/types";

interface ContactCardProps {
  icon: IconName;
  tone?: "light" | "dark";
  children: ReactNode;
}

export function ContactCard({ icon, tone = "light", children }: ContactCardProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-md p-6 md:min-h-49",
        dark ? "bg-surface-inverse text-ink-inverse" : "bg-surface-alt text-ink",
      )}
    >
      <div
        className={cn(
          "grid size-10 place-items-center rounded-full",
          dark ? "bg-accent text-on-accent" : "bg-surface-inverse text-ink-inverse",
        )}
      >
        <Icon name={icon} />
      </div>
      <div className="mt-auto">{children}</div>
    </div>
  );
}
