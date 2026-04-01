# Contributing

This document explains how to add content and make changes to the site.

---

## Local development

Preferred day-to-day workflow is a Unix shell on macOS, Linux, or WSL2.
Use Node `>=22.12.0` so local behavior matches Astro 6 and the GitHub Actions
build.

```bash
node --version
npm ci
npm run dev      # http://127.0.0.1:4321
```

---

## Testing changes

This repo does not currently ship a dedicated automated browser test suite.
Until one exists, use this baseline before pushing changes:

### 1. Static and content validation

```bash
npx astro check
```

This catches content collection schema errors, route/type issues, and `.astro`
frontmatter mistakes without needing a browser.

### 2. Production build validation

```bash
npm run build
```

Always validate the production build, not just `npm run dev`. Bugs in asset
generation, RSS, sitemap output, and CSS bundling often only show up in the
built site.

### 3. Human visual smoke test

```bash
npm run preview
```

Open the preview in a browser and click through the routes affected by your
change. The default smoke-test set is:

- `/`
- `/about/`
- `/blog/`
- `/blog/hello-world/`
- `/projects/`
- `/rss.xml`
- `/sitemap-index.xml`

For UI or styling work, verify both light and dark mode and check the shared
states that tend to regress first:

- Header/footer borders and active nav state
- Muted text, tags, card backgrounds, and borders
- Buttons, hover states, and focus rings
- Prose pages such as `/about/` and blog posts

If you fix a ticket in `docs/bugs`, update the ticket status and briefly note
how you validated the change.

### 4. Optional screenshot capture

If you want evidence for visual changes, capture screenshots from the local
preview in your browser or a one-off headless run. Keep those artifacts out of
the commit unless the repo explicitly starts tracking them.

If you use disposable directories such as `tmp-codex-screens/`,
`tmp-codex-chrome-profiles/`, or a temporary preview root, delete them before
committing.

### Platform notes

- Preferred path: run the commands above directly on macOS, Linux, or WSL2 with
  a local Node `>=22.12.0` install.
- Windows-specific note: this repo was validated from a Windows/WSL environment
  by building the site with a Unix-side Node 22 runtime, serving `dist/`
  locally, and capturing screenshots with Windows Chrome in headless mode.
- If you are in an older mixed environment such as WSL1, treat that as a
  fallback path only. Prefer WSL2 or a native Unix environment for routine
  development.

### Known mixed-environment failure modes

- WSL1 can fail before Astro even starts. The concrete failure seen during bug
  triage was `WSL 1 is not supported. Please upgrade to WSL 2 or above.`
  followed by `Could not determine Node.js install directory`.
- `cmd.exe /c npm run build` from WSL is not a reliable fallback. In this repo,
  that path failed with `'astro' is not recognized as an internal or external
  command` because the local Windows-side shim resolution did not match the Unix
  workspace.
- A Windows `node.exe` on the machine may still be too old even if it is
  installed and callable. The runtime encountered during validation was
  `v20.15.1`, which does not satisfy Astro 6's `>=22.12.0` requirement.
- Localhost reachability can be asymmetric across the WSL/Windows boundary.
  During validation, Windows Chrome could reach a Windows-side `http.server`
  while Linux-side `curl` could not. If the browser is running on Windows,
  prefer serving the preview from Windows Python or Node on a Windows path.
- Do not use a checked-in `dist/` tree as evidence that the current source is
  correct. Rebuild current source when possible. If you are blocked and need a
  visual-only fallback, create a disposable preview harness, say explicitly what
  was and was not rebuilt, and record that limitation in the bug ticket or PR.

---

## Adding a blog post

1. Create a new file in `src/content/blog/`:

   ```
   src/content/blog/my-post-title.mdx
   ```

   The filename (minus `.mdx`) becomes the URL slug:
   `/blog/my-post-title/`

2. Add the required frontmatter at the top:

   ```mdx
   ---
   title: My Post Title
   description: A one or two sentence summary shown in listings and RSS.
   pubDate: 2026-04-01
   tags: [typescript, web]
   ---

   Your content here...
   ```

3. Run `npm run dev` and visit `/blog/my-post-title/` to preview.

### Frontmatter reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Post title |
| `description` | `string` | Yes | Summary for listings, RSS, and og:description |
| `pubDate` | `YYYY-MM-DD` | Yes | Publication date |
| `updatedDate` | `YYYY-MM-DD` | No | Last updated date (shows in post header) |
| `heroImage` | `string` | No | Path to a hero image, e.g. `/blog/my-image.jpg` |
| `tags` | `string[]` | No | Array of tag strings |
| `draft` | `boolean` | No | Set to `true` to exclude from listings and RSS |

### Working with drafts

Set `draft: true` to write a post without publishing it:

```mdx
---
title: Work in Progress
draft: true
---
```

Draft posts won't appear in the blog listing, home page, or RSS feed.
They will still render at their URL during local dev so you can preview them.

### Adding images to a post

Place images in `public/blog/`:

```
public/blog/my-post-image.jpg
```

Reference them in MDX with a root-relative path:

```mdx
![Alt text](/blog/my-post-image.jpg)
```

### Code blocks

Code blocks use Shiki for syntax highlighting. Specify the language after
the opening triple-backtick:

````mdx
```typescript
const greeting = (name: string) => `Hello, ${name}!`;
```
````

Shiki themes are configured in `astro.config.mjs` under `markdown.shikiConfig`.

---

## Adding a project

Edit `src/data/projects.ts` and add an entry to the `PROJECTS` array:

```ts
export const PROJECTS = [
  {
    title: 'My Project',
    description: 'A short description of what this project does.',
    url: 'https://github.com/yourname/my-project',
    tags: ['TypeScript', 'CLI'],
  },
];
```

---

## Updating navigation and page metadata

Route labels, paths, and shared page metadata live in `src/data/routes.ts`.

- Update `NAV_ROUTES` when navigation items should change
- Update the matching `ROUTES.*` entry when a page title or default description changes
- Reuse those route constants in page files instead of duplicating hard-coded strings

---

## Updating personal information

Most site-wide values are centralized in **`src/site.config.ts`**:

```ts
export const SITE = {
  url: 'https://phillip.byram.dev',
  title: 'Phillip Byram',
  description: 'Personal site and blog.',
  author: 'Phillip Byram',
  github: 'https://github.com/PilHliP211',
} as const;
```

Changing values there automatically propagates to the header, footer, RSS feed,
meta tags, and OG tags across the site.

| What | Where |
|------|-------|
| Name, URL, GitHub link | `src/site.config.ts` |
| Nav items and page metadata | `src/data/routes.ts` |
| Project inventory | `src/data/projects.ts` |
| Custom domain (DNS) | `CNAME` (repo root) |
| About page bio | `src/pages/about.astro` |
| Home page tagline | `src/pages/index.astro` |

---

## Code style

- TypeScript strict mode is enabled. All `.astro` files support TypeScript
  in the `---` frontmatter block.
- Prefer Tailwind utility classes over hand-written CSS unless the styling
  is complex enough to warrant a `<style>` block.
- Prefer `npm ci` over `npm install` for routine work so dependency resolution
  stays aligned with the committed lockfile.
- Avoid adding framework dependencies (React, Svelte, etc.) unless the
  component genuinely requires client-side interactivity that vanilla JS
  can't handle cleanly.
