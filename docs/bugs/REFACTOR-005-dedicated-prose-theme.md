# REFACTOR-005 - Introduce a dedicated prose theme contract

Status: Completed

## Dependencies

- No dependency
- Foundation for [BUG-002 - Fix prose dark mode and typography override order](./BUG-002-prose-dark-mode.md)

## Description

Using a bare `.prose` override couples the site directly to Tailwind Typography's
generated selector order. A dedicated prose theme class or plugin configuration
would make article styling explicit and less brittle.

## Implementation steps

1. Introduce a dedicated prose theme contract such as `prose-theme` or a custom
   typography modifier.
2. Apply it in
   [src/pages/about.astro](/mnt/c/Users/phill/code/personal-website/src/pages/about.astro)
   and [src/layouts/BlogLayout.astro](/mnt/c/Users/phill/code/personal-website/src/layouts/BlogLayout.astro).
3. Move the existing prose token overrides to the new contract.
4. Verify the plugin default no longer overrides article colors.
