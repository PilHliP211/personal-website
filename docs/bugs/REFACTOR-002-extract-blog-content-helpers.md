# REFACTOR-002 - Extract shared blog content helpers

Status: Proposed

## Dependencies

- No dependency
- Can be implemented independently of the theme and asset work

## Description

The "load published blog posts and sort newest first" logic is repeated across
the homepage, blog index, RSS feed, and blog route generation. Centralizing
that logic would make the content pipeline easier to maintain and less likely to
drift.

## Implementation steps

1. Add a shared helper module such as `src/lib/content.ts`.
2. Move the published-post filtering and sort logic out of
   [src/pages/index.astro](/mnt/c/Users/phill/code/personal-website/src/pages/index.astro),
   [src/pages/blog/index.astro](/mnt/c/Users/phill/code/personal-website/src/pages/blog/index.astro),
   and [src/pages/rss.xml.ts](/mnt/c/Users/phill/code/personal-website/src/pages/rss.xml.ts).
3. Use the helper in `getStaticPaths()` where it makes sense for post route
   generation.
4. Add a single well-named exported function for "all published posts" and keep
   page-level slicing local.
