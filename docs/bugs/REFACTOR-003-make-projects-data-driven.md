# REFACTOR-003 - Make projects data-driven

Status: Proposed

## Dependencies

- No dependency
- Foundation for [BUG-005 - Populate or temporarily hide the empty Projects page](./BUG-005-empty-projects-page.md) when the page remains live

## Description

Projects are currently represented by duplicated inline arrays in separate page
files. Moving them into a shared data source or Astro content collection would
remove duplication and make homepage and projects-page rendering stay in sync.

## Implementation steps

1. Choose a source of truth for projects, either `src/data/projects.ts` or a
   `projects` content collection.
2. Move the current inline arrays out of
   [src/pages/index.astro](/mnt/c/Users/phill/code/personal-website/src/pages/index.astro)
   and [src/pages/projects/index.astro](/mnt/c/Users/phill/code/personal-website/src/pages/projects/index.astro).
3. Update both pages to read from the shared source.
4. Document how to add or edit projects in `docs/CONTRIBUTING.md`.
