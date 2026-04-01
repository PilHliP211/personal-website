# BUG-001 - Generate Tailwind color-token utilities

Status: Proposed

## Dependencies

- Depends on [REFACTOR-001 - Consolidate the theme and semantic color contract](./REFACTOR-001-consolidate-theme-contract.md)

## Description

The site templates rely on semantic Tailwind classes such as `text-muted`,
`text-text`, `bg-surface`, `bg-bg`, `border-border`, `border-accent`,
`ring-border`, and `divide-border`, but those selectors are not present in the
deployed stylesheet. This causes colors, borders, chips, nav states, and other
UI states to render inconsistently across the site.

## Implementation steps

1. Decide whether semantic colors should be exposed through Tailwind `@theme`
   tokens or replaced with explicit semantic CSS classes.
2. Update [src/styles/global.css](/mnt/c/Users/phill/code/personal-website/src/styles/global.css) so the chosen contract produces the classes used by shared components.
3. Rebuild the site and verify the compiled CSS contains selectors for
   `.text-muted`, `.bg-surface`, `.border-border`, `.ring-border`, and
   `.divide-border`.
4. Click through `/`, `/about/`, `/blog/`, `/blog/hello-world/`, and
   `/projects/` in light and dark mode to confirm the palette is applied.
