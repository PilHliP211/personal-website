# BUG-002 - Fix prose dark mode and typography override order

Status: Proposed

## Dependencies

- Depends on [REFACTOR-005 - Introduce a dedicated prose theme contract](./REFACTOR-005-dedicated-prose-theme.md)

## Description

The site defines a custom `.prose` token override, but the deployed CSS still
contains Tailwind Typography's default `.prose` block later in the stylesheet.
That later rule wins in the cascade, so prose-heavy pages use the wrong colors
in dark mode even when the rest of the layout theme is correct.

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
