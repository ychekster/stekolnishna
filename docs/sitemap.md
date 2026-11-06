# Sitemap

> Source: spec §3, §6, §9. URL slugs are proposals (transliterated Russian, lowercase, hyphenated) — final slugs are editable in the admin where marked _(CMS)_.

## Public pages

| Page                    | Proposed URL                                         | Content source        | Spec |
| ----------------------- | ---------------------------------------------------- | --------------------- | ---- |
| Home                    | `/`                                                  | CMS (homepage global) | §3.1 |
| Catalog index           | `/katalog`                                           | CMS (categories)      | §3.2 |
| Category page           | `/katalog/[category]` _(CMS)_                        | CMS                   | §3.2 |
| Product card            | `/katalog/[category]/[product]` _(CMS)_              | CMS                   | §3.2 |
| Services index          | `/uslugi`                                            | CMS (services)        | §3.3 |
| Service page            | `/uslugi/[service]` _(CMS)_                          | CMS                   | §3.3 |
| Portfolio               | `/nashi-raboty` (filter by category via query param) | CMS (projects)        | §3.4 |
| Project page            | `/nashi-raboty/[project]` _(CMS)_                    | CMS                   | §3.4 |
| Calculator              | `/kalkulyator` (also embeddable as a block)          | CMS (tariffs)         | §4.1 |
| About                   | `/o-kompanii`                                        | CMS                   | §3.5 |
| Contacts                | `/kontakty`                                          | CMS (site settings)   | §3.6 |
| News / articles         | `/stati`, `/stati/[slug]`                            | CMS                   | §5   |
| SEO landing pages       | `/[slug]` _(CMS)_ e.g. `/izgotovlenie-stekla-almaty` | CMS                   | §6   |
| Privacy policy          | `/politika-konfidencialnosti`                        | CMS                   | §9   |
| Personal data consent   | `/soglasie-na-obrabotku-dannyh`                      | CMS                   | §9   |
| Terms of use (optional) | `/polzovatelskoe-soglashenie`                        | CMS                   | §9   |
| Cookie policy           | `/cookies` + cookie banner                           | CMS                   | §9   |

### Homepage blocks (in order, spec §3.1)

Header (logo, menu, phone, WhatsApp, "Leave a request") → hero banner → short about → main directions / popular categories → advantages → portfolio gallery → how we work (steps) → reviews → feedback form → contacts + map → footer.

Blocks should be reorderable/editable in the CMS.

### Catalog categories (spec §3.2)

1. Glass — sheet, tempered, clear, tinted
2. Mirrors — wall, interior, shaped
3. Shower enclosures
4. Glass doors — swing and sliding
5. Partitions — office and interior
6. Glass railings — stair and balcony
7. Mirror panels
8. Glass tables — tabletops, furniture
9. Glass shelves
10. Custom structures
11. Hardware — hinges, handles, fasteners, profiles
12. Glass processing — cutting, grinding, drilling, etc.

### Portfolio filter categories (spec §3.4)

Shower cabins, mirrors, partitions, glass doors, railings, glass furniture, custom projects.

### SEO landing topics (spec §6)

Glass manufacturing in Almaty · glass cutting to order · mirror manufacturing · glass partitions · glass showers · tempered glass · glass doors · glass processing.

## Global UI elements

- Floating WhatsApp button on all main pages (spec §4.3).
- "Request a callback" button → modal form (spec §4.4).
- "Leave a request" / order form → modal or page (spec §4.2).
- Cookie consent banner (spec §9).

## Non-public

- `/admin` — CMS admin panel (auth required).
- `/sitemap.xml`, `/robots.txt` — generated.
