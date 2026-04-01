# BUG-004 - Replace About page placeholder copy

Status: Proposed

## Dependencies

- No hard code dependency
- Recommended after [REFACTOR-005 - Introduce a dedicated prose theme contract](./REFACTOR-005-dedicated-prose-theme.md) and [BUG-002 - Fix prose dark mode and typography override order](./BUG-002-prose-dark-mode.md)

## Description

The About page is still shipping template placeholders such as
`[what you work on]` and `[email / GitHub / wherever]`. This makes the page
look unfinished and weakens the credibility of the live site.

## Implementation steps

1. Replace the placeholder text in
   [src/pages/about.astro](/mnt/c/Users/phill/code/personal-website/src/pages/about.astro)
   with real biography, current work, toolchain, and contact information.
2. Remove the template-only comment block once the content is complete.
3. Review the finished copy in both light and dark mode because the page uses
   `prose` styles.
4. Confirm the page still reads well on mobile and desktop widths.
