# Architecture

Current state: **homepage implemented, frontend only.** No database or CMS yet — see [decisions/0002-frontend-first.md](decisions/0002-frontend-first.md).

## Overview

```
Browser
  │
  ▼
Next.js 16 app (App Router, React Server Components, Cache Components)
  ├─ src/app/page.tsx ............ composes homepage sections (server component)
  │     └─ getHomePage() / getSiteSettings()   ← src/lib/content  (single swap point)
  │            └─ today: src/content/*.ts placeholders
  │            └─ later: Payload CMS (Postgres)
  └─ Lead form ── Server Action submitLead (src/lib/leads/actions.ts)
                    honeypot → rate limit → zod validation → saveLead()
                                                              └─ today: server log
                                                              └─ later: Payload "leads" + owner notification
```

The homepage is prerendered as static HTML at build time; only the lead form, the burger menu and the carousels hydrate on the client.

## Folder structure

```
src/
  app/
    layout.tsx            Root layout for every page: <html lang="ru">, font, metadata,
                          sticky SiteHeader, <main> container, SiteFooter, FloatingTelegram
    page.tsx              Homepage — only composition of sections, no content
    not-found.tsx         404 — "Раздел скоро появится" while sitemap pages are planned
    globals.css           Design tokens (@theme) + base styles
  components/
    ui/                   Generic building blocks from the design system
      Button, IconButton, Icon, Container, Section, SectionHeading,
      MediaFrame (image or placeholder), AccentBadge, Brand, TextField, Carousel
    layout/               SiteHeader (sticky, burger below xl), SiteFooter, FloatingTelegram
    home/                 Homepage sections and their cards
      HeroSection, AboutSection+Stat, ServicesSection+ServiceCard,
      CatalogSection+CatalogCard, AdvantagesSection+AdvantageItem,
      ProjectsSection+ProjectTile, ProcessSection+ProcessStep,
      TestimonialsSection+TestimonialCard, LeadFormSection+LeadForm,
      ContactsSection+ContactItem+MapEmbed
  content/                TEMPORARY placeholder data (removed when CMS arrives)
    site-settings.ts, home.ts
  lib/                    Pure logic, no JSX. Unit tests next to the code (*.test.ts)
    content/              Content types + getters (the only content entry point)
    leads/                Lead form: schema, rate limit, repository, server action
    format/               price.ts (₸ labels), phone.ts (KZ normalization)
    routes.ts             All internal URLs (sitemap slugs) + active-link matching
    contact-links.ts      tel: / t.me (Telegram bot, deep links) / mailto: builders
    cn.ts                 className joiner
public/images/            Static images (hero photo)
docs/design/              Design handoff: HANDOFF.md, tokens.json, screenshots, reference.html
```

### Conventions

- **Server components by default.** `"use client"` only where there is state or browser APIs: `SiteHeader`, `Carousel`, `LeadForm`.
- **Sections receive their slice of content as props** (`<HeroSection hero={home.hero} />`), so each is independent and reorderable — matching the future CMS "blocks".
- **Internal links only via `routes`** (`src/lib/routes.ts`), never string literals. Navigation points to the sitemap pages (Каталог, Услуги, Наши работы, О компании, Контакты); until a page exists its link renders `not-found.tsx`. "Оставить заявку" everywhere → `routes.leadForm` (`/#form`).
- **Sticky header height** is the CSS variable `--header-height` (64px, 76px from xl) in `globals.css`; it also drives `scroll-padding-top`, so anchor jumps land below the header.
- **Icons are keys** (`IconName` in content), mapped to Lucide in `components/ui/Icon.tsx`, so editors pick icons by name.
- **Images**: `MediaFrame` renders `next/image` when an image exists and the turquoise placeholder pattern otherwise. Every image has alt text.

## Design system

Tokens are transcribed from `docs/design/tokens.json` (theme "Стекло") into `src/app/globals.css`:

| Group   | Utilities                                                                                                                                                                                    | Notes                                                  |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Colors  | `bg-surface`, `bg-surface-alt`, `bg-surface-inverse`, `text-ink`, `text-ink-muted`, `text-accent-strong`, `bg-accent`, `border-line`…                                                        | Default Tailwind palette disabled                      |
| Type    | `text-display`, `text-display-sm`, `text-h1`, `text-h2`, `text-form-title`, `text-stat(-sm)`, `text-title`, `text-lead`, `text-body`, `text-label`, `text-nav`, `text-caption`, `text-small` | Each token sets size, line height, tracking and weight |
| Radii   | `rounded-sm` 8 · `rounded-md` 12 · `rounded-lg` 20 · `rounded-full`                                                                                                                          |                                                        |
| Spacing | Tailwind default 4px step (`p-6` = 24px)                                                                                                                                                     | Matches the design scale                               |
| Layout  | `max-w-content` (1200px), breakpoint `md` = 768px                                                                                                                                            | Mobile-first: base classes = phone                     |
| Shadow  | `shadow-pop`                                                                                                                                                                                 | Only pop-ups (mobile menu, map label, floating button) |

Deviations from the mockup, intentional:

- **Consent checkbox** in the lead form (mockup had only text) — required by KZ personal data law / spec §9.
- **Telegram instead of WhatsApp** everywhere (header, floating button, contacts) — customer decision, [decisions/0003](decisions/0003-telegram-instead-of-whatsapp-no-calculator.md).
- **Floating Telegram button** — not in the mockup, required by spec §4.3 (originally WhatsApp).

## Lead form flow

1. `LeadForm` (client) submits via `useActionState(submitLead)` — works without JS too.
2. `submitLead` (server):
   - honeypot field `website` filled → fake success (bots get no signal);
   - `consumeRateLimit` — 5 submissions / 10 min per IP (in-memory, single server);
   - `leadFormSchema` (zod) — phone required and normalized to `+7XXXXXXXXXX`, consent required;
   - `saveLead` — **currently only logs**; to be replaced by Payload.
3. Errors return per-field messages + entered values (form isn't wiped).

## Configuration

| Env var           | Purpose                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `ALLOWED_ORIGINS` | Extra hosts for dev assets and Server Actions (tunnels/proxies), comma-separated. `*.trycloudflare.com` for the Cloudflare quick tunnel. |

## Testing

- `npm test` — Vitest unit tests for `src/lib` (price formatting, phone normalization, contact links, lead validation, rate limiter).
- Visual check — Playwright (Edge) screenshots at 1440px and 390px compared to `docs/design/screenshot-*.png`.
- Pre-commit — lint-staged (ESLint + Prettier) and typecheck.

## Next steps

1. Install PostgreSQL (or Docker) → add Payload CMS; move `src/content/*` into CMS globals/collections; implement `getHomePage()`/`getSiteSettings()` via Payload; `saveLead()` → `leads` collection + notification.
2. Remaining pages from [sitemap.md](sitemap.md): catalog, product card, services, portfolio, about, contacts, legal.
3. Telegram bot — separate project; the site only links to it.
