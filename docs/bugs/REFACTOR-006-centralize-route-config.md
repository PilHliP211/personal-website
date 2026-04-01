# REFACTOR-006 - Centralize navigation and page metadata config

Status: Proposed

## Dependencies

- No hard dependency
- Recommended before [BUG-005 - Populate or temporarily hide the empty Projects page](./BUG-005-empty-projects-page.md) if navigation changes are part of that fix

## Description

Navigation items and page metadata defaults are scattered across page files and
components. A small shared route config would make navigation changes, labels,
and common metadata easier to keep consistent.

## Implementation steps

1. Add a shared route config module that defines nav items and any common page
   metadata defaults.
2. Move the nav link list out of
   [src/components/Nav.astro](/mnt/c/Users/phill/code/personal-website/src/components/Nav.astro).
3. Use the config in layout or page files where metadata patterns repeat.
4. Document how to add or remove routes so navigation and page metadata stay in
   sync.
