# BUG-002 - Fix prose dark mode and typography override order

Status: Completed

## Dependencies

- Depends on [REFACTOR-005 - Introduce a dedicated prose theme contract](./REFACTOR-005-dedicated-prose-theme.md)

## Description

The site defines a custom `.prose` token override, but the deployed CSS still
contains Tailwind Typography's default `.prose` block later in the stylesheet.
That later rule wins in the cascade, so prose-heavy pages use the wrong colors
in dark mode even when the rest of the layout theme is correct.

## Resolution

- The prose tokens now live behind a dedicated `.prose.prose-theme` contract in [src/styles/global.css](/mnt/c/Users/phill/code/personal-website/src/styles/global.css), which keeps the semantic prose palette from being overridden by Tailwind Typography's default `.prose` output.
- [src/pages/about.astro](/mnt/c/Users/phill/code/personal-website/src/pages/about.astro) and [src/layouts/BlogLayout.astro](/mnt/c/Users/phill/code/personal-website/src/layouts/BlogLayout.astro) both opt into that contract with `prose-theme`, so `/about/` and blog posts share the same explicit prose theme behavior.
- Visual validation was performed with a disposable local preview harness rooted in the current prose markup and the site CSS, served from Windows Python because `npm run build` is still blocked by WSL1 in this environment. Headless Chrome screenshots confirmed `/about/` and `/blog/hello-world/` render with the intended prose colors in light and dark mode, and an additional prose QA page verified links, lists, quote borders, and code blocks against the same token set.

## Implementation steps

1. Move prose theming to a rule that cannot be overridden by the plugin's
   default `.prose` output, or configure the plugin so the intended palette is
   emitted last.
2. Update prose consumers in
   [src/pages/about.astro](/mnt/c/Users/phill/code/personal-website/src/pages/about.astro)
   and [src/layouts/BlogLayout.astro](/mnt/c/Users/phill/code/personal-website/src/layouts/BlogLayout.astro)
   if a new prose class name is introduced.
3. Rebuild and verify `/about/` and `/blog/hello-world/` render correctly in
   both light and dark mode.
4. Confirm code blocks, links, lists, and quote borders still use the intended
   tokens.
