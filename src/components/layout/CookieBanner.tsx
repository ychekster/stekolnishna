"use client";

/**
 * Cookie banner (spec §9, mockup "Правовая информация + cookie"): dark card in the bottom
 * left corner until the visitor picks "Принять" or "Только необходимые". The choice lives
 * in a cookie (src/lib/cookie-consent.ts); analytics will read it before loading (backlog).
 *
 * Rendered only in the browser: the server cannot know the choice of a static page's
 * visitor, so the server snapshot is "unknown" and the banner appears after hydration.
 * On phones it leaves room on the right for the floating Telegram button.
 */
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/Button";
import {
  readCookieConsent,
  serializeCookieConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";
import type { SiteSettings } from "@/lib/content/types";

const CHANGE_EVENT = "cookie-consent-change";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

const getSnapshot = () => readCookieConsent(document.cookie) ?? "none";
const getServerSnapshot = () => "unknown" as const;

interface CookieBannerProps {
  content: SiteSettings["cookieBanner"];
  policyHref: string;
}

export function CookieBanner({ content, policyHref }: CookieBannerProps) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (consent !== "none") return null;

  const choose = (choice: CookieConsent) => {
    document.cookie = serializeCookieConsent(choice);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <section
      aria-label="Уведомление о cookie"
      className="fixed right-22 bottom-4 left-4 z-30 rounded-lg bg-surface-inverse p-5 text-ink-inverse shadow-pop md:right-auto md:bottom-6 md:left-6 md:w-105 md:p-6"
    >
      <h2 className="m-0 text-label font-semibold">{content.title}</h2>
      <p className="m-0 mt-1.5 mb-4 text-caption text-ink-inverse-muted">
        {content.text}{" "}
        <Link href={policyHref} className="text-ink-inverse underline underline-offset-2">
          {content.moreLabel}
        </Link>
      </p>
      <div className="flex flex-wrap gap-2">
        <Button variant="light" size="sm" onClick={() => choose("all")}>
          {content.acceptLabel}
        </Button>
        <button
          type="button"
          onClick={() => choose("necessary")}
          className="h-9 cursor-pointer rounded-full border border-ink-inverse-muted bg-transparent px-4 text-nav text-ink-inverse transition-colors duration-150 hover:border-ink-inverse"
        >
          {content.necessaryLabel}
        </button>
      </div>
    </section>
  );
}
