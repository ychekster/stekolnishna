/**
 * Floating WhatsApp button, fixed in the bottom-right corner on every page (spec §4.3).
 * Not part of the homepage mockup, but a hard requirement of the spec; styled with the
 * design tokens (dark circle like the step icons).
 */
import { MessageCircle } from "lucide-react";

import { ICON_STROKE } from "@/components/ui/Icon";
import { whatsappHref } from "@/lib/contact-links";

export function FloatingWhatsApp({ number }: { number: string }) {
  return (
    <a
      href={whatsappHref(number)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-surface-inverse text-ink-inverse shadow-pop transition-colors hover:bg-accent-strong md:right-6 md:bottom-6"
    >
      <MessageCircle size={26} strokeWidth={ICON_STROKE} aria-hidden="true" />
    </a>
  );
}
