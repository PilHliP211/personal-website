# Live Site Audit

Date: 2026-03-31
Site: `https://phillip.byram.dev`

## Scope

I audited the deployed site by fetching live HTML/CSS and comparing it to the current Astro source.

Tested routes:

- `/`
- `/about/`
- `/blog/`
- `/blog/hello-world/`
- `/projects/`
- `/rss.xml`
- `/sitemap-index.xml`
- `/favicon.ico`
- `/og-default.png`

Constraint:

- Local `npm run build` could not be executed in this environment because Node is failing under WSL1, so this audit is based on the deployed output plus source inspection.

## Route Inventory

| Route | Result | Notes |
| --- | --- | --- |
| `/` | Loads | Shared color-token styling is partially broken. |
| `/about/` | Loads | Shared styling issues plus placeholder copy and prose dark-mode problems. |
| `/blog/` | Loads | Shared color-token styling issues. |
| `/blog/hello-world/` | Loads | Shared styling issues plus prose dark-mode problems. |
| `/projects/` | Loads | Shared styling issues; page is still empty placeholder content. |
| `/rss.xml` | Loads | Feed content looks valid. |
| `/sitemap-index.xml` | Loads | Sitemap index resolves correctly. |
| `/favicon.ico` | 404 | GitHub Pages "File not found" response. |
| `/og-default.png` | 404 | GitHub Pages "File not found" response. |

## Findings

### P1 - Tailwind color-token utilities are not being generated

Affected routes:

- `/`
- `/about/`
- `/blog/`
- `/blog/hello-world/`
- `/projects/`

Evidence:

