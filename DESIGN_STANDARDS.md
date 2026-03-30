# Design Standards — phillip.byram.dev

Comprehensive design reference compiled from 9 specialist audits:
Typography, Color, Visual Hierarchy, Spacing & Layout, Dark Mode,
Motion, Accessibility, Landing Page, Responsive Design, and Design System Architecture.

---

## 1. Typography

### Current Stack
- **Sans:** Inter (400, 500, 600, 700)
- **Mono:** JetBrains Mono (400, 500)
- **Scale ratio:** Major Third (1.25) recommended

### Type Scale (fluid with clamp)

| Token | Min (320px) | Max (1024px) | Usage |
|---|---|---|---|
| `--text-sm` | 0.75rem (12px) | 0.8rem (12.8px) | Captions, tags, dates |
| `--text-base` | 0.938rem (15px) | 1rem (16px) | Body text |
| `--text-md` | 1.063rem (17px) | 1.25rem (20px) | Lead paragraphs, card titles |
| `--text-lg` | 1.188rem (19px) | 1.563rem (25px) | Section subheadings (h3) |
| `--text-xl` | 1.375rem (22px) | 1.953rem (31px) | Page headings (h2) |
| `--text-2xl` | 1.563rem (25px) | 2.441rem (39px) | Page titles (h1) |
| `--text-3xl` | 1.953rem (31px) | 3.052rem (49px) | Hero heading |

### Line Heights
- Body text: **1.6**
- Headings (h1-h3): **1.1 - 1.2**
- Display text (hero): **1.1**
- UI labels/buttons: **1.0 - 1.25**

### Line Length
- Optimal: **45-75 characters** per line (65ch sweet spot)
- Current `max-w-3xl` (48rem) yields ~70-75ch at 16px -- acceptable
- Use `max-w-prose` or `max-w-[65ch]` on long-form content for safety

### Weight Usage
| Weight | Usage |
|---|---|
| 400 (Regular) | Body text, descriptions |
| 500 (Medium) | Nav links, meta labels |
| 600 (SemiBold) | Subheadings, buttons, section labels |
| 700 (Bold) | Page titles, hero heading |

### Font Loading (Recommended Migration)
- **Self-host** Inter and JetBrains Mono as WOFF2 files in `/public/fonts/`
- **Preload** only the 2 most-used weights (400, 700)
- Add `font-display: swap` to all `@font-face` declarations
- Remove Google Fonts `<link>` tags from BaseLayout
- Expected improvement: 100-300ms faster First Contentful Paint

---

## 2. Color System

### Semantic Tokens

| Token | Light (OKLCH) | Dark (OKLCH) | Usage |
|---|---|---|---|
| `--color-bg` | oklch(1 0 0) | oklch(0.16 0.02 260) | Page background |
| `--color-surface` | oklch(0.97 0.005 260) | oklch(0.23 0.02 260) | Cards, hover states |
| `--color-surface-alt` | oklch(0.95 0.005 260) | oklch(0.24 0.02 260) | Header, elevated panels |
| `--color-surface-top` | oklch(0.93 0.005 260) | oklch(0.28 0.015 260) | Code blocks, tooltips |
| `--color-text` | oklch(0.15 0.01 260) | oklch(0.9 0.01 260) | Primary text |
| `--color-muted` | oklch(0.40 0.01 260) | oklch(0.68 0.02 260) | Secondary text |
| `--color-border` | oklch(0.91 0.005 260) | oklch(0.30 0.02 260) | Dividers, borders |
| `--color-accent` | oklch(0.49 0.2 270) | oklch(0.72 0.15 270) | Links, primary CTA |
| `--color-accent-hover` | oklch(0.43 0.22 270) | oklch(0.76 0.17 270) | Link/button hover |
| `--color-accent-active` | oklch(0.38 0.2 270) | oklch(0.64 0.14 270) | Link/button active |
| `--color-accent-fg` | oklch(1 0 0) | oklch(0.15 0.02 270) | Text on accent bg |
| `--color-accent-subtle` | oklch(0.96 0.03 270) | oklch(0.22 0.04 270) | Active nav bg, highlights |
| `--color-focus` | = accent | = accent | Focus rings |

