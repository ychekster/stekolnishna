# Steklo&Center — corporate website

Website for a glass & mirror workshop in Almaty, Kazakhstan: catalog, portfolio, lead forms, Telegram bot link, admin panel.

**Customer changes to the spec** (docs/decisions/0003): no WhatsApp anywhere — Telegram bot instead; no price calculator. Never re-add either.

- Architecture & code map: @docs/architecture.md
- Brief: @docs/brief.md
- Open questions (check before starting a stage): @docs/open-questions.md
- Sitemap: docs/sitemap.md · Data model: docs/data-model.md · Decisions: docs/decisions/
- Homepage design handoff (source of truth for the UI): docs/design/ (HANDOFF.md, tokens.json, screenshots)
- Customer's original spec: tz-original.md — **read-only, never edit**. Changes go to docs/.
- **Spec with our decisions and status per section: docs/tz-annotated.md. Deferred work: @docs/backlog.md.** For "what's left / is X done" questions answer from these two — don't re-raise decided items. Record every new decision or deferral there.
- Agreed order of work: build all pages first → customer review → admin (Payload) + lead email notifications → launch checklist (SEO, analytics, legal, real data). Details in docs/backlog.md.
- Next.js 16 has breaking changes vs. older versions — see AGENTS.md; check `node_modules/next/dist/docs/` before using an unfamiliar API.

## Language

- Code, comments, docs, commit messages: **English**.
- All site UI and content: **Russian**. Currency ₸ (KZT). Phone format +7.
- Site copy style (user's decision): **no em dashes (—) and no middle-dot separators (·)**. Rephrase with commas, colons, periods or prepositions ("Душевая в квартире", not "Душевая · квартира"). En dash in ranges stays: `Пн–Сб`, `9:00–19:00`, `4–19 мм`.
- Chat with the user: Russian.

## Stack

Next.js 16 (App Router, Cache Components) · TypeScript strict · Tailwind CSS v4 · zod · lucide-react · Lenis (smooth scroll) · Vitest.
Planned, not yet installed: Payload CMS + PostgreSQL (docs/decisions/0001, 0002). Until then content comes from `src/content/` via `src/lib/content/`.

## Commands

```
npm run dev          # dev server, http://localhost:3000
npm run check        # lint + typecheck + unit tests — must pass before a task is done
npm run build && npm run start   # production build/serve
npm run format       # Prettier
```

## Rules

- **No hard-coded content.** Texts, prices, contacts, photos come from the content layer (`getHomePage()`, `getAboutPage()`, `getSiteSettings()` in `src/lib/content`); per-page SEO title/description too (`seo` field + `generateMetadata`). Pages/components never import `src/content/*` directly.
- Placeholders in `[square brackets]` stay visible until the customer provides data. Never invent data, never write fake reviews. Exception agreed with the user: contacts use neat template values (`+7 (700) 000-00-00`, listed in docs/open-questions.md).
- Internal URLs only from `src/lib/routes.ts`. Header/footer live in the root layout — pages render only their content.
- **Do not hand-roll** auth, admin UI or file uploads — they come with Payload.
- No `any`. Business logic in `src/lib/` (pure, unit-tested), not in components.
- Components: `src/components/ui/` (generic), `layout/` (header/footer), `sections/` (sections reused on several pages, e.g. the lead form), `<page>/` (sections of one page). One component per file, PascalCase.
- Page mockups arrive as exported HTML zips ("<page> — десктоп-html.zip"): reference only — rebuild with our components and tokens, keep the root layout's header/footer, design mobile from homepage patterns, and put every concrete fact from their copy in [brackets].
- Every file starts with a short comment on its purpose. Comments explain **why**, not what.
- **Design tokens only** (`src/app/globals.css` `@theme`): `bg-surface-alt`, `text-ink-muted`, `text-h1`, `rounded-md`… Tailwind's default colors/font sizes/radii are disabled on purpose. No raw hex.
- Lists separated by lines: put `dividers-between` on the list (lines only between items, none above the first row or below the last, works for grids). Don't add `border-t`/`border-b` to items.
- Don't put two utilities for the same property on one element (e.g. `relative` + `absolute`, two border colors) — Tailwind resolves by CSS order, not class order. Use variant props instead.
- Forms: server-side zod validation, honeypot, rate limit; required personal-data consent checkbox (Kazakhstan law).
- Secrets only in `.env.local`; when adding a variable, update `.env.example`.
- Phase-2 features (client accounts, payments, CRM, 1C) are out of scope — don't build them, don't design them out.
- After an architectural change update docs/architecture.md; for a significant choice add an ADR in docs/decisions/.

## Workflow

- New stage → plan first (plan mode), then code, `npm run check`, verify in the browser, commit.
- UI work: use the `frontend-design` skill; verify with Playwright MCP at 1440px and 390px against docs/design/screenshot-\*.png.
- Pre-commit hook (husky + lint-staged) runs ESLint, Prettier and typecheck.

## Environment gotchas

- **The project path contains `&`** ("ТОО Стекло&Центр"). npm on Windows runs scripts through cmd.exe, which treats `&` as a command separator → every `npm run …` fails with "Cannot find module …\husky\bin.js" or similar. Workaround until the folder is renamed: run npm with `npm_config_script_shell="C:/Program Files/Git/bin/bash.exe"`, or call binaries directly (`node node_modules/next/dist/bin/next dev`).
- Path also has Cyrillic and spaces — always quote paths.
- Project lives inside OneDrive: if git or `node_modules` misbehave, suspect OneDrive sync first.
- No Google Chrome; Playwright uses Edge (`PLAYWRIGHT_MCP_BROWSER=msedge` in .claude/settings.json, `--channel msedge` for the CLI).
- Preview for phones: `cloudflared tunnel --url http://localhost:3000` (quick tunnel, random `*.trycloudflare.com` URL). `ALLOWED_ORIGINS=*.trycloudflare.com` in `.env.local` is required, otherwise Next.js rejects Server Actions from the tunnel host.
- Stopping a background `npm run start` may leave the `node` process holding port 3000 — kill it by PID (`netstat -ano | grep :3000`).
