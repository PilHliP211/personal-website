# CLAUDE.md

## Project

Personal website for Phillip Byram. Astro 6 + Tailwind CSS 4 + MDX.
Deployed to GitHub Pages via GitHub Actions.

## Structure

```
src/
├── components/       Astro components (Header, Nav, Footer, BlogCard, ThemeToggle)
├── content/blog/     MDX blog posts (filename = URL slug)
├── layouts/          BaseLayout (page shell), BlogLayout (article wrapper)
├── pages/            File-based routing (index, about, blog/, projects/)
├── styles/           global.css — all tokens, animations, base styles
└── site.config.ts    Site metadata (title, author, github URL)
docs/
├── ARCHITECTURE.md   Tech stack rationale and CSS architecture
├── DESIGN_STANDARDS.md  Color system, typography, spacing, component specs
├── ROADMAP.md        Planned features and improvements
├── DEPLOYMENT.md     GitHub Pages deploy setup
└── CONTRIBUTING.md   Contribution guidelines
```

## Key Files

- `src/styles/global.css` — Color tokens (OKLCH), font config, dark mode, animations
- `src/layouts/BaseLayout.astro` — HTML shell, meta tags, theme init script
- `src/pages/index.astro` — Home page (hero, projects, blog posts)
- `astro.config.mjs` — Astro config (MDX, sitemap, Tailwind)

## Design Decisions

- Colors: Deep ink monochrome (hue 250) + warm amber accent (hue 55). See `docs/DESIGN_STANDARDS.md`.
- Dark mode: Class-based (`.dark`), FOUC prevented via blocking script in `<head>`.
- Fonts: Self-hosted Inter Variable + JetBrains Mono via @fontsource.
- Tags use `font-mono`. Headings use `tracking-tight`.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build (output: `dist/`)
- `npm run preview` — Preview production build
