/**
 * PLACEHOLDER site settings, taken from the design handoff (docs/design/HANDOFF.md).
 *
 * Values in [square brackets] are intentionally visible placeholders — the customer
 * provides real data (see docs/open-questions.md). Do not invent data here.
 * This file disappears once Payload CMS serves these settings; read it only through
 * src/lib/content.
 */
import type { SiteSettings } from "@/lib/content/types";

export const siteSettingsContent: SiteSettings = {
  companyName: "[Название]",
  tagline: "стекольная мастерская",
  phoneDisplay: "+7 [___] ___-__-__",
  phoneE164: "+70000000000",
  whatsappNumber: "70000000000",
  email: "[info@домен.kz]",
  address: "г. Алматы, [улица, дом]",
  workingHours: "Пн–Сб, 9:00–19:00",
  navigation: [
    { label: "О компании", href: "#about" },
    { label: "Продукция", href: "#catalog" },
    { label: "Проекты", href: "#projects" },
    { label: "Этапы", href: "#steps" },
    { label: "Контакты", href: "#contacts" },
  ],
  privacyPolicyHref: "#",
  copyright: "© 2026 [Название]. Все права защищены",
  map: {
    embedUrl: null,
    label: "[Название] · г. Алматы",
  },
};
