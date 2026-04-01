# BUG-003 - Add missing favicon and default Open Graph image

Status: Proposed

## Dependencies

- No code dependency
- Can be implemented independently of the theme and content refactors

## Description

The shared layout references `/favicon.ico` and defaults page social metadata to
`/og-default.png`, but neither asset exists in `public/`. Both URLs currently
return a GitHub Pages 404 response in production.

## Implementation steps

1. Add `public/favicon.ico` and `public/og-default.png`.
2. Verify the assets match the intended brand treatment and dimensions.
3. Rebuild and confirm both URLs load directly in the deployed site.
4. Recheck page source to ensure the favicon and OG image tags resolve to valid
   assets.
