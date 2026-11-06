# 0003. Telegram bot instead of WhatsApp; no price calculator

- **Status:** Accepted (customer decision)
- **Date:** 2026-11-06

## Context

The original spec (tz-original.md) requires:

- WhatsApp integration (§1, §3.1, §4.3, §12): a floating WhatsApp button, WhatsApp in the header and contacts, prefilled WhatsApp messages from product cards, analytics on WhatsApp clicks.
- An online price calculator (§4.1, §8, §12, §15) with admin-managed tariffs.

The customer changed both requirements.

## Decision

1. **WhatsApp is removed completely.** Everywhere it was used, a **Telegram bot** link is used instead (`https://t.me/<bot>`): header button, floating button, contacts block, texts.
   - Product cards will pass context to the bot through a deep link (`?start=<payload>`, Latin letters, digits, `_` and `-`, max 64 characters) instead of a prefilled WhatsApp message. Builder: `telegramHref()` in `src/lib/contact-links.ts`.
   - The bot itself (what it answers, how it hands leads to managers) is a **separate project with its own spec** — out of scope for this repository.
2. **There is no price calculator on the site.** The `/kalkulyator` page, its navigation item, calculator tariffs in the CMS and calculator analytics are dropped. Prices are shown on products ("от … ₸" or "Цена рассчитывается индивидуально"); exact cost is calculated by a manager from a lead.

## Consequences

- Navigation: Каталог · Услуги · Наши работы · О компании · Контакты.
- Site settings store the bot username (`telegramBot`) instead of a WhatsApp number.
- The open questions about calculator tariffs are closed; the bot username becomes an open question.
- Acceptance criteria from spec §12 change accordingly: "Telegram opens the correct bot" instead of "WhatsApp opens with the correct number"; the calculator criterion no longer applies. This should be reflected in the contract.
- Analytics (spec §8) tracks Telegram clicks instead of WhatsApp clicks; no calculator events.
- tz-original.md is left unchanged (it is the customer's original document); this record is the source of truth for the change.
