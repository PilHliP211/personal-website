# Contributing

This document explains how to add content and make changes to the site.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
```

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
- Avoid adding framework dependencies (React, Svelte, etc.) unless the
  component genuinely requires client-side interactivity that vanilla JS
  can't handle cleanly.