### Contrast Requirements (WCAG AA)
- Normal text on bg: **4.5:1 minimum** -- all combinations must pass
- Large text (18px+): **3:1 minimum**
- UI components: **3:1 minimum**

### Critical Fix Applied
- Light accent darkened from `0.55` to `0.49` lightness to achieve 4.5:1 on white
- Dark muted raised from `0.60` to `0.68` for readable secondary text
- Light muted tightened from `0.45` to `0.40` for better contrast

### Color Principles
- **Unified hue:** All neutrals use hue 260 (blue-violet), accent at 270
- **No color as sole indicator** -- always pair with icons, text, or patterns
- **Replace opacity hacks** (`hover:opacity-75`) with explicit color states
- Use `--color-accent-fg` instead of hardcoded `text-white` on buttons

---

## 3. Visual Hierarchy

### Hierarchy Scale (Current)

```
Hero h1:        text-5xl/6xl  (3rem/3.75rem)  -- primary focal point
Hero subtext:   text-xl/2xl   (1.25rem/1.5rem) -- supporting context
CTA buttons:    text-base     (1rem)           -- prominent interactive
Section label:  text-sm       (0.875rem) uppercase tracking-widest -- orientation
Card title:     text-base     (1rem)           -- content items
Card desc:      text-sm       (0.875rem)       -- secondary content
Card meta:      text-xs       (0.75rem)        -- tertiary detail
```

### Principles
1. **Squint test:** Each screen must have ONE clear focal point
2. **Size jumps must be noticeable** -- 2px differences are not hierarchy
3. **Section labels use eyebrow pattern** (small, uppercase, muted, tracked) so they don't compete with content headings
4. **Primary CTA must be the most visually prominent interactive element** on the page
5. **Spacing communicates grouping** -- tight within groups, generous between

### Z-Pattern for Home Page
- Top-left: Site title (logo)
- Top-right: Nav + theme toggle
- Center: Hero h1 (focal point)
- Bottom: CTAs, then content sections

---

## 4. Spacing & Layout

### Spacing Scale (4px base grid)

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | 4px (0.25rem) | Tag gaps, inline offsets |
| `--space-sm` | 8px (0.5rem) | Related elements, compact gaps |
| `--space-md` | 16px (1rem) | Default: paragraphs, card padding |
| `--space-lg` | 24px (1.5rem) | Subtitle to CTA, sub-section gaps |
| `--space-xl` | 40px (2.5rem) | Section headers to content |
| `--space-2xl` | 64px (4rem) | Section-to-section gaps |
| `--space-3xl` | 96px (6rem) | Hero breathing room |

### Fluid Spacing (clamp)

| Token | Range | Usage |
|---|---|---|
| `--space-section` | clamp(3rem, 2rem + 4.29vw, 6rem) | Between page sections |
| `--space-content` | clamp(2rem, 1.5rem + 2.14vw, 3rem) | Main content padding |
| `--space-element` | clamp(1.5rem, 1rem + 2.14vw, 2.5rem) | Between content blocks |

### Spacing Ratios
- **Section-to-section : Intra-section = 3:1 minimum**
- Heading should have more space ABOVE than below (groups with its content)
- Inter-paragraph spacing: 1em default

### Container
- **Content width:** max-w-3xl (48rem / 768px) -- ideal for text-heavy site
- **Page margins:** px-4 mobile, px-6 tablet, px-8 desktop
- **Do NOT widen** for general content -- 768px is optimal for reading

### Touch Targets
- **Minimum:** 48x48px (WCAG 2.5.8)
- Buttons: `min-h-[48px] inline-flex items-center` + `px-6 py-3`
- Nav links: ensure at least 44px effective target area
- Minimum spacing between touch targets: 8px

### Off-Grid Values to Avoid
- `mb-3` (12px), `mb-10` (40px), `p-5` (20px) -- snap to 8/16/24/32/48/64

---

## 5. Dark Mode

### Surface Elevation (4 levels)

| Level | Token | OKLCH | Usage |
|---|---|---|---|
| 0 (base) | `--color-bg` | oklch(0.16 0.02 260) | Page background |
| 1 | `--color-surface` | oklch(0.23 0.02 260) | Cards, blog card hover |
| 2 | `--color-surface-alt` | oklch(0.24 0.02 260) | Header, sticky bars |
| 3 | `--color-surface-top` | oklch(0.28 0.015 260) | Code blocks, tooltips |

