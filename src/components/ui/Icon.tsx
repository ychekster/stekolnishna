/**
 * Maps CMS-friendly icon keys (`IconName`) to Lucide icons (and our Telegram glyph).
 * Design spec: line icons, 1.7px stroke. Decorative by default (`aria-hidden`).
 */
import {
  Check,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  SlidersVertical,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/lib/content/types";

import { TelegramIcon } from "./TelegramIcon";

/** Stroke width from the design system — use it for any Lucide icon in the project. */
export const ICON_STROKE = 1.7;

const icons: Record<Exclude<IconName, "telegram">, LucideIcon> = {
  sliders: SlidersVertical,
  check: Check,
  document: FileText,
  pin: MapPin,
  chat: MessageCircle,
  phone: Phone,
  mail: Mail,
  shield: ShieldCheck,
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  // Brand glyph: filled, not stroked, so it does not go through the Lucide map.
  if (name === "telegram") return <TelegramIcon size={size} className={className} />;
  const Component = icons[name];
  return (
    <Component size={size} strokeWidth={ICON_STROKE} className={className} aria-hidden="true" />
  );
}
