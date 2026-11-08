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
- Telegram bot deep link with this product (start parameter = product slug)
- SEO: title, meta description
- published / draft

**Service** — e.g. cutting, edge grinding & polishing, drilling, bevelling, tempering, mirror making, structure manufacturing, installation, delivery.

- name, slug, description, photos, optional price note, SEO fields
- short fact tags ("толщина 4–19 мм"), price text ("от 300 ₸/м.п.", units vary per service)
- Services page copy (intro, "order by photo" steps, price list rows, form copy): `ServicesPage` in `src/lib/content/types.ts`

## Portfolio

**Project** — a completed real order.

- title, slug, portfolio category (shower cabins, mirrors, partitions, doors, railings, furniture, custom)
- photo gallery, short description
- materials used, list of works performed
- optional: date, location/district
- SEO fields, published / draft

## Leads (requests from the site)

**Order request**

- client name, phone (required)
- product type, dimensions, quantity, comment
- attachments: JPG/JPEG/PNG/PDF, size-limited, validated
- source: which form / page / product (today: `homepage`, `about-visit`, `contacts`; the free-text field `details` means "what to make" or "convenient visit time" depending on the source)
- UTM / referrer for analytics
- personal-data consent: given (bool) + timestamp
- status (see below), manager notes, created/updated timestamps

**Callback request**

- name, phone, preferred time (optional), consent, status

**Lead statuses** (spec §5):
New → In progress → Awaiting calculation → Offer sent to client → Order placed → Order completed / Rejected

Admin needs: list with filters by status, search by name and phone, status change, notes.

**On a new lead:** save to DB, then notify the owner. Channel (email / Telegram) is an **open question**.

## Content

- **Review** — author name, text, rating (optional), photo (optional), date, published flag.
- **Article / news** — title, slug, cover, body, date, SEO fields, published flag.
- **SEO landing page** — slug, title, body blocks, linked categories/projects, SEO fields.
- **Legal page** — privacy policy, consent, terms, cookies.

## Global settings (single editable records)

- **Site settings** — company name, logo, phones, Telegram bot username, email, address, working hours, map coordinates, social links, analytics IDs, default SEO.
- **Homepage** — hero (image, headline, subtext, CTA), about block, advantages, steps, featured categories/projects/reviews.
- **About page** — SEO fields, intro (title, lead, photo, key numbers), history milestones (year, title, text), workshop photos with captions, production capabilities (label, value, note), equipment (icon, name, text), team members (name, role, photo), own-production benefits, regions + service-area map, delivery/installation terms, "visit the workshop" form copy. Exact shape: `AboutPage` in `src/lib/content/types.ts`.
- **Lead form copy** — per placement: title, lead, label of the free-text field, submit label, success message.

## Users

- **Admin users** — owner and managers. Roles likely: _admin_ (everything) and _manager_ (leads + content, no settings/users). To be confirmed.
- Client accounts are **phase 2** — keep user model extensible but do not build now.
