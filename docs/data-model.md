# Data Model

> What the site stores and how it maps to Payload CMS. The exact field shapes are the
> TypeScript types in `src/lib/content/types.ts`; this file says which type becomes which
> Payload global or collection, and how records reference each other.
>
> **Frozen 2026-11-10** before the admin stage: the pages are built and every type below is
> what they render. Changing a shape after this point means changing the Payload schema too,
> so record the reason here.

## Principles

- **One fact, one place.** Where a page shows data that belongs to another record, it stores a
  reference (slug or relation), not a copy: homepage category cards and project tiles
  (`HomeCategoryRef`, `HomeProjectRef` → `src/lib/home/featured.ts`), landing offer cards
  (`OfferRef` → `src/lib/catalog/offers.ts`), the catalog promo card (price from its category),
  company numbers (`SiteSettings.companyStats`, shown on the homepage and the About page).
- **Every image has alt text** (`ImageAsset`). In Payload: one `media` upload collection with a
  required `alt` field; content fields are relations to it.
- **Icons and filters are keys** (`IconName`, `ProductTag`, `ProjectCategory`): select fields in
  the admin, mapped to visuals in code.
- **Every page has `seo`** (`PageSeo`: title + description). Records that may omit it
  (categories, products, projects) fall back to a title built from the name.
- **UI chrome stays in code** (form field labels "Телефон", "Отправляем…", aria labels).
  Everything a manager would want to rephrase is in content.
- **Getters stay the only entry point.** Payload replaces the bodies of the functions in
  `src/lib/content/index.ts`; components and pages do not change.

## Collections (many records, the owner adds and removes)

| Collection     | Type                                        | Key fields and relations                                                                                                                                                                                                                  |
| -------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `media`        | `ImageAsset`                                | upload, `alt` required                                                                                                                                                                                                                    |
| `categories`   | `CatalogCategory`                           | slug, name, description, tagline, cover → media, `price` (from/individual), lead time, intro (rich text), seo, `portfolioCategory` (select), sort order                                                                                   |
| `products`     | `CatalogProduct`                            | slug, category → categories, name, summary, `price`, badge, tags (multi-select), image + gallery → media, lead time, description (rich text), `options` (array of label + values), `specs` (array of label + value), seo, published/draft |
| `drawing-sets` | `DrawingSet`                                | slug, name, images → media (ordered; the sample number is the position)                                                                                                                                                                   |
| `services`     | `ServiceOffer`                              | slug (page anchor, later `/uslugi/[slug]`), title, description, specs (tags), price (text: units differ), image                                                                                                                           |
| `projects`     | `PortfolioProject`                          | slug, category (select), title, place, year, summary, excerpt, cover + gallery → media, description, materials, works, facts (label + value), testimonial, seo, published/draft                                                           |
| `reviews`      | `Testimonial`                               | quote (verbatim), author, subject (optional), avatar → media, rating, date, source (platform + URL), published. Homepage shows the published ones; the portfolio page picks one                                                           |
| `landings`     | `SeoLanding`                                | slug (root URL), navLabel (footer), seo, category → categories, hero, facts, offers (`OfferRef`: category / product / service relation + optional description), FAQ, SEO text (rich text), lead-form copy                                 |
| `leads`        | `LeadInput` (`src/lib/leads/repository.ts`) | kind (request / callback / order), name, phone, source, details, product, sample, size, quantity, preferred time, files → `lead-files`, consent + timestamp, status, manager notes, timestamps                                            |
| `lead-files`   | uploads of `/zayavka`                       | JPG/JPEG/PNG/PDF, size limit from `src/lib/leads/uploads.ts`, admin-only access                                                                                                                                                           |
| `users`        | —                                           | 1–2 people, one admin role, no role split (user's decision 2026-11-10). Client accounts are phase 2: keep the collection extensible                                                                                                       |

**Lead statuses** (spec §5): Новая → В обработке → Ожидает расчёта → Клиенту отправлено
предложение → Заказ оформлен → Заказ завершён / Отказ. Admin needs: list with status filter,
search by name and phone, status change, notes. **On a new lead:** save, then email the owner
(decided 2026-11-07), with the attached files.

## Globals (one record each)

| Global           | Type                                                      | Notes                                                                                                                                                                                                                                  |
| ---------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site-settings`  | `SiteSettings`                                            | company name, tagline, logo, OG image, phone, Telegram bot, email, address, short working-hours line, company stats, navigation, map embed, callback dialog copy, footer, cookie banner. Later: analytics IDs                          |
| `home`           | `HomePage`                                                | seo, hero, about text, directions, category picks (→ categories + optional photo), advantages, project picks (→ projects + optional caption), process steps (also used by category pages and landings), review heading, lead-form copy |
| `about`          | `AboutPage`                                               | seo, hero, workshop photos, capabilities, equipment, own-production benefits, regions + map picture, delivery terms, lead-form copy. No history or team (the company is new, 2026-11-09)                                               |
| `contacts`       | `ContactsPage`                                            | seo, extra phones, Telegram card, directions text, schedule table per department (the one-line summary is `site-settings.workingHours`), requisites, lead-form copy                                                                    |
| `services-page`  | `ServicesPage` minus `offers.items`                       | seo, hero, photo-order steps, price list rows, lead-form copy; the cards come from `services`                                                                                                                                          |
| `catalog-page`   | `CatalogPage`                                             | seo, hero, filter labels, promo cards (featured → category), featured categories (→ categories), products per section, lead-form copy                                                                                                  |
| `portfolio-page` | `PortfolioPage`                                           | seo, hero + stats, featured project (→ projects), filter labels, testimonial (→ reviews), project-page copy                                                                                                                            |
| `catalog-copy`   | `CategoryPageCopy`, `ProductPageCopy`, `DrawingsPageCopy` | shared copy of category, product and drawing pages                                                                                                                                                                                     |
| `order-page`     | `OrderPage`                                               | seo, form labels, success text, Telegram card, next steps                                                                                                                                                                              |
| `legal`          | `LegalPage`                                               | sections with anchors (privacy, consent, terms, cookies), revision date                                                                                                                                                                |
| `not-found`      | `NotFoundPage`                                            | 404 copy and picture                                                                                                                                                                                                                   |

## Values with special meaning

- `Price`: `{ kind: "from", amount, unit }` or `{ kind: "individual" }` ("Цена рассчитывается
  индивидуально", no number shown). `amount: null` = not provided yet; `draft: true` = the
  designer's number, shown in [brackets]. A product without its own price shows its category's
  "from" price (import rule, 2026-11-09).
- `[text in brackets]` anywhere in content = a placeholder waiting for the customer.
  `npm run placeholders` lists them; the count must be zero (or agreed exceptions) before launch.
- `image: null` = no photo yet → the turquoise placeholder pattern.
- `{slot}` inside copy (`"Показано {shown} из {total}"`, `"{name} на заказ в Алматы"`) is filled
  in code by `fillTemplate`; the admin field help should list the slots (they are in the
  comments in `types.ts`).

## Changes after the freeze

- 2026-11-10: `seoFallback` (title + description templates) added to `CategoryPageCopy`,
  `ProductPageCopy` and `PortfolioPage.project`. The fallback titles of record pages were
  hard-coded in the pages; now they are editable copy like everything else.
