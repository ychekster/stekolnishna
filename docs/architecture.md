# Architecture

Current state: **all mockup pages implemented, frontend only**: homepage, Catalog index, Services, Portfolio + project pages, About, Contacts, order form, legal information, 404; plus the "Заказать звонок" dialog and the cookie banner. Plus catalog category pages, product cards and SEO landing pages (design handoff 2026-11-09). No database or CMS yet — see [decisions/0002-frontend-first.md](decisions/0002-frontend-first.md).

## Overview

```
Browser
  │
  ▼
Next.js 16 app (App Router, React Server Components, Cache Components)
  ├─ src/app/page.tsx ............ homepage: composes sections (server component)
  ├─ src/app/o-kompanii/page.tsx . About page: composes sections
  ├─ src/app/kontakty/page.tsx ... Contacts page: composes sections
  ├─ src/app/uslugi/page.tsx ..... Services page: composes sections
  ├─ src/app/katalog/page.tsx .... Catalog index: sections + client-side filter/search/sort
  ├─ src/app/katalog/[category]/ .. Category page: products+filters | no products | drawing gallery
  │     └─ [product]/ .............. Product card
  ├─ src/app/[landing]/ ........... SEO landing pages at the site root (/steklyannye-dushevye-almaty)
  ├─ src/app/nashi-raboty/ ....... Portfolio (client-side category filter) + [project] pages
  ├─ src/app/zayavka/page.tsx .... Full order form with file upload
  ├─ src/app/pravovaya-informaciya Legal texts (privacy, consent, terms, cookies)
  │     └─ getHomePage() / getAboutPage() / getContactsPage() / getServicesPage() / getCatalogPage() / getCatalogCategories() / getCatalogProducts() / getSiteSettings()  ← src/lib/content (single swap point)
  │            └─ today: src/content/*.ts placeholders
  │            └─ later: Payload CMS (Postgres)
  └─ Forms: short lead form (several pages, own `source`), "Заказать звонок" dialog (root
     layout), full order form (/zayavka)
        └─ Server Actions submitLead / submitCallback / submitOrder (src/lib/leads/actions.ts)
                    honeypot → rate limit → zod validation → saveLead()
                                                              └─ today: server log
                                                              └─ later: Payload "leads" + owner notification
```

Pages are prerendered as static HTML at build time; only the lead form, the burger menu and the carousels hydrate on the client.

## Folder structure

