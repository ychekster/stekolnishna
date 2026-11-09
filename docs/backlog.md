# Backlog — deferred work

Things we **consciously postponed**. Not bugs, not forgotten — scheduled for later by decision.
When the user asks "what's left on screen X / before launch", answer from this file and from
[tz-annotated.md](tz-annotated.md) — do not re-raise items already decided there.

Add an item whenever a task is deferred; tick it off (and note the commit) when done.
Missing data from the customer lives in [open-questions.md](open-questions.md), not here.

## Before launch (agreed: do at the end, once all pages are built)

### Backend

- [ ] **Leads: save + notify by email** (spec §4.2). Today `saveLead()` in
      `src/lib/leads/repository.ts` only logs. Store leads (Payload `leads` collection) and email
      the owner on each new one. Decided 2026-11-07: notifications go to **email**.
- [ ] **Admin panel** (spec §5) — Payload CMS + PostgreSQL, after the site is built. Move
      `src/content/*` into CMS globals/collections; only `src/lib/content/index.ts` changes.
      Note: hosting must run Node.js + PostgreSQL — pick it before this step.

### SEO (spec §6)

- [ ] **Open the site to search engines.** Currently closed on purpose:
      `robots: { index: false, follow: false }` in `src/app/layout.tsx`. Switch only on the real
      domain. ⚠️ Easy to forget — check this on launch day.
- [ ] `sitemap.xml` and `robots.txt` (site-wide, generated from `src/lib/routes.ts` + CMS pages;
      needs the final domain).
- [ ] Schema.org markup (`LocalBusiness`/`Organization`, products) — needs real company data.
- [ ] Open Graph / social preview image.
- [ ] Per-page titles and descriptions for every page.
- [ ] Connect Google Search Console and Yandex Webmaster.

### Branding

- [ ] Logo in header/footer (`src/components/ui/Brand.tsx` is a text logo now).
- [ ] Favicon / app icons — `src/app/favicon.ico` is still the default Next.js icon.

### Analytics & legal (spec §8, §9)

- [ ] Google Analytics 4 + Yandex Metrica; events: phone clicks, Telegram clicks, lead form
      submits (no calculator, no WhatsApp — ADR 0003).
- [ ] Analytics must respect the cookie banner: load GA4/Metrica only when the
      `cookie-consent` cookie is `all` (src/lib/cookie-consent.ts). Banner itself done 2026-11-09.
- [ ] Legal texts on `/pravovaya-informaciya`: replace the template with the text agreed with
      the customer's lawyer; fill the revision date, confirm the server-location sentence.

### Content swap

- [ ] Replace every placeholder with real data in one pass: contacts and Telegram bot
      (`src/content/site-settings.ts`), homepage numbers, prices, photos, reviews
      (`src/content/home.ts`), About page facts, team and workshop photos, service-area map
      (`src/content/about.ts`), Contacts page facts and legal details (`src/content/contacts.ts`),
      service facts and prices (`src/content/services.ts`), catalog categories, products,
      prices and photos (imported from the customer's catalog 2026-11-09; confirm filter tags and that inherited parent prices are fine), map embed. List of what to request: open-questions.md.

### Infrastructure (spec §7, §11)

- [ ] Domain, hosting, HTTPS, database backups, handover docs and accesses.

- [ ] **Glass-drawing samples** ("Рисунки на стекле", 16 sets, 726 pictures without captions) from
      the catalog export (`Downloads/stekolni-master-catalog/images/<set>/drawings`): import together with
      the category page that shows them. 3 sets stop at exactly 99 pictures, the source site may cut them.
- [ ] **Order attachments are not stored**: `/zayavka` checks files and logs their names; keep
      them in a Payload upload collection and attach them to the lead email.
- [ ] Show the lead number in the order confirmation once leads are stored (mockup "Заявка № …").
- [ ] Project gallery lightbox (open all photos of a project) once real photos exist.
- [ ] Prefill "Вид изделия" on `/zayavka` from the product/category the visitor came from.
- [ ] 3 products have no photo in the source: стеклянные раздвижные двери, маятниковые двери,
      стеклянные павильоны (placeholder shown).

## Only if the customer asks (decided: not doing now)

- [ ] **Catalog filters in the URL** (`/katalog?tag=office&q=…`) so a filtered view can be
      shared and survives "back". Today the toolbar state lives only in the browser tab.
      Do together with server-side filtering once products move to Payload.
- [ ] **Separate service pages** `/uslugi/[service]` (sitemap.md). Decision 2026-11-08: one
      Services page with anchors, as in the mockup; card slugs are ready to become page slugs.
      Build if SEO landing pages per service are wanted.
- [ ] **Hero headline from the spec** ("Изготовление изделий из стекла и зеркал по
      индивидуальным размерам…"). Decision: keep "Стеклянные конструкции под ключ" (shorter,
      clearer); the customer saw it and had no objection.

## Done

- Homepage — commits `dc4e780`, `a51636a`.
- About page `/o-kompanii` (2026-11-07). Lead form made reusable (copy + `source` per page).
- Contacts page `/kontakty` (2026-11-07).
- Services page `/uslugi` (2026-11-08), without the mockup's calculator (ADR 0003).
- Catalog index `/katalog` (2026-11-08): filters, search, sort; calculator promo → Telegram photo order.
- Portfolio `/nashi-raboty` + project pages, order page `/zayavka` with uploads, "Заказать
  звонок" dialog, legal page `/pravovaya-informaciya`, cookie banner, 404 from the mockup
  (2026-11-09).
- Real catalog imported (2026-11-09): 14 sections, 72 products, photos on catalog, homepage and Services.
