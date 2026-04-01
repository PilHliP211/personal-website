# Architecture

## Why Astro

The previous site was Angular 18 with SSR deployed to Google Cloud Run. That
works, but it's operational overhead for a personal site that has no dynamic
server-side requirements. A static site generator eliminates the server entirely.

Astro was chosen over the alternatives for these reasons:

**Zero JavaScript by default.** Astro's output is HTML and CSS. JavaScript only
ships for components that explicitly opt into it via `client:` directives
(the "islands" model). A blog post is just HTML — no React tree to hydrate, no
framework runtime to download.

**First-class content collections.** `src/content/blog/*.mdx` files are
type-checked at build time using a Zod schema defined in `src/content/config.ts`.
Missing or mistyped frontmatter fields cause a build error, not a silent data
bug at runtime.

**MDX support.** Posts are Markdown with optional component imports. This
allows rich embeds (code playgrounds, custom callouts, interactive charts)
without baking complexity into the base build.

**Composable integrations.** Tailwind, MDX, and sitemap generation are first-party
integrations that each take one line in `astro.config.mjs`. Adding more later
(image optimization, a UI framework, a CMS adapter) follows the same pattern.

**GitHub Pages first-class support.** The `astro build` output is a flat
directory of HTML/CSS/JS files that GitHub Pages can serve natively. The
official `actions/deploy-pages` action handles the upload. No adapter, no
separate deploy tool.

### Why not Next.js

Next.js works fine for static sites but ships more complexity than needed:
the React runtime, hydration, and a `_next/` asset directory that requires
a `.nojekyll` workaround for GitHub Pages. Static export in Next.js also
disables image optimization.

### Why not SvelteKit

An excellent framework, and the right choice if Svelte is already in use here.
Starting from scratch with Astro is simpler because Astro's syntax (`---` front
matter, HTML templates) has almost no learning curve for someone who knows HTML.

### Why not Hugo or Jekyll

Both are mature and fast, but neither offers TypeScript, MDX, or a component
model. Jekyll is natively supported by GitHub Pages but is constrained by Ruby's
Liquid templating. Hugo requires learning Go templates. Astro is the better
foundation for a site that may add interactive elements over time.

---

## Folder structure rationale

```
src/
├── components/   One file per component. No sub-folders until there are enough
│                 components to warrant grouping (roughly >10).
│
├── content/      Astro's content layer. Only blog posts live here for now.
│   └── blog/     Each .mdx file is a post. The filename becomes the URL slug.
│
├── layouts/      BaseLayout wraps every page (HTML shell, head, header, footer).
│                 BlogLayout extends BaseLayout with article-specific chrome.
│
├── pages/        File-based routing. Every file here becomes a URL.
│   ├── blog/     /blog/ → index.astro; /blog/:slug/ → [...slug].astro
│   └── projects/ /projects/ → index.astro
│
└── styles/       global.css is the single global stylesheet. Component-scoped
                  styles live in <style> blocks inside .astro files.
```

---

## Dark mode

Class-based (`darkMode: 'class'` in Tailwind config). When `<html>` has the
`dark` class, all `dark:` Tailwind variants activate.

The `BaseLayout.astro` `<head>` contains a render-blocking inline script
(not `defer`, not `type="module"`) that reads `localStorage` and applies the
`dark` class before the first paint. This prevents a flash of the wrong theme.

The `ThemeToggle` component button toggles the class and persists the choice
to `localStorage`. On the next page load, the inline script picks it up again.

---

## CSS architecture

`src/styles/global.css` imports Tailwind's base, components, and utilities
layers. It defines the shared semantic color contract with Tailwind `@theme`
variables (for example `--color-bg`, `--color-text`, and `--color-accent`) so
utilities such as `bg-surface`, `text-muted`, and `border-border` are generated
from the same token names the runtime theme switch uses.

Light-mode values are the default theme values. `.dark` and high-contrast
overrides update those same `--color-*` variables in the cascade so both
Tailwind utilities and hand-written CSS stay on one contract.

Component-scoped styles (used sparingly) live in `<style>` blocks inside
individual `.astro` files and are automatically scoped by Astro's build step.

---

## RSS feed

`src/pages/rss.xml.ts` is an Astro API endpoint. It queries the blog content
collection, filters drafts, and returns an RSS 2.0 XML response via
`@astrojs/rss`. The `site` value in `astro.config.mjs` must be set to a real
domain for the RSS canonical URLs to be valid.