```
src/
  app/
    layout.tsx            Root layout for every page: <html lang="ru">, font, metadata,
                          sticky SiteHeader, <main> container, SiteFooter, FloatingTelegram
    page.tsx              Homepage — only composition of sections, no content
    o-kompanii/page.tsx   About page (/o-kompanii) — breadcrumbs + sections; SEO from content
    kontakty/page.tsx     Contacts page (/kontakty) — breadcrumbs + sections; SEO from content
    uslugi/page.tsx       Services page (/uslugi) — breadcrumbs + sections; SEO from content
    katalog/page.tsx      Catalog index (/katalog) — breadcrumbs + sections; SEO from content
    katalog/[category]/   Category page, three states chosen from data; [product]/page.tsx product card
    [landing]/page.tsx    SEO landing (static routes win over this root segment); FAQPage JSON-LD
    nashi-raboty/         Portfolio (/nashi-raboty) and [project]/page.tsx (generateStaticParams)
    zayavka/page.tsx      Full order form (/zayavka), target of the header CTA
    pravovaya-informaciya/ Legal page; routes.privacyPolicy / cookiePolicy are its anchors
    not-found.tsx         404 from the mockup ("Страница разбилась")
    globals.css           Design tokens (@theme) + base styles
  components/
    ui/                   Generic building blocks from the design system
      Button, IconButton, Icon, Container, Section, SectionHeading,
      MediaFrame (image or placeholder), AccentBadge, Brand, TextField, Carousel,
      Stat (big number + caption), PhotoTile (photo + pill caption), Breadcrumbs,
      MapEmbed (map embed or placeholder; size set by the caller),
      TelegramIcon (brand glyph; also behind the `telegram` icon key),
      BoxedField (boxed input/select/textarea for light forms), ConsentCheckbox, Honeypot,
      FilterChip, BackLink
    layout/               SiteHeader (sticky, burger below xl), SiteFooter, FloatingTelegram,
                          CallbackDialogProvider+CallbackForm+CallbackButton (native <dialog>,
                          opened via context from anywhere), CookieBanner
    sections/             Sections reused on several pages
      LeadFormSection+LeadForm (dark lead-form block, copy and `source` via props)
    home/                 Homepage sections and their cards
      HeroSection, AboutSection, ServicesSection+ServiceCard,
      CatalogSection+CatalogCard, AdvantagesSection+AdvantageItem,
      ProjectsSection, ProcessSection+ProcessStep,
      TestimonialsSection+TestimonialCard, ContactsSection+ContactItem
    about/                About page sections (spec §3.5)
      AboutHero, ProductionSection+CapabilityCard, EquipmentSection+EquipmentItem,
      OwnProductionSection+BenefitItem, GeographySection+CoverageMap,
      DeliverySection+TermsCard
    contacts/             Contacts page sections (spec §3.6)
      ContactsHero, ContactCards+ContactCard, LocationSection (map + directions panel),
      ScheduleSection, RequisitesSection
    catalog/              Catalog sections (spec §3.2)
      CatalogHero, CategoryStrip, FeaturedPromoCard, PhotoOrderPromoCard,
      CatalogBrowser (client: toolbar state, curated sections ↔ flat results), CatalogToolbar,
      ProductSection+ProductGrid+ProductCard (reused by future category pages),
      MoreCategoriesSection+CategoryTile
    category/             CategoryHero, InfoChips, CategoryBrowser (client)+TagFilters+FilterSheet+SectionsNav,
      ServiceCategoryHero, ScopeSection (category without products)
    drawings/             DrawingsHero, DrawingsBrowser+DrawingSetGallery+DrawingLightbox (client),
      DrawingsUrlBrowser (set in ?nabor= via History API, inside Suspense), NoMatchCard
    product/              ProductGallery (client), ProductSummary, ProductDetails
    landing/              LandingHero, OfferGrid, LandingAdvantages, FaqSection
    portfolio/            PortfolioHero, FeaturedProject+FeaturedList, ProjectsBrowser (client)+ProjectCard,
      PortfolioTestimonial, ProjectShelf (a few projects, used on landings and categories)
    project/              ProjectHero, ProjectGallery, ProjectDetails+ProjectListCard, ProjectPager
    order/                OrderFormCard (remount holder)+OrderForm+FileDrop (client), OrderAside
    legal/                LegalNav (sticky TOC), LegalSection
    services/             Services page sections (spec §3.3)
      ServicesHero (H1 + anchor chips), ServiceList+ServiceCard, PhotoOrderSection+PhotoOrderStep,
      PriceListSection
  content/                TEMPORARY placeholder data (removed when CMS arrives)
    site-settings.ts (incl. callback dialog + cookie banner copy), home.ts, about.ts,
    contacts.ts, services.ts, catalog.ts, portfolio.ts (page copy + projects), order.ts,
    legal.ts, not-found.ts,
    catalog-items.ts (categories + products imported from the customer's catalog export)
  lib/                    Pure logic, no JSX. Unit tests next to the code (*.test.ts)
    content/              Content types + getters (the only content entry point)
    leads/                Forms: schemas (short, callback, order), uploads.ts (file rules +
                          signature sniffing), rate limit, repository, server actions
    portfolio/            projects.ts: category filter, counts, previous/next project
    home/                 featured.ts: homepage category cards and project tiles from slugs
    catalog/              + filterByTags/countTags/sortProducts (category page), offers.ts (landing
                          offer cards from catalog/services), drawings.ts (sample numbers)
    seo/json-ld.ts        Schema.org FAQPage + safe serialization
    format/plural.ts      Russian plural forms ("6 товаров")
    cookie-consent.ts     cookie banner choice (cookie `cookie-consent` = all | necessary)
    catalog/              filter.ts: filter by tag, search (case/ё-insensitive), sort by price
    format/               price.ts (₸ labels, [draft] amounts), phone.ts (KZ normalization)
    routes.ts             All internal URLs (sitemap slugs) + active-link matching
    contact-links.ts      tel: / t.me (Telegram bot, deep links) / mailto: / 2GIS + Yandex route links
    cn.ts                 className joiner
public/images/            Static images (hero photo; catalog/<slug>/ = catalog photos)
docs/design/              Design handoff: HANDOFF.md, tokens.json, screenshots, reference.html
scripts/find-placeholders.mjs  `npm run placeholders`: [bracket] placeholders and missing photos left in src/content
```

