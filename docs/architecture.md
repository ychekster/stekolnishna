# Architecture

Current state: **every page of the sitemap is built, frontend only.** Homepage, catalog index,
category pages, product cards, SEO landings, Services, Portfolio and project pages, About,
Contacts, the order form, legal information and the 404 page; plus the "Заказать звонок" dialog
and the cookie banner. No database or CMS yet: content comes from local files behind a content
layer ([decisions/0002](decisions/0002-frontend-first.md)). Next stage: the admin panel
(Payload CMS + PostgreSQL), see [Next stage](#next-stage-admin-panel-and-database).

## Overview

```
Browser
  │
  ▼
Next.js 16 app (App Router, React Server Components, Cache Components)
  ├─ src/app/**/page.tsx ......... pages: fetch content, compose sections (server components)
  │     └─ getHomePage(), getCatalogProducts(), getSiteSettings() …  ← src/lib/content
  │            ├─ today: src/content/*.ts (local files)                 (the single swap point)
  │            └─ later: Payload CMS (PostgreSQL)
  └─ Forms: short lead form (several pages, own `source`), "Заказать звонок" dialog (root
     layout), full order form with files (/zayavka)
        └─ Server Actions submitLead / submitCallback / submitOrder (src/lib/leads/actions.ts)
              honeypot → rate limit → zod validation → saveLead()
                                                         ├─ today: server log
                                                         └─ later: Payload "leads" + email to the owner
```

Pages are prerendered as static HTML at build time. Only interactive parts hydrate on the
client: header menu, carousels, filters and galleries, forms, dialogs, cookie banner.

## Folder structure

```
src/
  app/                    Routes. A page fetches its content and composes sections, nothing else
    layout.tsx            Root layout: <html lang="ru">, font, default metadata, header, <main>,
                          footer, floating Telegram button, callback dialog, cookie banner
    page.tsx              Homepage
    katalog/              Catalog index; [category]/ (3 states picked from data: products with
                          filters | no products | drawing gallery); [category]/[product]/
    [landing]/            SEO landings at the site root (/steklyannye-dushevye-almaty). Static
                          routes win over this segment
    uslugi/ nashi-raboty/ (+ [project]/) o-kompanii/ kontakty/ zayavka/ pravovaya-informaciya/
    not-found.tsx         404 ("Страница разбилась")
    globals.css           Design tokens (@theme) and base styles
    icon.svg, apple-icon.png, favicon.ico   Site icon (from docs/brand/)
  components/
    ui/                   Generic building blocks: Button, IconButton, Icon (key → Lucide),
                          TelegramIcon, Container, Section, SectionHeading, MediaFrame,
                          Breadcrumbs, BackLink, Carousel, FilterChip, Stat, PhotoTile,
                          AccentBadge, Brand, MapEmbed, RichText, ReviewMeta and form parts
                          (TextField, BoxedField, ConsentCheckbox, Honeypot)
    layout/               Root-layout parts: SiteHeader, SiteFooter+FooterColumn,
                          FloatingTelegram, CookieBanner, callback dialog
                          (CallbackDialogProvider+CallbackForm+CallbackButton)
    sections/             Whole sections used on several pages: LeadFormSection+LeadForm,
                          ProcessSection+ProcessStep, ContactsSection+ContactItem, SeoText
    home/ about/ contacts/ services/ catalog/ category/ drawings/ product/ landing/
    portfolio/ project/ order/ legal/
                          Sections of one page (or one page family). catalog/ also holds the
                          product cards and shelves reused by category and product pages;
                          portfolio/ProjectShelf is reused by landings and category pages
  content/                TEMPORARY local content, deleted when Payload arrives. Read only
                          through src/lib/content. One file per page or collection;
                          catalog-items.ts and drawings.ts are generated from the customer's
                          catalog export; demo-portfolio.ts is demo content (replace before launch)
  lib/                    Pure logic, no JSX. Unit tests next to the code (*.test.ts)
    content/              types.ts (the data model) + index.ts (getters, the only entry point)
    leads/                Forms: zod schemas (short, callback, order), uploads.ts (file rules +
                          signature sniffing), rate limit, repository (saveLead), Server Actions
    catalog/              filter.ts (tags, search, sort), offers.ts (landing offer cards from
                          catalog/services), drawings.ts (sample numbers)
    portfolio/            projects.ts: category filter, counts, previous/next project
    home/                 featured.ts: homepage category cards and project tiles from slugs
    seo/                  json-ld.ts (FAQPage), metadata.ts (record titles from templates)
    format/               price (₸), phone (KZ normalisation), plural (Russian forms),
                          template ("{count} фото"), typography (non-breaking spaces)
    routes.ts             All internal URLs + active-link matching
    contact-links.ts      tel: / Telegram bot deep links / mailto: / 2GIS + Yandex route links
    cookie-consent.ts     Cookie banner choice (cookie `cookie-consent` = all | necessary)
    cn.ts                 className joiner
public/images/            Site photos, WebP (see Images). catalog/<slug>/ = catalog photos,
                          catalog/risunki/<set>/NN.webp = glass-drawing samples
scripts/                  find-placeholders.mjs (`npm run placeholders`), optimize-images.mjs
                          (`npm run images`), cf-deploy.mjs (`npm run cf:deploy`)
docs/                     Project docs (index in README.md); docs/design/ = design handoff,
                          docs/brand/ = logo sources
```

## Conventions

- **Server components by default.** `"use client"` only where there is state or a browser API
  (forms, dialogs, filters, galleries, carousel, header menu).
- **Sections receive their slice of content as props** (`<HeroSection hero={home.hero} />`), so
  each is independent and reorderable, matching the future CMS "blocks".
- **Where components live:** used by one page → `components/<page>/`; a whole section used by
  several pages → `components/sections/`; a small generic building block → `components/ui/`.
  When a page component becomes shared, move it.
- **Inner pages** start with `Breadcrumbs` (pages pass the trail after "Главная"), then an H1
  block. Per-page `<title>`/description come from the page content (`seo` field) via
  `generateMetadata`. Records (categories, products, projects) without their own `seo` get a
  title from a template in the page copy (`seoFallback`, filled by `recordSeo`).
- **Copy with numbers is a template** with `{slots}` (`"Показано {shown} из {total}"`), filled
  by `fillTemplate`. Never glue phrases from pieces in code: editors must be able to reword them.
- **Internal links only via `routes`** (`src/lib/routes.ts`), never string literals.
  "Оставить заявку" in the header → `/zayavka`; section buttons → the page's own lead form.
- **One fact, one place**: a page that shows another record's data stores a reference, not a
  copy (homepage category cards and project tiles, landing offers, the catalog promo price,
  company stats in site settings). Mapping to Payload: [data-model.md](data-model.md).
- **Icons are keys** (`IconName` in content), mapped to Lucide in `components/ui/Icon.tsx`, so
  editors pick icons by name. The Telegram glyph is `TelegramIcon` (Font Awesome Free brand
  glyph, CC BY 4.0), not Lucide's generic "send" arrow.
- **Typography**: every content getter passes its data through `typographDeep` (prepositions
  and conjunctions glued to the next word, short last word glued to the previous one, `что‑то`
  with a non-breaking hyphen); `globals.css` adds `text-wrap: balance` to headings and
  `pretty` to running text. CMS copy gets it automatically as long as the getters keep it.
- **Copy style**: no em dashes and no middle-dot separators in site texts (user's decision);
  en dashes only in ranges.
- **Divided lists**: the `dividers-between` utility (globals.css) draws lines only between
  items, also in multi-column grids. Items themselves have no borders.
- **Layout widths**: the header row uses `Container wide` (`max-w-wide`, 1440px); everything
  else stays at `max-w-content` (1200px).
- **Sticky header height** is the CSS variable `--header-height` (64px, 76px from xl); it also
  drives `scroll-padding-top`, so anchor jumps land below the header. The header divider is
  transparent at the top of the page and appears once the page is scrolled.
- **Scrolling**: native browser scrolling. Inertial smooth scrolling (Lenis) was removed on the
  user's decision (2026-11-09), don't re-add it. Only same-page anchor jumps glide (CSS
  `scroll-behavior: smooth`, off with `prefers-reduced-motion`). `<html
data-scroll-behavior="smooth">` makes Next.js switch smoothing off while it resets the scroll
  on a page change, so a new page always opens at the top instantly.
- **Logo**: `Brand` shows `SiteSettings.logo` when set, the text logo otherwise (today: text,
  user's decision). Link previews use `SiteSettings.ogImage` with `SITE_URL` as the base.

## Images

- Every image is an `ImageAsset` (`src` + required `alt`) rendered by `MediaFrame`:
  `next/image` when the image exists, the turquoise placeholder pattern when it is `null`.
  `next/image` serves AVIF/WebP at the rendered size, so `sizes` must match the layout.
- **Source files are WebP**, at most 2000px on the long side. New photos (JPG/PNG): put them in
  `public/images/…`, run `npm run images` (converts and deletes the originals), then point
  `src/content` at the `.webp` paths. `npm test` fails if content references a missing file.
- Exception: `public/images/og.jpg` stays JPG (link previews in some messengers ignore WebP).
- Folder per owner: `about/`, `home/`, `services/`, `portfolio/<project>/NN.webp`,
  `catalog/<category or product>/cover.webp | gallery-NN.webp`. Photo sources and licences:
  [photo-sources.md](photo-sources.md); prompts for generated photos: [photo-prompts.md](photo-prompts.md).
- With Payload these files move into the `media` collection; until then they are part of the
  repository.

## Design system

Tokens are transcribed from `docs/design/tokens.json` (theme "Стекло") into `src/app/globals.css`:

| Group   | Utilities                                                                                                                                                                                                  | Notes                                                  |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Colors  | `bg-surface`, `bg-surface-alt`, `bg-surface-inverse`, `text-ink`, `text-ink-muted`, `text-accent-strong`, `bg-accent`, `border-line`…                                                                      | Default Tailwind palette disabled                      |
| Type    | `text-display`, `text-display-sm`, `text-h1`, `text-h2`, `text-form-title`, `text-stat(-sm)`, `text-title`, `text-lead`, `text-intro`, `text-body`, `text-label`, `text-nav`, `text-caption`, `text-small` | Each token sets size, line height, tracking and weight |
| Radii   | `rounded-sm` 8 · `rounded-md` 12 · `rounded-lg` 20 · `rounded-full`                                                                                                                                        |                                                        |
| Spacing | Tailwind default 4px step (`p-6` = 24px)                                                                                                                                                                   | Matches the design scale                               |
| Layout  | `max-w-content` (1200px), `max-w-wide` (1440px), breakpoint `md` = 768px                                                                                                                                   | Mobile-first: base classes = phone                     |
| Shadow  | `shadow-pop`                                                                                                                                                                                               | Only pop-ups (mobile menu, map label, floating button) |

### Deviations from the mockups, intentional

- **Everywhere:** consent checkbox on every form (KZ personal data law, spec §9); Telegram
  instead of WhatsApp and no price calculator ([decisions/0003](decisions/0003-telegram-instead-of-whatsapp-no-calculator.md));
  floating Telegram button (spec §4.3, not in the mockup). Mockups that came desktop-only got a
  mobile layout built from the homepage patterns (chips and strips scroll sideways, grids
  collapse to 1–2 columns).
- **Contacts:** the "Как добраться" panel moves under the map on phones. The mockup's full
  order form and callback mini-form are replaced by the shared short lead form. Route buttons
  search the address in 2GIS / Yandex Maps (`mapRouteHrefs`, `[placeholder]` parts dropped), so
  they work before exact map links exist.
- **Catalog index:** the calculator promo card is replaced by "Пришлите фото или чертёж" →
  Telegram bot (`catalog_photo`); the "Рассчитать" button on product cards is dropped; the
  WhatsApp button → Telegram with the product slug as deep-link parameter (spec §3.2). The
  toolbar is pinned under the header (`--catalog-toolbar-height` offsets category anchors).
  Untouched toolbar shows the curated sections; any filter shows one flat result list. The
  mockup's invented "Все 14" counts → "Весь раздел". The category strip shares one desktop row
  among however many sections exist.
- **Services:** chips filter the cards instead of being anchors (user's request 2026-11-10,
  state in the URL hash, `/uslugi#rezka`); the slugs are ready for separate `/uslugi/[service]`
  pages. "Заказ по фото" sends files to the Telegram bot (`services_photo`), since the short
  lead form has no upload. "Заказать" on a card goes to this page's own form (`routes.pageLeadForm`).
- **Category, product and landing pages** (handoff 2026-11-09): the header is ours (the handoff
  shows "Написать в Telegram" + hours). Footer rebuilt to the handoff (4 columns, "Популярные
  услуги"), without its unconfirmed "Доставка по всему Казахстану". Category cards show
  "Подробнее" + filter tags; the catalog index keeps "Заказать". The H1 second half is the
  section `tagline`. Landing offer cards resolve from the catalog/services, so prices cannot
  diverge. Mobile filters: bottom sheet (native dialog). Drawing samples: "Выбрать этот
  рисунок" in the lightbox writes the sample number into the form.
- **Portfolio and project pages:** "Хочу так же" goes to the page's own lead form. Photo-count
  pills show only when photos exist.
- **Order page:** WhatsApp card → Telegram (`order` deep link); calculator link and lead number
  dropped; product types = catalog sections + "Другое"; the header's "Оставить заявку" leads here.
- **"Заказать звонок" dialog:** on desktop the trigger replaces the working-hours line under the
  header phone (no room for a third button at 1280px).
- **Legal page:** one page with anchors instead of four URLs; calculator paragraph dropped. The
  cookie banner leaves room for the floating Telegram button on phones.
- **About page:** the mockup's history and team sections are dropped (the company is new,
  customer decision 2026-11-09). Added token `text-intro` (17/26, intro next to the H1).

## Lead form flow

0. Three forms share fields (`nameField`, `phoneField`, `consentField` in schema.ts), the
   honeypot, the rate-limit bucket and `saveLead(LeadInput)` (kinds `request` / `callback` /
   `order`). The order form sends files from React state by hand (no form reset, files can be
   added in several goes); without JS the browser posts them. The server checks count,
   extension, size and the real file signature (uploads.ts); the Server Action body limit is
   52 MB (next.config.ts).
1. `LeadForm` (client) submits via `useActionState(submitLead)`, works without JS too. Each
   placement passes its copy (`LeadFormContent`) and a `source` (`homepage`, `catalog`,
   `category`, `product`, …), sent as a hidden field.
2. `submitLead` (server):
   - honeypot field `website` filled → fake success (bots get no signal);
   - `consumeRateLimit`: 5 submissions / 10 min per IP (in-memory, single server);
   - zod validation: phone required and normalised to `+7XXXXXXXXXX`, consent required; an
     unknown `source` is dropped (stored as "not reported") instead of rejecting a real lead;
   - `saveLead`: **currently only logs**; to be replaced by Payload.
3. Errors return per-field messages + entered values (the form isn't wiped).

## Configuration

| Env var           | Purpose                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`        | Public address (`https://…`), base for absolute URLs in link previews. Empty until the domain is known.                                  |
| `ALLOWED_ORIGINS` | Extra hosts for dev assets and Server Actions (tunnels/proxies), comma-separated. `*.trycloudflare.com` for the Cloudflare quick tunnel. |

## Deployment

Preview (always-on, for looking at the site): Cloudflare Workers, built by `@opennextjs/cloudflare`
(`open-next.config.ts`, `wrangler.jsonc`) → https://steklo-center.ychekster.workers.dev.
`npm run cf:deploy` builds and deploys (needs `wrangler login` once). The incremental cache is
read from static assets (no R2), fine while nothing revalidates; `next/image` uses the Cloudflare
Images binding. The site stays `noindex` (root layout). Launch hosting is still undecided.

## Testing

- `npm test`: Vitest unit tests for `src/lib` (formatting, validation, uploads, filters, routes,
  SEO helpers) and a content integrity test (every referenced image exists).
- `npm run placeholders`: what content is still missing (must be empty or agreed before launch).
- Visual check: Playwright (Edge) screenshots at 1440px and 390px against the mockups.
- Pre-commit: lint-staged (ESLint + Prettier) and typecheck.

## Next stage: admin panel and database

Agreed order: customer review → **Payload CMS + PostgreSQL + lead email notifications** →
launch checklist ([backlog.md](backlog.md)). What is already in place for it:

- Pages and components get content only through the getters in `src/lib/content/index.ts`;
  their signatures are the contract. Payload replaces the bodies, nothing else changes.
- The data model is frozen and mapped to Payload globals and collections in
  [data-model.md](data-model.md); `types.ts` is the field-level spec.
- Leads go through one function, `saveLead()` (`src/lib/leads/repository.ts`); form validation,
  spam protection and file checks stay as they are.

Plan, in order:

1. **Database and hosting decided** (open-questions.md): Payload needs Node.js + PostgreSQL;
   Cloudflare Workers (the preview) does not fit as is.
2. **Route groups.** Payload's admin brings its own `<html>` layout, so the site moves from
   `src/app/` into `src/app/(site)/` with its own root layout, next to `src/app/(payload)/`.
   With two root layouts, unknown URLs need `app/global-not-found.tsx` (experimental
   `globalNotFound` flag in Next 16): move the 404 page there.
3. **Collections and globals** from data-model.md, `media` with required `alt`. Generated
   Payload types replace or alias `src/lib/content/types.ts`.
4. **Seed**: a one-off script that writes `src/content/*` into Payload (catalog, drawing sets,
   images → `media`), then delete `src/content/`, `content.test.ts` and `find-placeholders.mjs`
   (the admin shows what is empty instead).
5. **Getters → Payload queries** (keep `typographDeep`); `getCatalogProduct(slug)` and friends
   become filtered queries instead of in-memory `find`. Revalidate pages on save
   (`revalidateTag` / `revalidatePath` in Payload hooks).
6. **Leads**: `saveLead()` → `leads` collection + `lead-files` uploads + email to the owner.
   Move the rate limit to the database or the host if the site runs on more than one instance.
7. **Real 404s** for unknown slugs (check slugs in `proxy.ts`, backlog).
