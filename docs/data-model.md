# Data Model (in words)

> Conceptual model derived from the spec. The concrete schema (CMS collections, field types, relations) is defined during the planning session and recorded in `architecture.md`. Update this file when the meaning of an entity changes.

## Catalog

**Category** — a catalog section (12 initially, admin can add more).

- name, slug, description, cover image, sort order
- SEO: title, meta description
- optional parent category (keeps nesting possible later)

**Product** — an item shown in a category.

- name, slug, category (one or more)
- photo gallery (with alt text)
- description (rich text) and technical specs (key–value list)
- available sizes and glass thicknesses
- available colors / glass types and processing options
- price: either a fixed price (₸, with unit — per piece / per m²) **or** the flag "price calculated individually" (then no number is shown)
- links to the calculator with this product preselected
- SEO: title, meta description
- published / draft

**Service** — e.g. cutting, edge grinding & polishing, drilling, bevelling, tempering, mirror making, structure manufacturing, installation, delivery.

- name, slug, description, photos, optional price note, SEO fields

## Portfolio

**Project** — a completed real order.

- title, slug, portfolio category (shower cabins, mirrors, partitions, doors, railings, furniture, custom)
- photo gallery, short description
- materials used, list of works performed
- optional: date, location/district
- SEO fields, published / draft

## Calculator tariffs (admin-managed, never hard-coded)

Inputs the client chooses: product type, length (mm), width (mm), thickness, glass type, processing options, quantity.

- **Area:** `area_m2 = length_mm × width_mm / 1_000_000`
- **Material price** — per m², depends on product type × glass type × thickness.
- **Processing price** — per operation; unit varies (per linear metre of edge, per hole, per m², flat fee).
- **Extra services** — delivery, installation (flat or rule-based).
- **Minimum order / minimum billable area** — likely needed, to be confirmed.
- Some product types are flagged "individual calculation only" → calculator shows a request form instead of a price.

Result is always labelled _preliminary_; the manager confirms the final price. Exact pricing formula is an **open question** — see [open-questions.md](open-questions.md).

## Leads (requests from the site)

**Order request**

- client name, phone (required)
- product type, dimensions, quantity, comment
- attachments: JPG/JPEG/PNG/PDF, size-limited, validated
- source: which form / page / product, calculator snapshot (inputs + computed price) if it came from the calculator
- UTM / referrer for analytics
- personal-data consent: given (bool) + timestamp
- status (see below), manager notes, created/updated timestamps

**Callback request**

- name, phone, preferred time (optional), consent, status

**Lead statuses** (spec §5):
New → In progress → Awaiting calculation → Offer sent to client → Order placed → Order completed / Rejected

Admin needs: list with filters by status, search by name and phone, status change, notes.

**On a new lead:** save to DB, then notify the owner. Channel (email / Telegram / WhatsApp) is an **open question**.

## Content

- **Review** — author name, text, rating (optional), photo (optional), date, published flag.
- **Article / news** — title, slug, cover, body, date, SEO fields, published flag.
- **SEO landing page** — slug, title, body blocks, linked categories/projects, SEO fields.
- **Legal page** — privacy policy, consent, terms, cookies.

## Global settings (single editable records)

- **Site settings** — company name, logo, phones, WhatsApp number, email, address, working hours, map coordinates, social links, analytics IDs, default SEO.
- **Homepage** — hero (image, headline, subtext, CTA), about block, advantages, steps, featured categories/projects/reviews.

## Users

- **Admin users** — owner and managers. Roles likely: _admin_ (everything) and _manager_ (leads + content, no settings/users). To be confirmed.
- Client accounts are **phase 2** — keep user model extensible but do not build now.