### Conventions

- **Server components by default.** `"use client"` only where there is state or browser APIs: `SiteHeader`, `Carousel`, `LeadForm`.
- **Sections receive their slice of content as props** (`<HeroSection hero={home.hero} />`), so each is independent and reorderable — matching the future CMS "blocks".
- **Where components live:** used by one page → `components/<page>/`; a whole section used by several pages → `components/sections/`; a small generic building block → `components/ui/`. When a page component becomes shared, move it (as done with `Stat`, `PhotoTile`, `LeadFormSection`).
- **Inner pages** start with `Breadcrumbs`, then an H1 block. Per-page `<title>`/description come from the page content (`seo` field) via `generateMetadata`, so they become editable in the CMS.
- **Internal links only via `routes`** (`src/lib/routes.ts`), never string literals. Navigation points to the sitemap pages (Каталог, Услуги, Наши работы, О компании, Контакты); until a page exists its link renders `not-found.tsx`. "Оставить заявку" everywhere → `routes.leadForm` (`/#form`).
- **Scrolling**: native browser scrolling. Inertial smooth scrolling (Lenis) was removed on the user's decision (2026-11-09), don't re-add it. Only same-page anchor jumps glide (CSS `scroll-behavior: smooth`, off with `prefers-reduced-motion`) and land below the header via `scroll-padding-top`.
- **Header divider** is transparent at the very top of the page and appears once the page is scrolled (`SiteHeader` scroll state).
- **Divided lists**: the `dividers-between` utility (globals.css) draws lines only between items, also in multi-column grids. Items themselves have no borders.
- **Telegram icon**: `TelegramIcon` (Font Awesome Free brand glyph, CC BY 4.0), not Lucide's generic "send" arrow.
- **Copy style**: no em dashes and no middle-dot separators in site texts (user's decision); en dashes only in ranges.
- **Sticky header height** is the CSS variable `--header-height` (64px, 76px from xl) in `globals.css`; it also drives `scroll-padding-top`, so anchor jumps land below the header.
- **Icons are keys** (`IconName` in content), mapped to Lucide in `components/ui/Icon.tsx`, so editors pick icons by name.
- **One fact, one place**: a page that shows another record's data stores a reference, not a copy (homepage category cards and project tiles, landing offers, the catalog promo price, company stats in site settings). Mapping to Payload: [data-model.md](data-model.md).
- **Logo**: `Brand` shows `SiteSettings.logo` when set, the text logo otherwise. Link previews use `SiteSettings.ogImage` with `SITE_URL` as the base.
- **Images**: `MediaFrame` renders `next/image` when an image exists and the turquoise placeholder pattern otherwise. Every image has alt text.

## Design system

Tokens are transcribed from `docs/design/tokens.json` (theme "Стекло") into `src/app/globals.css`:

| Group   | Utilities                                                                                                                                                                                                  | Notes                                                  |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Colors  | `bg-surface`, `bg-surface-alt`, `bg-surface-inverse`, `text-ink`, `text-ink-muted`, `text-accent-strong`, `bg-accent`, `border-line`…                                                                      | Default Tailwind palette disabled                      |
| Type    | `text-display`, `text-display-sm`, `text-h1`, `text-h2`, `text-form-title`, `text-stat(-sm)`, `text-title`, `text-lead`, `text-intro`, `text-body`, `text-label`, `text-nav`, `text-caption`, `text-small` | Each token sets size, line height, tracking and weight |
| Radii   | `rounded-sm` 8 · `rounded-md` 12 · `rounded-lg` 20 · `rounded-full`                                                                                                                                        |                                                        |
| Spacing | Tailwind default 4px step (`p-6` = 24px)                                                                                                                                                                   | Matches the design scale                               |
| Layout  | `max-w-content` (1200px), breakpoint `md` = 768px                                                                                                                                                          | Mobile-first: base classes = phone                     |
| Shadow  | `shadow-pop`                                                                                                                                                                                               | Only pop-ups (mobile menu, map label, floating button) |

Deviations from the mockup, intentional:

- **Consent checkbox** in the lead form (mockup had only text) — required by KZ personal data law / spec §9.
- **Telegram instead of WhatsApp** everywhere (header, floating button, contacts) — customer decision, [decisions/0003](decisions/0003-telegram-instead-of-whatsapp-no-calculator.md).
- **Floating Telegram button** — not in the mockup, required by spec §4.3 (originally WhatsApp).
- **Contacts page** (mockup "Контакты — десктоп", desktop only): mobile layout ours (the "Как добраться" panel moves under the map). WhatsApp card → Telegram bot. The mockup's full order form with file upload and the callback mini-form are replaced by the shared short lead form (backlog: only if the customer asks). Route buttons search the address in 2GIS / Yandex Maps (`mapRouteHrefs`, `[placeholder]` parts dropped), so they work before exact map links exist.
- **Catalog index** (mockup "Каталог — десктоп", desktop only): mobile layout ours (category strip and filter chips scroll sideways, products in 2 columns). The **calculator promo card is replaced** by "Пришлите фото или чертёж" → Telegram bot (`catalog_photo`), and the **"Рассчитать" button on product cards is dropped** (ADR 0003). WhatsApp icon button → Telegram with the product slug as deep-link parameter (spec §3.2). Filters, search and sort work in the browser: untouched toolbar shows the curated sections; any filter shows one flat result list across the catalog. Mockup's "Все 14" counts replaced by "Весь раздел" (counts were invented). Products and prices are the customer's real catalog (imported 2026-11-09); the category strip shares one desktop row among however many sections exist (14 today). Product and category links point to planned pages (`routes.product`, `routes.catalogCategory`).
- **Services page** (mockup "Услуги — десктоп", desktop only): mobile layout ours (anchor chips scroll sideways in one row). The mockup's **price calculator is dropped** (ADR 0003). "Заказ по фото": files go to the Telegram bot (deep link `services_photo`), since the short lead form has no upload. "Заказать" on a card goes to this page's own form (`routes.pageLeadForm`). Services are anchors on one page (`/uslugi#rezka`); the slugs are ready for separate `/uslugi/[service]` pages later. All facts and prices in `[brackets]`.
- **Category, product and SEO landing pages** (design handoff 2026-11-09, desktop + mobile): header kept as ours (handoff shows "Написать в Telegram" + hours). Footer rebuilt to the handoff (4 columns, "Популярные услуги"), without its unconfirmed "Доставка по всему Казахстану". Category cards show "Подробнее" + filter tags; the catalog index keeps "Заказать". The H1 second half is the section `tagline` (imported lead times today). Landing offer cards resolve from the catalog/services, so prices cannot diverge. Mobile filters: bottom sheet (native dialog). Drawing samples: "Выбрать этот рисунок" in the lightbox writes the sample number into the form.
- **Portfolio and project pages** (mockups "Наши работы", "Проект — страница кейса", desktop only): mobile layout ours (chips scroll sideways, 1 column of cards, mosaic in 2 columns). All projects, numbers and the quote are the designer's draft in `[brackets]`; photos are placeholders. "Хочу так же" goes to the page's own lead form. Photo-count pills show only when photos exist.
- **Order page** (mockup "Оформление заявки"): WhatsApp card → Telegram (`order` deep link); calculator link and lead number dropped; product types = catalog sections + "Другое"; the header's "Оставить заявку" leads here (was `/#form`).
- **"Заказать звонок" dialog** (mockup "Заказать звонок — окно"): required consent checkbox added. On desktop the trigger replaces the working-hours line under the header phone (no room for a third button at 1280px).
- **Legal page** (mockup "Правовая информация + cookie"): one page with anchors instead of four URLs; calculator paragraph dropped. The cookie banner leaves room for the floating Telegram button on phones.
- **About page** (mockup "О компании — десктоп", desktop only): the mobile layout is ours, following the homepage patterns. Facts from the mockup are a designer's draft — shown in `[brackets]` until the customer confirms them. The mockup's history and team sections are dropped (the company is new, customer decision 2026-11-09). The mockup's own header/footer are not used (root layout). Added token `text-intro` (17/26, intro next to the H1).

## Lead form flow

0. Three forms share fields (`nameField`, `phoneField`, `consentField` in schema.ts), the honeypot, the rate-limit bucket and `saveLead(LeadInput)` (kinds `request` / `callback` / `order`). The order form sends files from React state by hand (no form reset, files can be added in several goes); without JS the browser posts them. The server checks count, extension, size and the real file signature (uploads.ts); the Server Action body limit is 52 MB (next.config.ts).
1. `LeadForm` (client) submits via `useActionState(submitLead)` — works without JS too. The same form is placed on several pages: each placement passes its copy (`LeadFormContent`, incl. the label of the free-text `details` field) and a `source` (`homepage`, `about-visit`, `contacts`, `services`, `catalog`), sent as a hidden field.
2. `submitLead` (server):
   - honeypot field `website` filled → fake success (bots get no signal);
   - `consumeRateLimit` — 5 submissions / 10 min per IP (in-memory, single server);
   - `leadFormSchema` (zod) — phone required and normalized to `+7XXXXXXXXXX`, consent required; an unknown `source` is dropped (stored as "not reported") instead of rejecting a real lead;
   - `saveLead` — **currently only logs**; to be replaced by Payload.
3. Errors return per-field messages + entered values (form isn't wiped).

## Configuration

| Env var           | Purpose                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`        | Public address (`https://…`), base for absolute URLs in link previews. Empty until the domain is known.                                  |
| `ALLOWED_ORIGINS` | Extra hosts for dev assets and Server Actions (tunnels/proxies), comma-separated. `*.trycloudflare.com` for the Cloudflare quick tunnel. |

## Testing

- `npm test` — Vitest unit tests for `src/lib` (price formatting, phone normalization, contact links, lead validation, rate limiter).
- `npm run placeholders` — what content is still missing (must be empty or agreed before launch).
- Visual check — Playwright (Edge) screenshots at 1440px and 390px compared to `docs/design/screenshot-*.png`.
- Pre-commit — lint-staged (ESLint + Prettier) and typecheck.

## Next steps

1. Install PostgreSQL (or Docker) → add Payload CMS; move `src/content/*` into CMS globals/collections; implement `getHomePage()`/`getSiteSettings()` via Payload; `saveLead()` → `leads` collection + notification.
2. Remaining pages from [sitemap.md](sitemap.md): catalog category page, product card, SEO landing pages (design requested 2026-11-09). No news/articles (user's decision).
3. Telegram bot — separate project; the site only links to it.
