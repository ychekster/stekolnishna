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
- [x] Real catalog: imported 2026-11-09 from the customer's stekolni-master.kz export (docs/tz-annotated.md §3.2).
- [ ] **Catalog details to confirm**: product badges ("Хит"); filter tags per product (our draft);
      which sections to feature on the catalog page; prices for items that show their section's
      "from" price; texts still say the old site's things like "онлайн-магазин"; photos for the 3
      items without one.
- [ ] Real customer reviews (with permission to publish).
- [ ] Glass **tempering**: no in-house furnace (customer, 2026-11-09). Is tempering offered at
      all (through a partner)? Services page and catalog still list it; drop it there if not.
- [ ] **About page facts** (`src/content/about.ts`, everything in `[brackets]`): workshop area;
      sheet size, thickness range, drill diameters, lead time; machine list and their
      specs/origin; delivery prices (free-delivery threshold, city fee, ₸/km in the region),
      installation radius and towns, installers' experience. (Company is new: no history or
      team section; warranty 1 year, confirmed 2026-11-09.)
- [ ] **Contacts page facts** (`src/content/contacts.ts`, everything in `[brackets]`): second
      phone (production / pickup) or drop it; Telegram response time; hours per department
      (office/showroom, production/pickup, measurer) and Sunday; is there a showroom; how to
      drive in and park; works with VAT or without.
- [ ] **Services page facts** (`src/content/services.ts`, everything in `[brackets]`): prices
      for each work (cutting, shaped cutting, grinding, polishing, drilling, bevel, tempering,
      mirrors, installation, delivery), cutting tolerance, drill diameters, bevel widths, Telegram
      reply time; photos for each of the 9 services.
- [ ] **Portfolio** (`src/content/portfolio.ts`): real completed projects with photos (title,
      place, year, category, materials, works, area/term), which one is "Проект месяца", a real
      review with permission; the numbers "[3000+] заказов" and "[400+] объектов за год" (the
      company is new: drop them if they are not true).
- [ ] **Catalog section taglines** (second half of the H1 on category pages) are imported
      lead times ("Изготовление от 5–7 дней"); the design wants a description like
      "Настенные, интерьерные, фигурные". Write them or confirm.
- [ ] **Landing facts** (`src/content/landings.ts`, everything in [brackets]): glass thickness,
      free measurement, cutting precision, sheet size, drill diameters, facet widths; delivery area
      for the footer line "Доставка по всему Казахстану" (left out until confirmed).
- [ ] **Response times** promised in the forms: callback "[10 минут]", order "[30 минут]".
- [ ] **Legal details** for the Contacts page and the privacy policy: BIN, bank, IIK, legal
      address (director: Абылгазиев Сакен Берикович, from the spec).
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
- [ ] Max upload file size for drawings/photos (draft today: 5 files × 10 MB, src/lib/leads/uploads.ts).
- [ ] Email for transactional mail (domain mailbox?).

## Legal

- [ ] Legal entity details for the privacy policy (BIN, legal address).
- [ ] Who writes the privacy policy / consent texts (customer's lawyer or us from a template)?
- [ ] Kazakh-language version required now or later?
