# Open Questions

Things the spec does not answer. Each needs a decision from the customer (or from us, where noted) before the related stage starts. When answered, record the answer here (or in `decisions/`) and remove it from the open list.

## Blocking for design

- [ ] **Logo** — exists? Vector file (SVG/AI/PDF)?
- [ ] **Brand colors and fonts** — exist, or do we define them? (Spec only says: light background, black/graphite/glass accents.)
- [ ] **Photos** — real photos of products and completed projects? How many, what quality? Who shoots missing ones?
- [ ] **Reference notes** — what exactly to take from stekolni-master.kz and 2–4 other sites (header, product card, catalog, portfolio). Screenshots → `docs/references/`.

## Blocking for content

- [ ] Real company data: address, phones, WhatsApp number, email, working hours, map location.
- [ ] Texts: company history, equipment, team, delivery and installation terms, service area.
- [ ] 10–20 real products with photos, specs and prices to fill the catalog for design and testing.
- [ ] Real customer reviews (with permission to publish).
- [ ] Is glass **tempering** offered in-house? (Spec §3.3 says "if the service is provided".)

## Blocking for the calculator

- [ ] Full tariff table: price per m² by product type × glass type × thickness.
- [ ] Processing prices and their units (per linear metre of edge? per hole? per m²?).
- [ ] Delivery and installation pricing rules.
- [ ] Minimum order amount / minimum billable area?
- [ ] Which product types are "individual calculation only"?
- [ ] Is edge processing calculated from the perimeter automatically?

## Blocking for backend / infrastructure

- [ ] **Stack approval** by the customer (spec §7) — see [decisions/0001-tech-stack.md](decisions/0001-tech-stack.md).
- [ ] **Domain** — exists? Which one?
- [ ] **Hosting** — preference / budget? Must it be in Kazakhstan (personal data localisation)?
- [ ] **New-lead notification channel** — email, Telegram bot, WhatsApp? To whom?
- [ ] Admin users — how many people, which roles?
- [ ] Max upload file size for drawings/photos.
- [ ] Email for transactional mail (domain mailbox?).

## Legal

- [ ] Legal entity details for the privacy policy (BIN, legal address).
- [ ] Who writes the privacy policy / consent texts (customer's lawyer or us from a template)?
- [ ] Kazakh-language version required now or later?
