# Steklo&Center website

Corporate website for a glass and mirror workshop in Almaty: product catalog, portfolio, price calculator, lead forms, WhatsApp integration and an admin panel for the owner.

**Status:** homepage implemented (frontend only, placeholder content). CMS, database and other pages are next — see [docs/architecture.md](docs/architecture.md).

## Getting started

Requirements: Node.js 24+, npm.

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

Other commands:

```bash
npm run check          # lint + typecheck + unit tests
npm run build && npm run start
npm run format
```

> **Windows note:** if the project path contains `&`, npm scripts fail under cmd.exe. Rename the folder, or run npm with `npm_config_script_shell="C:/Program Files/Git/bin/bash.exe"`. Details in [CLAUDE.md](CLAUDE.md#environment-gotchas).

### Preview on a phone

```bash
npm run build && npm run start
cloudflared tunnel --url http://localhost:3000
```

Open the printed `https://….trycloudflare.com` URL. `.env.local` must contain `ALLOWED_ORIGINS=*.trycloudflare.com`.

## Documentation

| File                                             | What it is                                             |
| ------------------------------------------------ | ------------------------------------------------------ |
| [docs/architecture.md](docs/architecture.md)     | Code structure, design system, data flow               |
| [docs/design/](docs/design/)                     | Homepage design handoff (tokens, screenshots)          |
| [docs/brief.md](docs/brief.md)                   | Project brief: goals, scope, journey                   |
| [docs/sitemap.md](docs/sitemap.md)               | Pages and URLs                                         |
| [docs/data-model.md](docs/data-model.md)         | Entities in plain words                                |
| [docs/open-questions.md](docs/open-questions.md) | What we still need from the customer                   |
| [docs/decisions/](docs/decisions/)               | Architecture decision records                          |
| [tz-original.md](tz-original.md)                 | Customer's original specification (Russian, read-only) |
| [CLAUDE.md](CLAUDE.md)                           | Working rules for Claude Code                          |
