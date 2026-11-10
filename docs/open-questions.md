# Open Questions

Things the spec does not answer. Each needs a decision from the customer (or from us, where noted) before the related stage starts. When answered, record the answer here (or in `decisions/`) and remove it from the open list.

## Answered 2026-11-10 (user, on the customer's behalf)

- Facts in the designer's draft are confirmed: tempering is offered **through a partner** (no own
  furnace), facade glazing and triplex are offered, measurement is free in Almaty, About page
  facts (workshop area, sheet size, thicknesses, machines, delivery prices, radius, towns),
  Services prices and specs, landing facts, catalog details (badges, filter tags, featured
  sections, inherited prices, section taglines as lead times). Brackets removed.
- Logo and icon: made by us (docs/brand/), used **only as the site icon**; the header keeps the
  text logo. Brand colours and font: the design handoff tokens.
- Photos: the user generates them from docs/photo-prompts.md.
- Portfolio: **demo** projects (src/content/demo-portfolio.ts) retold from a US company's public
  portfolio for the customer review; real projects are needed before launch.
- Admin users: 1–2 people, no roles. Hosting and domain: later; the admin is built locally first.
- Contacts, legal details (реквизиты), legal texts, response times: at the very end.

## Blocking for design

- [ ] **Photos** — stock photos wired 2026-11-10 (sources and licences: [photo-sources.md](photo-sources.md)).
      Still missing: services «Сверление», «Закалка», portfolio project «Душевая дверь из
      рифлёного стекла», project galleries (one cover each), service-area map. Real photos of
      completed projects before launch.

## Blocking for content

- [ ] Real company data: address, phones, email, working hours, map location.
      Currently **template values** on the site (src/content/site-settings.ts): phone
      `+7 (700) 000-00-00`, Telegram bot `@steklo_center_bot`, email `info@steklo-center.kz`, address "г. Алматы", hours "Пн–Сб, 9:00–19:00".
      Company name "Стекло&Центр" / ТОО «Стекло&Центр» is taken from the project — confirm spelling.
- [x] Real catalog: imported 2026-11-09 from the customer's stekolni-master.kz export (docs/tz-annotated.md §3.2).
- [ ] **Reviews** (2026-11-10): 6 real reviews from the 2GIS and Yandex Maps cards of
      «Стекольный мастер» (stekolni-master.kz, пр. Суюнбая 43/1) are on the site, verbatim, with
      links (`src/content/reviews.ts`). Confirm with the customer: (1) fine to publish them under
      the new brand «Стекло&Центр»; (2) they date back to 2018, while the site says the company
      is new: keep them or drop the old ones; (3) is the second 2GIS card «Стекольный мастер» at
      ул. Е. Брусиловского, 100 (rating 4.9) also theirs (more reviews).
- [ ] **Contacts page facts** (`src/content/contacts.ts`, everything in `[brackets]`): second
      phone (production / pickup) or drop it; Telegram response time; hours per department
      (office/showroom, production/pickup, measurer) and Sunday; is there a showroom; how to
      drive in and park; works with VAT or without.
- [ ] **Response times** promised in the forms: callback "[10 минут]", order "[30 минут]".
- [ ] **Legal details** for the Contacts page and the privacy policy: BIN, bank, IIK, legal
      address (director: Абылгазиев Сакен Берикович, from the spec).

## Telegram bot

- [ ] **Bot username** — the real `@…_bot` (the template `@steklo_center_bot` is a placeholder and may belong to someone else).
- [ ] Bot spec (separate project): what it does on `/start`, how it receives the product from a deep link, how it hands requests to managers.

## Blocking for backend / infrastructure

- [ ] **Stack approval** by the customer (spec §7) — see [decisions/0001-tech-stack.md](decisions/0001-tech-stack.md).
- [ ] **Domain** — exists? Which one?
- [ ] **Hosting** — preference / budget? Must it be in Kazakhstan (personal data localisation)?
- [ ] **New-lead notification address** — channel is email (decided 2026-11-07); which mailbox?
- [ ] Max upload file size for drawings/photos (draft today: 5 files × 10 MB, src/lib/leads/uploads.ts).
- [ ] Email for transactional mail (domain mailbox?).

## Legal

- [ ] Legal entity details for the privacy policy (BIN, legal address).
- [ ] Who writes the privacy policy / consent texts (customer's lawyer or us from a template)?
- [ ] Kazakh-language version required now or later?
