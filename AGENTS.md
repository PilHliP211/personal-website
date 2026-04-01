# Workspace Notes

```
src/
├── components/       Astro components (Header, Nav, Footer, BlogCard, ThemeToggle)
├── content/blog/     MDX blog posts (filename = URL slug)
├── layouts/          BaseLayout (page shell), BlogLayout (article wrapper)
├── pages/            File-based routing (index, about, blog/, projects/)
├── styles/           global.css — all tokens, animations, base styles
└── site.config.ts    Site metadata (title, author, github URL)
docs/
├── ARCHITECTURE.md   Tech stack rationale
├── DESIGN_STANDARDS.md  Color, typography, spacing, component specs
├── ROADMAP.md        Planned features
├── DEPLOYMENT.md     GitHub Pages deploy
└── CONTRIBUTING.md   Contribution guidelines
```

## Testing Notes

- Use `docs/CONTRIBUTING.md` for the full validation workflow.
- Prefer macOS, Linux, or WSL2 with Node `>=22.12.0` for `npx astro check`, `npm run build`, and `npm run preview`.
- Do not treat checked-in `dist/` output as proof of current source behavior. It can be stale relative to `src/`.
- In mixed WSL1/Windows setups, Linux-side Astro builds may fail and Windows-side `npm run build` may not resolve local shims cleanly. Use that path only as a fallback and document the limitation.
- If browser validation must run from Windows, serve a disposable preview from the Windows side and keep temp preview roots, Chrome profiles, and screenshots out of commits.
