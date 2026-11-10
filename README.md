# Steklo&Center website

Corporate website for a glass and mirror workshop in Almaty, Kazakhstan: product catalog,
portfolio, lead forms, Telegram bot link and (next stage) an admin panel for the owner.
Site language: Russian.

**Status:** every page is built (frontend only, content in local files). Next: customer
review, then Payload CMS + PostgreSQL. Preview: https://steklo-center.ychekster.workers.dev
(noindex).

Stack: Next.js 16 (App Router, Cache Components) · TypeScript strict · Tailwind CSS v4 · zod ·
Vitest. Planned: Payload CMS + PostgreSQL.

## Getting started

Requirements: Node.js 24+, npm.

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

| Command                          | What it does                                                        |
| -------------------------------- | ------------------------------------------------------------------- |
| `npm run check`                  | lint + typecheck + unit tests; must pass before a commit            |
| `npm run build && npm run start` | production build and server                                         |
| `npm run format`                 | Prettier                                                            |
| `npm run placeholders`           | content still missing (`[placeholders]`, photos, demo files)        |
| `npm run images`                 | convert new photos in `public/images` to WebP                       |
| `npm run cf:deploy`              | build and deploy the preview to Cloudflare Workers (wrangler login) |

> **Windows note:** while the project path contains `&`, npm scripts fail under cmd.exe. Rename
> the folder, or run npm with `npm_config_script_shell="C:/Program Files/Git/bin/bash.exe"`.
> Details in [CLAUDE.md](CLAUDE.md#environment-gotchas).

### Preview on a phone

```bash
npm run build && npm run start
cloudflared tunnel --url http://localhost:3000
```

Open the printed `https://….trycloudflare.com` URL. `.env.local` must contain
`ALLOWED_ORIGINS=*.trycloudflare.com`.

## Where things are

- `src/app/` routes, `src/components/` UI, `src/lib/` pure logic with tests, `src/content/`
  temporary local content (read only through `src/lib/content`). Details:
  [docs/architecture.md](docs/architecture.md).
- No hard-coded copy: every text, price and photo comes from the content layer, so it can move
  to the admin panel unchanged.

## Documentation

| File                                                               | What it is                                                     |
| ------------------------------------------------------------------ | -------------------------------------------------------------- |
| [docs/architecture.md](docs/architecture.md)                       | Code structure, conventions, design system, next stage plan    |
| [docs/data-model.md](docs/data-model.md)                           | Content types and how they map to Payload                      |
| [docs/tz-annotated.md](docs/tz-annotated.md)                       | Customer's spec with our decisions and status per section (RU) |
| [docs/backlog.md](docs/backlog.md)                                 | Deferred work and the launch checklist                         |
| [docs/open-questions.md](docs/open-questions.md)                   | What we still need from the customer                           |
| [docs/decisions/](docs/decisions/)                                 | Architecture decision records                                  |
| [docs/brief.md](docs/brief.md), [docs/sitemap.md](docs/sitemap.md) | Project brief; pages and URLs                                  |
| [docs/design/](docs/design/)                                       | Homepage design handoff (tokens, screenshots)                  |
| [docs/brand/](docs/brand/)                                         | Logo sources (the site icon)                                   |
| [docs/photo-sources.md](docs/photo-sources.md)                     | Where each stock photo comes from, licences                    |
| [docs/photo-prompts.md](docs/photo-prompts.md)                     | Prompts for generated photos, with target paths                |
| [tz-original.md](tz-original.md)                                   | Customer's original specification (Russian, read-only)         |
| [CLAUDE.md](CLAUDE.md)                                             | Working rules (for Claude Code and for people)                 |
