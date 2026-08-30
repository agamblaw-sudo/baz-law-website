# baz-law-website

Marketing/legal site for Baz Law (agam@baz-law.co.il). Vite + React 19 + React Router + Tailwind v4 + shadcn/radix. Deployed on Vercel with prerendering + SEO file generation at build time.

## Commands
- `npm run dev` — local dev server
- `npm run build` — vite build → prerender routes → generate SEO files (sitemap/robots)
- `npm run lint` — eslint
- `npm test` — vitest

## Conventions
- Components under `src/`, static assets in `public/`.
- Prerendering (`scripts/prerender.mjs`) must cover every indexable route — see recent fix history for why (404s on deep pages).
- Use the `www` host everywhere for canonical URLs, not the apex domain.
- `.bak` files in repo root (`index.html.bak`, etc.) are old snapshots — don't edit, don't treat as source of truth.

## Workflow
- Only commit when explicitly asked. Never force-push to main.
- This repo is connected to claude.ai/code (cloud) — sessions there and local CLI sessions both push to GitHub `agamblaw-sudo/baz-law-website`. Pull before starting local work if a cloud session may have pushed changes.
