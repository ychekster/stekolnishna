# 0001. Tech stack

- **Status:** Proposed — awaiting customer approval (spec §7) and comparison in the planning session
- **Date:** 2026-11-06

## Context

- The spec recommends React/Next.js on the frontend, Laravel or Node.js on the backend, MySQL or PostgreSQL, and allows another stack if it is reliable, secure and self-manageable.
- The hard requirement: the owner edits products, prices, photos, texts and leads without a programmer → we need a solid admin panel.
- Hand-writing an admin panel, auth and file uploads is where most security holes and rewrites come from.
- SEO matters (local Almaty traffic) → server rendering.
- The project must be easy for an ordinary developer to pick up and maintain later.

## Decision (proposed)

| Layer                 | Choice                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Framework             | Next.js (App Router), TypeScript in strict mode                                                                         |
| Styling               | Tailwind CSS with design tokens                                                                                         |
| CMS / admin / backend | Payload CMS — runs inside the Next.js app, gives admin UI, auth, access control, uploads and generated TypeScript types |
| Database              | PostgreSQL                                                                                                              |
| Media storage         | S3-compatible object storage in production, local disk in development                                                   |
| Tests                 | Vitest (unit, especially pricing and validation), Playwright (end-to-end for forms)                                     |

One codebase, one deploy, one language (TypeScript) for frontend and backend.

## Alternatives considered

- **Next.js + Laravel (with Filament admin)** — mature admin, but two languages and two deploys; more for a single developer to maintain.
- **Next.js + Strapi / Directus** — separate CMS service to host and update; weaker type sharing with the frontend.
- **Next.js + hand-written Node API + custom admin** — maximum control, maximum cost and risk; rejected.
- **WordPress / Tilda** — fast to start, but conflicts with the custom lead workflow and long-term maintainability goals.

The planning session should re-check these against current versions before final acceptance.

## Consequences

- Admin panel, roles and uploads come ready and tested; we focus on the storefront, design and lead flow.
- Data models are defined in Payload config — that file becomes the source of truth for the schema; types are generated from it.
- Hosting must run a Node.js server and PostgreSQL (no pure static hosting).
- We depend on Payload's release cycle; pin versions and upgrade deliberately.
