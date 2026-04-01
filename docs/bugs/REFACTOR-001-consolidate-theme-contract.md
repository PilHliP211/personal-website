# REFACTOR-001 - Consolidate the theme and semantic color contract

Status: Completed

## Dependencies

- No dependency
- Foundation for [BUG-001 - Generate Tailwind color-token utilities](./BUG-001-color-token-utilities.md)

## Description

Styling semantics are currently split across Tailwind `@theme` declarations,
plain CSS custom properties, and templates that expect generated semantic
utility classes. That mixed contract is hard to reason about and is already the
source of production drift.

## Implementation steps

1. Choose a single styling contract for semantic colors.
2. Move all shared color semantics into that contract in
   [src/styles/global.css](/mnt/c/Users/phill/code/personal-website/src/styles/global.css).
3. Update shared components so they consume the contract consistently.
4. Document the contract in `docs/DESIGN_STANDARDS.md` so future changes follow
   the same pattern.
