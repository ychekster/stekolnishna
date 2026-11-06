/**
 * One contact line: accent icon, muted label, bold value (link or text), optional note.
 */
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/content/types";

interface ContactItemProps {
  icon: IconName;
  label: string;
  value: ReactNode;
  href?: string;
  note?: string;
  external?: boolean;
}

export function ContactItem({ icon, label, value, href, note, external }: ContactItemProps) {
  const valueClass = "text-title text-ink block";
  return (
    <div className="flex items-start gap-3">
      <span className="pt-0.5 text-accent-strong">
        <Icon name={icon} />
      </span>
      <div>
        <div className="text-caption text-ink-muted">{label}</div>
        {href ? (
          <a
            href={href}
            className={`${valueClass} hover:text-accent-strong`}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {value}
          </a>
        ) : (
          <div className={valueClass}>{value}</div>
        )}
        {note && <div className="mt-1 text-caption text-ink-muted">{note}</div>}
      </div>
    </div>
  );
}
