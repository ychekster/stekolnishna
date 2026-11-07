# Open Questions

Things the spec does not answer. Each needs a decision from the customer (or from us, where noted) before the related stage starts. When answered, record the answer here (or in `decisions/`) and remove it from the open list.

## Blocking for design

- [ ] **Logo** — exists? Vector file (SVG/AI/PDF)?
- [ ] **Brand colors and fonts** — exist, or do we define them? (Spec only says: light background, black/graphite/glass accents.)
- [ ] **Photos** — real photos of products and completed projects? How many, what quality? Who shoots missing ones?
- [ ] **Reference notes** — what exactly to take from stekolni-master.kz and 2–4 other sites (header, product card, catalog, portfolio). Screenshots → `docs/references/`.

## Blocking for content

- [ ] Real company data: address, phones, email, working hours, map location.
      Currently **template values** on the site (src/content/site-settings.ts): phone
      `+7 (700) 000-00-00`, Telegram bot `@steklo_center_bot`, email `info@steklo-center.kz`, address "г. Алматы", hours "Пн–Сб, 9:00–19:00".
      Company name "Стекло&Центр" / ТОО «Стекло&Центр» is taken from the project — confirm spelling.
- [ ] Texts: company history, equipment, team, delivery and installation terms, service area.
- [ ] 10–20 real products with photos, specs and prices to fill the catalog for design and testing.
- [ ] Real customer reviews (with permission to publish).
- [ ] Is glass **tempering** offered in-house? (Spec §3.3 says "if the service is provided".)
      The About page currently assumes yes (milestone 2018, "Печь закалки", tempering size).
- [ ] **About page facts** (`src/content/about.ts`, everything in `[brackets]`): founding year and
      history milestones; years on market, orders count, workshop area, headcount; sheet size,
      thickness range, tempering size, lead time; machine list and their specs/origin; team —
      names, roles and portraits of 3–4 key people (and consent to publish them), the owner's
      role title; delivery prices (free-delivery threshold, city fee, ₸/km in the region),
      installation radius and towns, warranty period, installers' experience.
- [ ] Photos for the About page: workshop areas (cutting, edge processing, tempering furnace,
      glass storage); optionally a picture of the service-area map.

## Telegram bot

- [ ] **Bot username** — the real `@…_bot` (the template `@steklo_center_bot` is a placeholder and may belong to someone else).
- [ ] Bot spec (separate project): what it does on `/start`, how it receives the product from a deep link, how it hands requests to managers.

## Blocking for backend / infrastructure

- [ ] **Stack approval** by the customer (spec §7) — see [decisions/0001-tech-stack.md](decisions/0001-tech-stack.md).
- [ ] **Domain** — exists? Which one?
- [ ] **Hosting** — preference / budget? Must it be in Kazakhstan (personal data localisation)?
- [ ] **New-lead notification channel** — email or the Telegram bot? To whom?
- [ ] Admin users — how many people, which roles?
- [ ] Max upload file size for drawings/photos.
- [ ] Email for transactional mail (domain mailbox?).

## Legal

- [ ] Legal entity details for the privacy policy (BIN, legal address).
- [ ] Who writes the privacy policy / consent texts (customer's lawyer or us from a template)?
- [ ] Kazakh-language version required now or later?