### Text Opacity Pattern
- Primary text: white at ~87% → oklch(0.9 ...)
- Secondary text (muted): white at ~65% → oklch(0.68 ...)
- Disabled: white at ~38%

### Required CSS Additions
```css
:root { color-scheme: light; }
.dark { color-scheme: dark; }
```

### Meta Tags
```html
<meta name="theme-color" content="#f8f8fa" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#262637" media="(prefers-color-scheme: dark)" />
```

### Additional Polish
- **Selection color:** accent at 30% opacity
- **Scrollbar styling:** match dark surface colors
- **Accent desaturation:** reduce chroma by 10-20% in dark mode (already done)
- **Never use pure black (#000)** as dark background
- **Three-state toggle recommended:** Light / Dark / System

### FOUC Prevention
- Blocking inline `<script>` in `<head>` checks localStorage + `prefers-color-scheme`
- Already correctly implemented

---

## 6. Motion & Animation

### Timing Guidelines

| Type | Duration | Easing |
|---|---|---|
| Micro (button press, toggle) | 100ms | ease-out |
| Small (fade, tooltip, hover) | 150ms | ease-out |
| Medium (panel, dropdown) | 250ms | ease-out enter, ease-in exit |
| Large (modal, page) | 300-400ms | ease-out |

### Implemented Animations
- **Page entry:** `fade-up` (400ms ease-out) with staggered delays (80ms intervals)
- **Blog card stagger:** `fade-in-up` (350ms) with `--stagger-index * 60ms`
- **Button press:** `scale(0.97)` on `:active` (100ms)
- **Card hover:** `translateY(-1px)` lift (200ms)
- **Theme toggle icon:** quarter-spin rotation (250ms)

### Rules
1. **Only animate `transform` and `opacity`** -- GPU-accelerated properties only
2. **Never exceed 700ms** for any animation
3. **Exit animations faster than entrance**
4. **Never use `transition: all`** -- list specific properties
5. **Stagger max 5-8 elements** -- limit stagger groups

### Reduced Motion (Implemented)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
All animation classes also reset to `opacity: 1; transform: none` in reduced-motion.

---

## 7. Accessibility

### Implemented
- [x] **Skip link** to main content (`#main-content`)
- [x] **Focus-visible indicators:** 2px solid accent, 2px offset
- [x] **Focus suppression** for mouse/touch (`:focus:not(:focus-visible)`)
- [x] **Reduced motion** support via `prefers-reduced-motion`
- [x] **High contrast** support via `prefers-contrast: more`
- [x] **Semantic HTML:** header, main, footer, nav, article, time
- [x] **ARIA attributes:** `aria-current="page"`, `aria-label`, `aria-hidden`
- [x] **Heading hierarchy:** no skipped levels

### Remaining Items
- [ ] Add `role="status"` or `aria-live` announcement on theme toggle
- [ ] Verify all muted text combinations pass 4.5:1 contrast
- [ ] Add `alt` text strategy for future images
- [ ] Test with screen readers (VoiceOver, NVDA)
- [ ] Color blindness simulation testing
- [ ] Consider adding visible mode indicator on theme toggle (Light/Dark/System)

### Standards
- **Target:** WCAG 2.1 AA
- **Contrast:** 4.5:1 normal text, 3:1 large text, 3:1 UI components
- **Touch targets:** 48x48px minimum
- **Keyboard:** All interactive elements reachable via Tab, Escape closes overlays
- **Never remove `outline`** without providing an equally visible alternative
- **First rule of ARIA:** Use native HTML elements before ARIA roles

---

## 8. Responsive Design

### Breakpoints

| Name | Width | Purpose |
|---|---|---|
| (base) | 0-639px | Mobile-first base styles |
| `sm:` | 640px | Stack-to-row transitions |
| `md:` | 768px | Content breathing room |
| `lg:` | 1024px | Grid enhancements, large-screen polish |

Do NOT add `xl:` or `2xl:` unless needed.

### Fluid Typography Values
```css
--text-fluid-hero:    clamp(2.25rem, 1.5rem + 3.21vw, 3.75rem);
--text-fluid-h1:      clamp(1.875rem, 1.375rem + 2.14vw, 3rem);
--text-fluid-h2:      clamp(1.5rem, 1.15rem + 1.5vw, 2.25rem);
--text-fluid-body-lg: clamp(1.125rem, 1rem + 0.54vw, 1.5rem);
```

### Component Patterns
- **Header:** Fixed `h-14`, no responsive changes needed
- **Navigation:** No hamburger needed (4 short links fit at 320px)
- **Blog cards:** `py-5 px-5` base, `sm:py-6 sm:px-6` for tablet+
- **Project grid:** `sm:grid-cols-2 lg:grid-cols-3`
- **Footer:** `flex-col sm:flex-row` (already correct)

### Image Strategy (Future)
- Use `aspect-ratio` on all images for CLS prevention
- Add `loading="lazy"` for below-fold images
- Add `decoding="async"` on all images
- Consider Astro `<Image>` component for automatic `srcset`

---

## 9. Design System Architecture

### Three-Layer Token Model

```
Layer 1: PRIMITIVE    →  Raw values (palette, spacing scale, radii, durations)
Layer 2: SEMANTIC     →  Purpose-driven (--color-accent, --space-section)
Layer 3: COMPONENT    →  Scoped overrides (--btn-radius, --card-px)
```

### Naming Convention
```
--{category}-{property}-{variant}-{state}

Primitives:  --palette-neutral-500, --spacing-4, --radius-lg
Semantics:   --color-accent, --space-section, --transition-color
Components:  --btn-radius, --card-px, --header-height
```

### Tailwind v4 Integration
- **`@theme`:** Register primitives (spacing, radii, shadows, fonts, z-index)
- **`@layer base`:** Semantic tokens in `:root` / `.dark` that change per theme
- **`@layer components`:** Component-scoped tokens and utility compositions

### What NOT to Over-Engineer
- Don't create `--font-size-body` when `text-base` works fine
- Don't tokenize values used only once
- Don't add breakpoint tokens (CSS vars can't be used in media queries)
- Component tokens only when the component genuinely varies across themes

