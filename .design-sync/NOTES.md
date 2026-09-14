# design-sync notes — baz-law-website

## Repo reality this sync accommodated

- No component library build: `package.json` has no `main`/`module`/`exports`, is `private:true`,
  and plain `.jsx` (no TypeScript, `components.json` has `tsx: false`). This forced synth-entry
  mode from `src/` rather than the normal dist/`.d.ts` path — props contracts are heuristic, not
  real type-checked types.
- `cfg.srcDir` is narrowed to `src/components` (not the default `src/`). Without this, synth-entry
  mode's blanket file walk also picked up `src/main.jsx`, `src/App.jsx`, and every `src/pages/*`,
  and `main.jsx` imports `src/index.css` directly — which pulls Tailwind v4's bare `@import
  "tailwindcss"` etc. into the esbuild bundle and crashes it (those only resolve through Vite's
  PostCSS pipeline, not esbuild). If more components are added outside `src/components/`, don't
  widen `srcDir` back to `src/` without also excluding `main.jsx`/`App.jsx`/`pages/`/`data/`.
- **Forked `lib/source-kit.mjs`** (`.design-sync/overrides/source-kit.mjs`, declared in
  `cfg.libOverrides`): the synth-entry generator emits `export * from <path>`, which per the JS
  spec never re-exports a file's *default* export. This repo's page-section components
  (Navbar, Footer, Hero, etc.) are all `export default function X()` — without the fork none of
  them reach `window.BazLawDS`. The fork adds `export { default as Name } from path` for any
  `componentSrcMap`-pinned file whose source has `export default`. **Re-check this fork if the
  underlying `lib/source-kit.mjs` changes upstream** (diff against the bundled copy on re-sync).
- `cssEntry` points at the **compiled** stylesheet (`dist/assets/index-<hash>.css`, from
  `npx vite build`), not `src/index.css` — the raw source has unresolved bare `@import`s
  (`tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`) that only Vite's build resolves.
  **Re-sync risk**: the filename is content-hashed and changes on every `vite build`. `cfg.buildCmd`
  re-runs the build, but `cssEntry` will then point at a stale/missing filename — re-run
  `find dist/assets -iname '*.css'` and update `cssEntry` before each re-sync's build step.
- Fonts: Geist Variable ships via `@fontsource-variable/geist` and is wired via `cfg.extraFonts`
  pointing at the five `dist/assets/geist-*.woff2` files directly (their `@font-face` `url()`s in
  the compiled CSS are root-absolute `/assets/...` paths that don't resolve relative to the CSS
  file, so the normal CSS-parse font-copy path silently drops them — hence the explicit
  `extraFonts` list). Heebo (used for all Hebrew body copy) is loaded at runtime from Google Fonts
  via a `<link>` in `index.html`, not shipped in any stylesheet — wired via `cfg.runtimeFontPrefixes`.
  **These `dist/assets/geist-*.woff2` filenames are also content-hashed** — re-verify after
  `npx vite build` if `[FONT_DANGLING]`/`[FONT_MISSING]` reappears on a re-sync.
- A self-referencing `node_modules/baz-law-website` symlink was needed transiently so the
  converter's `PKG_DIR` resolution (which expects a real package to walk up from) could find this
  repo's own `package.json` — it was removed after this sync since nothing pins to it. If a re-sync
  hits `ENOENT ... node_modules/baz-law-website/package.json`, recreate it:
  `ln -sfn ../../baz-law-website node_modules/baz-law-website` (run from repo root).
- `.design-sync/node_modules` is a symlink to `.ds-sync/node_modules` (recreate on fresh clone:
  `ln -sfn ../.ds-sync/node_modules .design-sync/node_modules`) — required because the forked
  `source-kit.mjs` imports the bare `ts-morph` package.

## Scope

User chose to sync both the 7 shadcn/Radix UI primitives (`Button`, `Dialog`, `Input`, `Label`,
`Select`, `Switch`, `Textarea`) and ~15 marketing page-section components (`Navbar`, `Footer`,
`Hero`, `Testimonials`, etc.) — pinned explicitly via `cfg.componentSrcMap` rather than left to
auto-discovery, since the default synth-entry scan would otherwise sweep in `pages/`, `data/`,
`main.jsx`, `App.jsx`.

## Authored previews

Only `Button` has an authored preview (`.design-sync/previews/Button.tsx`, 4 stories: Default,
Variants, Sizes, Disabled) — its floor card rendered blank (no default children/label). Every
other component's floor card rendered acceptably (either honest "preview not yet authored" text,
or, for content-heavy ones like `Hero`/`Testimonials`, real content since they take no required
props). Authoring more previews is a standing offer for a future re-sync — see cost-slider options
in the design-sync skill §2.5.

## Re-sync risks

- The two content-hashed filenames above (`cssEntry`, `extraFonts`) are the main thing that will
  silently break on a naive re-sync — both must be re-resolved after `npx vite build` runs.
- This repo has no CI/build step that keeps `dist/` around — `dist/` is gitignored by the app
  itself, so a fresh clone has no `dist/` until `npx vite build` runs.
- No render-affecting changes were tested against a second `vite` config profile (e.g. a different
  Tailwind theme) — if the site's tokens change substantially, expect new `[TOKENS_MISSING]` or
  `[FONT_MISSING]` warnings.
