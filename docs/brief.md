# Project Brief

> Distilled from [tz-original.md](../tz-original.md) (customer's original spec, Russian, read-only).
> If this file and the original disagree, the original wins until the customer confirms a change.

## Business

- **Company:** TOO "Steklo&Center" (ТОО «Стекло&Центр»), Almaty, Kazakhstan.
- **Customer / owner:** Abylgaziev Saken Berikovich.
- **What they do:** manufacture, process, sell and install glass and mirror products — sheet and tempered glass, mirrors, shower enclosures, glass doors, partitions, railings, mirror panels, glass tables and shelves, custom structures, hardware, glass processing services.
- **Reference site:** https://stekolni-master.kz/
- **Audience:** private clients (B2C) and companies (B2B) in Almaty and the region.
- **Site language:** Russian. Currency: Kazakhstani tenge (₸).

## Goals of the website

1. Present the company, its services and production capabilities.
2. Show the product range and real completed projects (portfolio).
3. Collect leads: order requests, callback requests, WhatsApp chats.
4. Give a preliminary price via an online calculator.
5. Accept custom orders with the customer's own sizes, photos or drawings.
6. Bring in organic traffic from Google and Yandex (local SEO, Almaty).

## The one hard requirement

> The owner must never need a programmer for routine changes: prices, products, photos, texts, contacts, homepage content.

Everything a non-technical person would want to change lives in the admin panel, not in code.

## Customer journey

```
Search (Google/Yandex) or ad
  → Landing / SEO page / homepage
  → Catalog category or Portfolio
  → Product card  ──or──  Calculator
  → Order form / Callback / WhatsApp
  → Manager confirms final price → order
```

The site does **not** sell online with checkout in v1 — every order is a lead that a manager confirms. Online payment is a phase-2 feature.

## Scope

### v1 (this contract)

- Pages: Home, Catalog (12 categories → category pages → product cards), Services, Portfolio with filters + project pages, About, Contacts, SEO landing pages, legal pages.
- Price calculator with admin-managed tariffs.
- Order form with file upload (JPG/JPEG/PNG/PDF), callback form, floating WhatsApp button with prefilled messages.
- Admin panel: products, categories, prices, photos, portfolio, reviews, news/articles, contacts, homepage, leads with statuses and search.
- New-lead notifications to the owner.
- SEO basics, GA4 + Yandex Metrica with event tracking.
- Compliance with Kazakhstan personal data law (consent checkbox on every form).

### Phase 2 (not now, but architecture must allow it)

Client accounts, order history, online payment, auto-generated PDF quotes, CRM integration, 1C integration, automatic order-status notifications to clients, advanced calculator for complex structures.

## Visual direction

Modern, minimal, "premium interior" feel. Light backgrounds (white / light grey), accents in black, graphite and glass tints. Large high-quality photos of products and finished projects. Clear navigation, prominent order buttons, nothing cluttered. Mobile-first.

## Acceptance criteria (summary of spec §12)

All pages work; catalog shows categories and products with photos and specs; calculator computes correctly with agreed tariffs; forms submit and save leads; file upload works; WhatsApp opens with the correct number; admin can change prices, texts, contacts and add products and photos; correct on smartphones; SEO and analytics configured; deployed on the agreed domain and hosting; all accesses and docs handed over.