- The source defines only fonts inside `@theme` in [src/styles/global.css](/mnt/c/Users/phill/code/personal-website/src/styles/global.css#L12), while the color tokens live in `:root` and `.dark` later in the file at [src/styles/global.css](/mnt/c/Users/phill/code/personal-website/src/styles/global.css#L19) and [src/styles/global.css](/mnt/c/Users/phill/code/personal-website/src/styles/global.css#L32).
- The templates rely heavily on generated utilities such as `text-muted`, `text-text`, `bg-surface`, `bg-bg`, `border-border`, `border-accent`, `ring-border`, and `divide-border` in [src/components/Header.astro](/mnt/c/Users/phill/code/personal-website/src/components/Header.astro#L7), [src/components/Nav.astro](/mnt/c/Users/phill/code/personal-website/src/components/Nav.astro#L21), [src/components/ThemeToggle.astro](/mnt/c/Users/phill/code/personal-website/src/components/ThemeToggle.astro#L5), [src/components/BlogCard.astro](/mnt/c/Users/phill/code/personal-website/src/components/BlogCard.astro#L20), [src/pages/index.astro](/mnt/c/Users/phill/code/personal-website/src/pages/index.astro#L27), [src/layouts/BlogLayout.astro](/mnt/c/Users/phill/code/personal-website/src/layouts/BlogLayout.astro#L26), and [src/pages/projects/index.astro](/mnt/c/Users/phill/code/personal-website/src/pages/projects/index.astro#L20).
- The deployed homepage HTML contains many of those classes, but the compiled live stylesheet does not contain selectors for `.text-muted` or `.bg-surface`. I verified this by saving the deployed CSS locally and running `grep -bo -- '.text-muted' /tmp/phill-base.css` and `grep -bo -- '.bg-surface' /tmp/phill-base.css`, both of which returned no matches.

Impact:

- Muted text, surface backgrounds, border colors, chip fills, active nav state, avatar ring, and several button/card states fall back to default browser or inherited styling instead of the intended palette.
- This explains the "some of the colors are off" behavior across the whole site, not just one page.

Likely root cause:

- Tailwind can only generate those utilities from tokens exposed through `@theme`. Right now the markup expects theme color utilities that never make it into the compiled CSS.

### P1 - Tailwind Typography is overriding the custom prose palette, which breaks dark mode on prose-heavy pages

Affected routes:

- `/about/`
- `/blog/hello-world/`

Evidence:

- The intended prose override is defined at [src/styles/global.css](/mnt/c/Users/phill/code/personal-website/src/styles/global.css#L91).
- Prose markup is used by [src/pages/about.astro](/mnt/c/Users/phill/code/personal-website/src/pages/about.astro#L10) and [src/layouts/BlogLayout.astro](/mnt/c/Users/phill/code/personal-website/src/layouts/BlogLayout.astro#L66).
- In the deployed CSS, the custom prose block appears earlier than the plugin default. I verified this by checking byte offsets in the compiled stylesheet:
  - `.prose{--tw-prose-body:var(--color-text)` appears at byte `31309`
  - `.prose{--tw-prose-body:oklch(` appears later at byte `41259`

Impact:

- The page shell can switch themes, but the long-form article typography gets reset back to Tailwind Typography's default light palette.
- That makes dark mode look specifically wrong on the About page and blog post page even when the rest of the layout toggles.

Likely root cause:

- The custom `.prose` override is being emitted before the plugin's default `.prose` rule, so the later default wins in the cascade.

### P2 - The favicon and default Open Graph image are both broken in production

Affected routes:

- All HTML pages that use the shared layout

Evidence:

- The shared layout references `/favicon.ico` at [src/layouts/BaseLayout.astro](/mnt/c/Users/phill/code/personal-website/src/layouts/BaseLayout.astro#L23).
- The shared layout defaults `ogImage` to `/og-default.png` at [src/layouts/BaseLayout.astro](/mnt/c/Users/phill/code/personal-website/src/layouts/BaseLayout.astro#L13).
- The repo only contains [public/avatar.png](/mnt/c/Users/phill/code/personal-website/public/avatar.png); there is no `favicon.ico` or `og-default.png` in `public/`.
- Fetching `https://phillip.byram.dev/favicon.ico` and `https://phillip.byram.dev/og-default.png` returns the GitHub Pages 404 page.

Impact:

- Browsers request a missing favicon on every page load.
- Social previews that rely on the default OG image will be broken.

### P2 - The About page is still shipping placeholder copy

Affected route:

- `/about/`

Evidence:

- Placeholder content is still present in [src/pages/about.astro](/mnt/c/Users/phill/code/personal-website/src/pages/about.astro#L13).
- The deployed About page still contains:
  - `[what you work on]`
  - `[Describe your current projects, job, or interests here.]`
  - `[Language / framework you use most]`
  - `[email / GitHub / wherever]`

Impact:

- The page reads as unfinished template content instead of a real biography/contact page.

### P3 - The Projects page is live in navigation but intentionally empty

Affected route:

- `/projects/`

Evidence:

- The `projects` array is empty in [src/pages/projects/index.astro](/mnt/c/Users/phill/code/personal-website/src/pages/projects/index.astro#L5).
- The live page renders the fallback "Projects coming soon" copy from [src/pages/projects/index.astro](/mnt/c/Users/phill/code/personal-website/src/pages/projects/index.astro#L27).

Impact:

- Visitors can navigate to Projects, but the page does not yet inventory any work.

## Healthy Items

- `/rss.xml` is present and returns the current post feed.
- `/sitemap-index.xml` is present and points to the generated sitemap.
- Canonical URLs and page titles looked consistent across the tested HTML routes.

## Ticket Index

### Bugs

- [BUG-001 - Generate Tailwind color-token utilities](./BUG-001-color-token-utilities.md)
- [BUG-002 - Fix prose dark mode and typography override order](./BUG-002-prose-dark-mode.md)
- [BUG-003 - Add missing favicon and default Open Graph image](./BUG-003-missing-favicon-and-og-image.md)
- [BUG-004 - Replace About page placeholder copy](./BUG-004-about-placeholder-content.md)
- [BUG-005 - Populate or temporarily hide the empty Projects page](./BUG-005-empty-projects-page.md)

### Refactors

- [REFACTOR-001 - Consolidate the theme and semantic color contract](./REFACTOR-001-consolidate-theme-contract.md)
- [REFACTOR-002 - Extract shared blog content helpers](./REFACTOR-002-extract-blog-content-helpers.md)
- [REFACTOR-003 - Make projects data-driven](./REFACTOR-003-make-projects-data-driven.md)
- [REFACTOR-004 - Make theme-toggle initialization idempotent](./REFACTOR-004-idempotent-theme-toggle.md)
- [REFACTOR-005 - Introduce a dedicated prose theme contract](./REFACTOR-005-dedicated-prose-theme.md)
- [REFACTOR-006 - Centralize navigation and page metadata config](./REFACTOR-006-centralize-route-config.md)

## Recommended Implementation Order

1. [REFACTOR-001 - Consolidate the theme and semantic color contract](./REFACTOR-001-consolidate-theme-contract.md)
2. [BUG-001 - Generate Tailwind color-token utilities](./BUG-001-color-token-utilities.md)
3. [REFACTOR-005 - Introduce a dedicated prose theme contract](./REFACTOR-005-dedicated-prose-theme.md)
4. [BUG-002 - Fix prose dark mode and typography override order](./BUG-002-prose-dark-mode.md)
5. [REFACTOR-004 - Make theme-toggle initialization idempotent](./REFACTOR-004-idempotent-theme-toggle.md)
6. [BUG-003 - Add missing favicon and default Open Graph image](./BUG-003-missing-favicon-and-og-image.md)
7. [REFACTOR-002 - Extract shared blog content helpers](./REFACTOR-002-extract-blog-content-helpers.md)
8. [REFACTOR-003 - Make projects data-driven](./REFACTOR-003-make-projects-data-driven.md)
9. [REFACTOR-006 - Centralize navigation and page metadata config](./REFACTOR-006-centralize-route-config.md)
10. [BUG-004 - Replace About page placeholder copy](./BUG-004-about-placeholder-content.md)
11. [BUG-005 - Populate or temporarily hide the empty Projects page](./BUG-005-empty-projects-page.md)

## Dependencies

### Hard dependencies

- [BUG-001 - Generate Tailwind color-token utilities](./BUG-001-color-token-utilities.md) depends on [REFACTOR-001 - Consolidate the theme and semantic color contract](./REFACTOR-001-consolidate-theme-contract.md)
- [BUG-002 - Fix prose dark mode and typography override order](./BUG-002-prose-dark-mode.md) depends on [REFACTOR-005 - Introduce a dedicated prose theme contract](./REFACTOR-005-dedicated-prose-theme.md)
- [BUG-005 - Populate or temporarily hide the empty Projects page](./BUG-005-empty-projects-page.md) depends on [REFACTOR-003 - Make projects data-driven](./REFACTOR-003-make-projects-data-driven.md) if the page remains live and is populated

### Soft sequencing

- [REFACTOR-004 - Make theme-toggle initialization idempotent](./REFACTOR-004-idempotent-theme-toggle.md) should follow the theme-contract and prose-theme work because it touches the same theme behavior
- [BUG-004 - Replace About page placeholder copy](./BUG-004-about-placeholder-content.md) is safest after the prose-theme and prose dark-mode fixes so final copy is reviewed in the correct styles
- [REFACTOR-006 - Centralize navigation and page metadata config](./REFACTOR-006-centralize-route-config.md) should happen before [BUG-005 - Populate or temporarily hide the empty Projects page](./BUG-005-empty-projects-page.md) if the chosen fix is to hide or rework the Projects route in navigation
