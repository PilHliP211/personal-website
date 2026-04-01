# Design Standards

Design reference for phillip.byram.dev. Minimal, content-focused,
technically confident without being overwrought.

---

## Aesthetic Direction

**Tone:** Professional and restrained. Clean enough to let content lead.
Technical confidence through simplicity, not decoration. The site should
feel like a well-maintained tool — purposeful, no excess.

**Principles:**
1. Content first. Every visual choice serves readability.
2. Monochrome foundation. Color is used sparingly and deliberately.
3. Dense where functional, spacious where it matters.
4. Dark mode is the primary experience. Light mode inverts cleanly.

---

## 1. Color System

### Palette: Deep Navy + Coral Accent

Foundation is a deep navy / near-white monochrome pair using OKLCH with
hue 250 for cool blue undertones. Accent is a muted coral (hue 15) used
**only for decorative elements** — never for links or interactive text.

Implementation contract:
- Semantic colors are defined as Tailwind theme variables in [src/styles/global.css](/mnt/c/Users/phill/code/personal-website/src/styles/global.css) using the `--color-*` namespace so utilities like `bg-surface`, `text-muted`, `border-border`, and `ring-border` are generated automatically.
- Light mode values are the default `@theme` values. Dark mode and high-contrast adjustments override the same `--color-*` tokens in the cascade instead of introducing a second naming layer.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-bg` | oklch(0.99 0 0) | oklch(0.20 0.06 250) | Page background |
| `--color-surface` | oklch(0.96 0.003 250) | oklch(0.25 0.05 250) | Cards, hover bg |
| `--color-text` | oklch(0.15 0.03 250) | oklch(0.93 0.005 250) | Primary text |
| `--color-muted` | oklch(0.50 0.01 250) | oklch(0.60 0.015 250) | Secondary text |
| `--color-border` | oklch(0.90 0.005 250) | oklch(0.30 0.04 250) | Separators |
| `--color-accent` | oklch(0.58 0.12 15) | oklch(0.72 0.10 15) | Decorative only |

### Theme Contract
- Semantic color tokens are defined once in `@theme` in [src/styles/global.css](/mnt/c/Users/phill/code/personal-website/src/styles/global.css).
- The default light palette lives in `@theme`; `.dark` and high-contrast overrides only reassign the same `--color-*` tokens.
- Shared components should consume these tokens through semantic utilities such as `bg-bg`, `bg-surface`, `text-text`, `text-muted`, `border-border`, `border-accent`, `ring-border`, and `divide-border`.
- Base styles may read the same contract with `var(--color-*)`, but do not introduce duplicate palette variables or page-local hex values for shared UI.

### Accent Usage Rules
- Accent is **decorative only**: `<hr>`, header/footer borders, focus rings, prose quote borders
- **Never** use accent for links, button text, or interactive element text
- Links use `text-text` with `text-decoration-color: muted` underlines
- Tags use `bg-surface` + `text-muted`, not accent
- Primary CTA uses inverted scheme (`bg-text text-bg`), not accent
- No gradients. No shadows heavier than `shadow-sm`.

### Hex Approximations
| Token | Light | Dark |
|---|---|---|
| bg | #FCFCFC | #001730 |
| surface | #F0F2F4 | #0D2339 |
| text | #030C17 | #E5E8EB |
| muted | #5F6469 | #7A8189 |
| border | #DBDEE1 | #1E2F41 |
| accent | #B65963 | #DC8A90 |

---

## 2. Typography

### Fonts
- **Sans:** Inter Variable (self-hosted via @fontsource)
- **Mono:** JetBrains Mono (self-hosted, used for tags and code)
- Weights: 400, 500, 600, 700 for Inter; 400, 500 for JetBrains Mono

### Scale
| Element | Class | Size |
|---|---|---|
| Page title | `text-3xl sm:text-4xl` | 30-36px |
| Hero name | `text-3xl sm:text-4xl` | 30-36px |
| Section label | `text-sm uppercase tracking-widest` | 14px |
| Card title | `text-sm font-semibold` | 14px |
| Body text | `text-base` or `text-sm` | 14-16px |
| Meta / tags | `text-xs font-mono` | 12px |

### Rules
- `tracking-tight` on all headings
- `leading-relaxed` on body paragraphs
- `max-w-prose` or `max-w-3xl` for line length
- `font-mono` for tags, code references, and technical labels
- No `font-light` — minimum weight is 400

---

## 3. Spacing & Layout

### Container
- `max-w-3xl` (48rem) centered, `px-4 sm:px-6`
- Main content: `py-12`

### Section Spacing
- Between major sections: `mb-20 sm:mb-24`
- Section header to content: `mb-6`
- Page header to content: `mb-12`

### Component Spacing
- Card padding: `p-4`
- Card gap (grid): `gap-3`
- Button padding: `px-5 py-2.5`
- Tag padding: `px-1.5 py-0.5`

### Touch Targets
- All interactive elements: `min-h-[44px]` minimum
- Nav links: `px-3 py-2.5` with `min-h-[44px]`

---

## 4. Components

### Buttons
- **Primary:** `bg-text text-bg` (inverted). No accent color.
- **Secondary:** `border border-border text-text hover:bg-surface`
- Both: `rounded-md text-sm font-medium`, `btn-press` for micro-interaction
- Size: `px-5 py-2.5 min-h-[44px]`

### Cards (Project / Blog)
- `rounded-lg p-4 border border-border`
- Hover: `hover:border-muted` + `card-hover` class (subtle lift)
- Title: `text-sm font-semibold text-text`
- Description: `text-sm text-muted`

### Tags
- `text-xs font-mono px-1.5 py-0.5 rounded bg-surface text-muted`
- No borders on tags. Background only.

### Navigation
- Active: `bg-surface text-text`
- Inactive: `text-muted hover:text-text hover:bg-surface`
- No accent color in nav. Just surface/text contrast.

### Section Labels
- `text-sm font-medium uppercase tracking-widest text-muted`
- Used for "Projects", "Writing" etc. on home page

### Decorative Separators
- Header/footer borders: `border-accent/20` (subtle coral line)
- Content separators: `<hr class="accent-rule">` (coral at 40% opacity)
- Prose `<hr>` and blockquote borders use accent via `--tw-prose-*` tokens

---

## 5. Dark Mode

- Dark is the primary experience
- Background is visibly navy-blue (`oklch(0.20 0.06 250)`), not black
- `color-scheme: light` / `color-scheme: dark` set on root
- Theme persisted in localStorage, respects `prefers-color-scheme`
- FOUC prevented via blocking script in `<head>`
- `theme-color` meta tags: `#FCFCFC` (light) / `#001730` (dark)
- Hue 250 (cool blue) maintained across all neutral tokens

---

## 6. Accessibility

### Implemented
- Skip link to `#main-content`
- `focus-visible` indicators (2px accent outline, 2px offset)
- `prefers-reduced-motion` kills all animation
- `prefers-contrast: more` adjusts muted/border tokens
- Semantic HTML throughout
- ARIA: `aria-current`, `aria-label`, `aria-hidden`, `aria-live`
- Screen reader theme toggle announcements

### Standards
- Target: WCAG 2.1 AA
- Text contrast: 4.5:1 minimum
- Touch targets: 44px minimum
- All content keyboard accessible

---

## 7. Motion

### Animations
- Page entry: `fade-up` (400ms ease-out, staggered 80ms)
- List items: `fade-in-up` (350ms, staggered 60ms)
- Button press: `scale(0.97)` (100ms)
- Card hover: `translateY(-1px)` (200ms)

### Rules
- Only `transform` and `opacity` — GPU-accelerated only
- Never exceed 500ms for UI animations
- All motion disabled under `prefers-reduced-motion: reduce`
- No `transition: all`
