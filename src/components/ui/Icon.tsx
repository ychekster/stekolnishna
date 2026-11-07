/**
 * Maps CMS-friendly icon keys (`IconName`) to Lucide icons.
 * Design spec: line icons, 1.7px stroke. Decorative by default (`aria-hidden`).
 */
import {
  Check,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  SlidersVertical,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/lib/content/types";

/** Stroke width from the design system — use it for any Lucide icon in the project. */
export const ICON_STROKE = 1.7;

const icons: Record<IconName, LucideIcon> = {
  sliders: SlidersVertical,
  check: Check,
  document: FileText,
  pin: MapPin,
  chat: MessageCircle,
  phone: Phone,
  mail: Mail,
  // Lucide has no brand logos; the paper plane is the conventional Telegram glyph.
  telegram: Send,
  shield: ShieldCheck,
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  const Component = icons[name];
  return (
    <Component size={size} strokeWidth={ICON_STROKE} className={className} aria-hidden="true" />
  );
}
