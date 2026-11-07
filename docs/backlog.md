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
- [ ] Cookie consent banner — together with analytics.
- [ ] Privacy policy page `/politika-konfidencialnosti` (+ consent page). Text to be agreed with
      the customer. Links already point there (`routes.privacyPolicy`).

### Content swap

- [ ] Replace every placeholder with real data in one pass: contacts and Telegram bot
      (`src/content/site-settings.ts`), homepage numbers, prices, photos, reviews
      (`src/content/home.ts`), About page facts, team and workshop photos, service-area map
      (`src/content/about.ts`), map embed. List of what to request: open-questions.md.

### Infrastructure (spec §7, §11)

- [ ] Domain, hosting, HTTPS, database backups, handover docs and accesses.

## Only if the customer asks (decided: not doing now)

- [ ] **"Заказать звонок" button + callback form** (spec §4.4). Decision 2026-11-07: the lead
      form already is a callback request. Build only if the customer insists.
- [ ] **Full order form** — product type, size, quantity, file upload JPG/PNG/PDF (spec §4.2,
      §4.5). Decision 2026-11-07: short form converts better; extend only if asked.
- [ ] **Hero headline from the spec** ("Изготовление изделий из стекла и зеркал по
      индивидуальным размерам…"). Decision: keep "Стеклянные конструкции под ключ" (shorter,
      clearer); the customer saw it and had no objection.

## Done

- Homepage — commits `dc4e780`, `a51636a`.
- About page `/o-kompanii` (2026-11-07). Lead form made reusable (copy + `source` per page).
