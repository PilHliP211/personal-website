# REFACTOR-004 - Make theme-toggle initialization idempotent

Status: Proposed

## Dependencies

- No hard dependency
- Recommended after [REFACTOR-001 - Consolidate the theme and semantic color contract](./REFACTOR-001-consolidate-theme-contract.md) and [REFACTOR-005 - Introduce a dedicated prose theme contract](./REFACTOR-005-dedicated-prose-theme.md)

## Description

The theme toggle currently registers a click handler every time
`initThemeToggle()` runs, including after `astro:after-swap`. That is safe only
while the component is initialized once. If the site adds more client-side
navigation behavior later, the toggle can accumulate duplicate listeners.

## Implementation steps

1. Refactor [src/components/ThemeToggle.astro](/mnt/c/Users/phill/code/personal-website/src/components/ThemeToggle.astro)
   so initialization is idempotent.
2. Either guard repeated setup with a data attribute or use a single delegated
   event listener.
3. Keep icon updates and screen-reader announcements separate from listener
   registration.
4. Verify the toggle still works after a full page load and after any Astro swap
   event.
