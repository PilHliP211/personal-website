# Roadmap

Planned and potential work. Stays minimal — only features worth building.

---

## Next Up

- [ ] Fill in About page with real content
- [ ] Add projects to home page and projects page
- [ ] Add real headshot/avatar (replace placeholder)
- [ ] Workshop accent color — test options B/C/D from DESIGN_STANDARDS.md
- [ ] Update meta description and OG image

## Design Enhancements

- [ ] Three-state theme toggle (Light / Dark / System)
- [ ] Fluid typography with `clamp()` values
- [ ] Fluid section spacing with `clamp()`
- [ ] Surface elevation levels (surface-alt, surface-top) for code blocks, header
- [ ] Scrollbar + text selection styling for dark mode
- [ ] Print stylesheet
- [ ] `lg:grid-cols-3` on project grid when projects grow

## Content & Discovery

- [ ] Blog tag pages — `/blog/tags/[tag]/`
- [ ] Reading time estimate on posts
- [ ] "Currently working on..." status line in hero
- [ ] Featured/pinned project on home page
- [ ] Blog post series/collections
- [ ] Social links (GitHub, Twitter/X, email) in hero or footer
- [ ] RSS feed styling
- [ ] OG images — auto-generated per post (Satori or `@vercel/og`)
- [ ] Pagination when post count warrants it
- [ ] Related posts (2-3 at article bottom)
- [ ] Richer project cards with screenshots

## Search

- [ ] Pagefind — static full-text search, browser-only ([pagefind.app](https://pagefind.app))

## Interaction

- [ ] Comments via Giscus (GitHub Discussions-backed)
- [ ] Like / reaction button (Cloudflare Worker or free-tier)

## Performance

- [ ] Astro `<Image>` for automatic srcset/optimization
- [ ] View Transitions API for page navigation
- [ ] Preload critical fonts (Inter 400, 700)
- [ ] Variable font subset for smaller payload

## Future Polish

- [ ] Background texture or pattern (subtle)
- [ ] Gradient accents for special sections
- [ ] Interactive project demos / embeds (Astro islands with Svelte/Preact)
- [ ] WebAssembly demos
- [ ] Dark mode image treatment (brightness filter)
- [ ] Container queries for component-level responsiveness
- [ ] Custom 404 page

---

## Deferred

| Feature | Reason |
|---|---|
| Headless CMS | MDX in git is sufficient |
| Analytics | Will add Umami/Plausible if needed |
| Newsletter | Not enough content volume |
| SSR / API routes | No dynamic requirements |
| i18n | Single language |