---

## 10. Landing Page (Home) Improvements

### Recommended Additions (Priority Order)
1. **Avatar/photo** in hero section (64-80px, circular)
2. **Rewrite subtitle** to be specific about your actual work/niche
3. **"Currently working on..." status line** -- signals active maintenance
4. **Divider** between hero and posts (hr or decorative line with label)
5. **Featured project card** below posts section
6. **Social links** in hero or footer (GitHub, Twitter/X, email)
7. **Fill in About page** -- placeholder text undermines everything
8. **Update meta description** -- "Personal site and blog" wastes SEO

### CTA Guidelines
- Primary: bold bg, shadow, semibold weight, arrow hint
- Secondary: ghost/outline style, clearly subordinate
- Both: minimum 48px height, `text-base` or larger
- Value-oriented labels ("See what I'm building" > "Click here")

### Above-the-Fold Content
Header + Hero h1 + Subtitle + CTAs should tell a complete story.
Don't try to cram more above the fold -- visitors will scroll.

---

## Quick Reference: Priority Implementation Order

### Phase 1: Critical Fixes (Accessibility + Contrast)
- [x] Skip link
- [x] Focus-visible indicators
- [x] Reduced motion support
- [x] High contrast mode support
- [x] Muted text contrast fixes
- [ ] `color-scheme: light/dark` in CSS
- [ ] `theme-color` meta tags
- [ ] Darken light-mode accent to pass 4.5:1

### Phase 2: Token Architecture
- [ ] Add fluid typography custom properties
- [ ] Add spacing tokens to `@theme`
- [ ] Replace breakpoint-based sizes with `clamp()`
- [ ] Add accent interactive states (hover, active, subtle)
- [ ] Add `--color-accent-fg` token

### Phase 3: Polish & Enhancement
- [ ] Self-host fonts (WOFF2 + preload)
- [ ] Add surface elevation levels (surface-alt, surface-top)
- [ ] Three-state theme toggle (Light/Dark/System)
- [ ] Scrollbar + selection styling for dark mode
- [ ] Avatar in hero
- [ ] Featured project section
- [ ] Fill in About page content

### Phase 4: Fluid Responsive
- [ ] Fluid typography across all headings
- [ ] Fluid section spacing
- [ ] `lg:grid-cols-3` on project grid
- [ ] Print stylesheet
