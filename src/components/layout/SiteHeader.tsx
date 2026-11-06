"use client";

/**
 * Site header (design: Header): logo, anchor menu, phone with working hours,
 * WhatsApp and "Оставить заявку" buttons. Below 768px the menu collapses into a burger
 * dropdown. Client component only because of the burger toggle state.
 */
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { ICON_STROKE } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { telHref, whatsappHref } from "@/lib/contact-links";
import type { SiteSettings } from "@/lib/content/types";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  // Close the dropdown with Escape — expected keyboard behavior for disclosure menus.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="flex flex-wrap items-center gap-x-6 gap-y-3 py-2">
      <div className="relative flex min-w-0 flex-[1_1_560px] items-center justify-between gap-8 py-2 md:py-4">
        <Brand name={settings.companyName} tagline={settings.tagline} />

        <nav
          id={menuId}
          aria-label="Основное меню"
          className={cn(
            // Desktop: inline row. Mobile: dropdown card under the header, shown when open.
            "md:flex md:gap-8",
            isMenuOpen
              ? "absolute inset-x-0 top-full z-20 flex flex-col rounded-md bg-surface py-2 shadow-pop"
              : "hidden",
          )}
        >
          {settings.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-label text-ink hover:text-accent-strong md:p-0 md:text-nav"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="cursor-pointer rounded-sm border-0 bg-transparent p-2 text-ink md:hidden"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X size={22} strokeWidth={ICON_STROKE} aria-hidden="true" />
          ) : (
            <Menu size={22} strokeWidth={ICON_STROKE} aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a href={telHref(settings.phoneE164)} className="mr-2 flex flex-col text-ink">
          <span className="text-label font-semibold">{settings.phoneDisplay}</span>
          <span className="text-small text-ink-muted">{settings.workingHours}</span>
        </a>
        <Button
          href={whatsappHref(settings.whatsappNumber)}
          variant="outline"
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
          icon={<MessageCircle size={18} strokeWidth={ICON_STROKE} aria-hidden="true" />}
        >
          WhatsApp
        </Button>
        <Button href="#form" size="sm">
          Оставить заявку
        </Button>
      </div>
    </header>
  );
}
