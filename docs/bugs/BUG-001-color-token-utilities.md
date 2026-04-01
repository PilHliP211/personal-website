# BUG-001 - Generate Tailwind color-token utilities

Status: Completed

## Dependencies

- Depends on [REFACTOR-001 - Consolidate the theme and semantic color contract](./REFACTOR-001-consolidate-theme-contract.md)

## Description

The site templates rely on semantic Tailwind classes such as `text-muted`,
`text-text`, `bg-surface`, `bg-bg`, `border-border`, `border-accent`,
`ring-border`, and `divide-border`, but those selectors are not present in the
deployed stylesheet. This causes colors, borders, chips, nav states, and other
UI states to render inconsistently across the site.

## Resolution

- Exposed the semantic color tokens through Tailwind `@theme` in [src/styles/global.css](/mnt/c/Users/phill/code/personal-website/src/styles/global.css) so utilities like `text-muted`, `bg-surface`, `border-border`, `ring-border`, and `divide-border` are generated.
- Preserved theme switching by overriding the same `--color-*` tokens in `.dark` and the high-contrast media query, which keeps shared components and prose styles aligned with the runtime palette.
- Validated the build output for the expected selectors and visually checked the affected routes in light and dark mode from a Windows/WSL session by serving the built site locally and capturing headless Chrome screenshots.

## Implementation steps

1. Decide whether semantic colors should be exposed through Tailwind `@theme`
   tokens or replaced with explicit semantic CSS classes.
2. Update [src/styles/global.css](/mnt/c/Users/phill/code/personal-website/src/styles/global.css) so the chosen contract produces the classes used by shared components.
3. Rebuild the site and verify the compiled CSS contains selectors for
   `.text-muted`, `.bg-surface`, `.border-border`, `.ring-border`, and
   `.divide-border`.
4. Click through `/`, `/about/`, `/blog/`, `/blog/hello-world/`, and
   `/projects/` in light and dark mode to confirm the palette is applied.
