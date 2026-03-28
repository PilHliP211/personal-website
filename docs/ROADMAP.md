# Roadmap

This document tracks planned and potential future work. It is intentionally
opinionated — only features that are genuinely useful for a personal site are
listed. The goal is to stay minimal and extend only when there's a real reason.

---

## Phase 1 — Current (v1)

- [x] Static site with Astro 4 + Tailwind CSS
- [x] MDX blog with content collections and type-safe frontmatter
- [x] Syntax highlighting via Shiki
- [x] Dark / light mode toggle with localStorage persistence
- [x] RSS feed (`/rss.xml`)
- [x] Auto-generated sitemap
- [x] Home, About, Blog, Projects pages
- [x] Responsive layout with sticky header
- [x] GitHub Actions deploy to GitHub Pages
- [x] Custom domain support via CNAME

---

## Phase 2 — Content & discovery

- [ ] **Blog tags** — filter posts by tag; `/blog/tags/[tag]/` listing pages
- [ ] **Reading time** — estimated reading time shown in post header and listings
- [ ] **Open Graph images** — auto-generated OG images per post (Satori or `@vercel/og`)
- [ ] **Pagination** — paginate the blog listing once there are enough posts to need it
- [ ] **Related posts** — show 2–3 related posts at the bottom of each article
- [ ] **Projects page** — richer project cards with screenshots and tech stack badges

---

## Phase 3 — Search

- [ ] **Pagefind** — static full-text search, runs entirely in the browser with no backend
  ([pagefind.app](https://pagefind.app) integrates cleanly with Astro)

---

## Phase 4 — Interaction

- [ ] **Comments via Giscus** — GitHub Discussions-backed commenting, no database, free
  ([giscus.app](https://giscus.app))
- [ ] **Like / reaction button** — lightweight, could be backed by a simple Cloudflare Worker
  or a free-tier service

---

## Phase 5 — Interactive demos

- [ ] **Astro islands with Svelte or Preact** — for components that genuinely need
  client-side reactivity (visualisations, mini tools, calculators)
- [ ] **WebAssembly demos** — for computationally interesting experiments

---

## Considered and deferred

These are out of scope for now but worth noting:

| Feature | Reason deferred |
|---------|-----------------|
| Headless CMS (Decap, Sanity, Contentful) | MDX files in git are sufficient; no CMS needed until collaborators are involved |
| Analytics | Privacy-first choice; will add something self-hosted (Umami, Plausible) if traffic data becomes useful |
| Newsletter | Not enough content volume yet to justify it |
| Server-side rendering / API routes | No dynamic data requirements; static is simpler and cheaper |
| Internationalization | Single language for now |

---

## Contributing to the roadmap

Open an issue or PR to suggest additions, removals, or priority changes.
