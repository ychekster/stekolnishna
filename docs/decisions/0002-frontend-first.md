# 0002. Build the frontend first, behind a content layer

- **Status:** Accepted
- **Date:** 2026-11-06

## Context

- A finished homepage design arrived (docs/design/) and the customer wants to see it live in a browser and on phones right away.
- The development machine has no PostgreSQL or Docker, which Payload CMS requires.
- The stack (0001) is still awaiting customer approval.

## Decision

Implement the homepage now in Next.js without a CMS, behind a content layer:

- Content types in `src/lib/content/types.ts` describe what pages need.
- `getHomePage()` / `getSiteSettings()` in `src/lib/content/index.ts` are the only way pages get content. Today they return placeholder data from `src/content/`.
- Leads go through `saveLead()` in `src/lib/leads/repository.ts`, which currently only logs.

When Payload is added, only the bodies of these functions change; components stay untouched.

## Alternatives considered

- **Wait for the database and CMS** — delays the visible result for no design benefit.
- **Payload with SQLite for development** — dev/prod database mismatch (different migrations) for a temporary gain.
- **Hard-code content inside components** — fast, but would have to be unpicked file by file later.

## Consequences

- The site is viewable and the form works end-to-end, but **leads are not stored** — the preview must not be used with real customers.
- `src/content/` is temporary and must be deleted when the CMS lands.
- Content types will likely need small adjustments to match Payload's generated types.
