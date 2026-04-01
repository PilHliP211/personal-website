# BUG-005 - Populate or temporarily hide the empty Projects page

Status: Proposed

## Dependencies

- Depends on [REFACTOR-003 - Make projects data-driven](./REFACTOR-003-make-projects-data-driven.md) if the page will stay live and be populated
- Recommended after [REFACTOR-006 - Centralize navigation and page metadata config](./REFACTOR-006-centralize-route-config.md) if the chosen fix is to hide or rework the Projects route

## Description

The Projects page is linked prominently in navigation, but the backing
`projects` array is empty and the page currently renders a placeholder fallback.
That is not a runtime failure, but it is still a user-facing product gap on a
live personal site.

## Implementation steps

1. Decide whether the page should be populated now or temporarily removed from
   navigation until content exists.
2. If the page stays live, add at least one real project entry and verify the
   listing layout.
3. If the page is deferred, remove or hide the Projects nav item and any
   homepage CTA that points to an empty destination.
4. Recheck `/` and `/projects/` after deployment to confirm the chosen behavior.
