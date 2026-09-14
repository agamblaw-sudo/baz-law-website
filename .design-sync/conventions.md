## Using the Baz Law design system

No provider or root wrapper is required — components read design tokens from CSS custom properties defined globally in `styles.css` (via its `@import` closure), not from React context. Just import and use components directly; there is no `<ThemeProvider>` to wrap the app in.

### Styling idiom

This is a Tailwind v4 utility-class system using shadcn-style semantic color tokens (never raw hex/oklch in component markup — always the semantic utility). The real vocabulary, taken straight from the shipped components:

| Purpose | Classes |
|---|---|
| Primary action | `bg-primary`, `text-primary-foreground` |
| Secondary action | `bg-secondary`, `text-secondary-foreground` |
| Muted / subtle surface | `bg-muted`, `text-muted-foreground` |
| Page surface | `bg-background`, `text-foreground` |
| Destructive | `bg-destructive`, `text-destructive`, `border-destructive` |
| Form field border | `border-input`, `bg-input` |
| Focus ring | `border-ring`, `ring-ring/50` |

Radius scale: `rounded-lg` etc. snap to `--radius-xs` … `--radius-2xl` custom properties defined in `styles.css` — don't hardcode pixel radii. Brand accent colors (`--gold`, `--navy`, `--navy-dark`) exist as raw hex custom properties for marketing-page backgrounds/headlines (see `Hero`, `Testimonials`) — prefer the semantic tokens above for interactive components, reach for `--gold`/`--navy-*` only for hero/marketing-section backgrounds like the real components do.

### Where the truth lives

- `styles.css` at the bundle root — the token/typography source of truth (imports `_ds_bundle.css` and the compiled Tailwind output). Read it before styling anything new.
- Fonts: Geist Variable ships in `fonts/`; Hebrew body copy uses Heebo, loaded at runtime from Google Fonts (not bundled) — assume it's present.
- Each component's `.prompt.md` documents its real props.

### Example

```jsx
import { Button } from 'Button';

<div className="bg-background p-6 rounded-lg border border-input">
  <p className="text-foreground text-sm">רוצה לדבר עם עורך דין?</p>
  <Button variant="default" size="default">צור קשר</Button>
</div>
```

Content in this design system is frequently Hebrew/RTL (see `Hero`, `Testimonials`, `Navbar`) — when building pages for this brand, default to RTL layout and Hebrew copy unless told otherwise.
