/**
 * PLACEHOLDER site settings.
 *
 * Known from the spec/project: company name (ТОО «Стекло&Центр»), city (Almaty).
 * TEMPLATE values — not real, replace with the customer's data (docs/open-questions.md):
 *   phone +7 (700) 000-00-00, Telegram bot @steklo_center_bot, email, street address,
 *   working hours. The bot itself is a separate project with its own spec.
 * This file disappears once Payload CMS serves these settings; read it only through
 * src/lib/content.
 */
import type { SiteSettings } from "@/lib/content/types";
import { routes } from "@/lib/routes";

export const siteSettingsContent: SiteSettings = {
  companyName: "Стекло&Центр",
  tagline: "стекольная мастерская",
  phoneDisplay: "+7 (700) 000-00-00",
  phoneE164: "+77000000000",
  telegramBot: "steklo_center_bot",
  email: "info@steklo-center.kz",
  address: "г. Алматы",
  workingHours: "Пн–Сб, 9:00–19:00",
  // Main sections from the spec (§3.2–3.6). No calculator — docs/decisions/0003.
  navigation: [
    { label: "Каталог", href: routes.catalog },
    { label: "Услуги", href: routes.services },
    { label: "Наши работы", href: routes.portfolio },
    { label: "О компании", href: routes.about },
    { label: "Контакты", href: routes.contacts },
  ],
  privacyPolicyHref: routes.privacyPolicy,
  copyright: "© 2026 ТОО «Стекло&Центр». Все права защищены",
  map: {
    embedUrl: null,
    label: "Стекло&Центр · г. Алматы",
  },
};
