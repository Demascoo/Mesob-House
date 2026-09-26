# Failure Checks

## Six failure checks

1. Direct URL load — every route renders, guards redirect, 404 for bad URLs.
2. Refresh mid-flow — cart survives a refresh.
3. Network failure — offline shows a message, never a blank screen.
4. Component crash — the page shows the fallback, the shell survives.
5. Empty state — checkout with an empty cart shows an empty state, no fee.
6. Form validation — empty submit shows Zod errors, corrections clear them.

## Keyboard pass

Tab through every interactive element. Enter activates. Shift+Tab cycles
backward. No focus traps.

## Greyscale pass

Screenshot each page. Convert to greyscale. Confirm:

- Error messages are readable without colour
- Button labels stand alone
- Icons have nearby text labels
