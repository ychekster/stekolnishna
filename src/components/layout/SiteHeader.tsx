"use client";

/**
 * Site header (design: Header), sticky at the top of every page.
 *
 * Desktop (≥ xl): logo, page navigation, phone with "Заказать звонок" under it, Telegram,
 * "Оставить заявку" (→ the full order page). Below xl: logo, call button, burger. Phone,
 * hours, callback, Telegram and the CTA move into the burger panel: a sticky header must
 * stay one compact row, or it eats half a phone screen.
 *
 * Deviations from the mockup: Telegram replaces WhatsApp (docs/decisions/0003); the
 * burger is used up to xl (1280px) instead of md (768px) because page links plus contacts
 * do not fit in one row on tablets; on desktop the line under the phone is the
 * "Заказать звонок" trigger instead of the working hours (spec §4.4 wants the button in the
 * header, and a third button does not fit the row at 1280px; the hours stay in the burger
 * panel and on the Contacts page).
 *
 * The bottom divider is hidden while the page is at the very top and appears once it is
 * scrolled, so the header blends into the first screen.
 *
 * Client component because of the burger state, scroll state and active-link highlighting.
 */
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ICON_STROKE } from "@/components/ui/Icon";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { cn } from "@/lib/cn";

import { CallbackButton } from "./CallbackButton";
import { telegramHref, telHref } from "@/lib/contact-links";
import type { SiteSettings } from "@/lib/content/types";
import { isActiveRoute, routes } from "@/lib/routes";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const closeMenu = () => setMenuOpen(false);

  // Close the panel with Escape — expected keyboard behavior for disclosure menus.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  // Show the divider once the page leaves the top. Checked on mount too: a reload or a
  // back navigation can restore a scrolled position without any scroll event.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const navLinks = settings.navigation.map((item) => {
    const isActive = isActiveRoute(item.href, pathname);
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={closeMenu}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "py-3 text-label whitespace-nowrap hover:text-accent-strong xl:py-0 xl:text-nav",
          isActive ? "text-accent-strong" : "text-ink",
        )}
      >
        {item.label}
      </Link>
    );
  });

  const telegramButton = (
    <Button
      href={telegramHref(settings.telegramBot)}
      variant="outline"
      size="sm"
      target="_blank"
      rel="noopener noreferrer"
      icon={<TelegramIcon size={16} />}
    >
      Telegram
    </Button>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-surface transition-colors duration-200",
        isScrolled ? "border-line" : "border-transparent",
      )}
    >
      <Container className="relative flex h-(--header-height) items-center justify-between gap-6">
        <Brand name={settings.companyName} tagline={settings.tagline} logo={settings.logo} />

        {/* Desktop navigation */}
        <nav aria-label="Основное меню" className="hidden gap-6 xl:flex">
          {navLinks}
        </nav>

        {/* Desktop contacts and actions */}
        <div className="hidden items-center gap-3 xl:flex">
          <div className="mr-1 flex flex-col">
            <a
              href={telHref(settings.phoneE164)}
              className="text-label font-semibold whitespace-nowrap text-ink hover:text-accent-strong"
            >
              {settings.phoneDisplay}
            </a>
            <CallbackButton as="text" label={settings.callback.triggerLabel} />
          </div>
          {telegramButton}
          <Button href={routes.order} size="sm">
            Оставить заявку
          </Button>
        </div>

        {/* Mobile: call + burger */}
        <div className="flex items-center gap-1 xl:hidden">
          <a
            href={telHref(settings.phoneE164)}
            aria-label={`Позвонить: ${settings.phoneDisplay}`}
            className="grid size-10 place-items-center rounded-full text-ink"
          >
            <Phone size={20} strokeWidth={ICON_STROKE} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-ink"
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
      </Container>

      {/* Mobile panel: navigation, then contacts and actions */}
      <div
        id={menuId}
        hidden={!isMenuOpen}
        // Own vertical scroll: keep the site-wide smooth scrolling out of it.
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-b border-line bg-surface shadow-pop xl:hidden"
      >
        <Container className="flex flex-col pt-2 pb-6">
          <nav aria-label="Основное меню" className="flex flex-col divide-y divide-line">
            {navLinks}
          </nav>
          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
            <a href={telHref(settings.phoneE164)} className="flex flex-col text-ink">
              <span className="text-title">{settings.phoneDisplay}</span>
              <span className="text-caption text-ink-muted">{settings.workingHours}</span>
            </a>
            <div className="flex flex-wrap gap-3">
              <CallbackButton label={settings.callback.triggerLabel} onOpen={closeMenu} />
              {telegramButton}
              <Button href={routes.order} size="sm" onClick={closeMenu}>
                Оставить заявку
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
