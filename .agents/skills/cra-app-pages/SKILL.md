---
name: cra-app-pages
description: Maintain cra-ps mobile-app support/privacy React routes or the Ukrainian Traffic Rules landing page, including store badges, screenshots, and accessible motion.
---

# App pages and Traffic Rules

Read `docs/engineering-rules.md`, the existing page and its tests. Product copy
must follow supplied facts and current app behavior, not assumptions from another
app or the website analytics configuration.

- English support/privacy routes for Homa, IdioMate, UVly, and Traffic Rules live
  in `src/app/(en)/<app>/`. Preserve public URLs, app-specific metadata/viewport,
  support email, and reciprocal support/privacy links.
- These are React pages using `src/app/app-store-page.module.scss`; do not restore
  removed public Markdown copies. Homa, IdioMate, and UVly root pages redirect;
  exclude redirect-only roots from the sitemap.
- `/traffic-rules` is Ukrainian, under `src/app/(uk)/traffic-rules/`. Keep its
  screenshots, verified store links, official Ukrainian badges and legal
  attribution consistent. Assets live in `public/traffic-rules/`. Check current
  official store guidelines before modifying badge presentation.
- Preserve server-rendered landing content. `MotionEffects.tsx` owns the small
  client boundary; `motion.mjs` contains pure, bounded phone-parallax calculations.
  Keep reduced motion, no-observer fallback, passive scroll handling, animation
  frame coalescing, and cleanup. Essential content must remain readable without JS.

Run `npm test` for built pages and existing app/motion coverage. Relevant tests:
`app-store-pages.test.mjs`, `uvly-privacy-policy.test.mjs`,
`traffic-rules-motion.test.mjs`, and `seo-build.test.mjs`. For visual/motion changes,
also inspect mobile and desktop layouts, store destinations, keyboard focus and
reduced motion in the browser. Source-string assertions alone do not establish
that the page looks or behaves correctly.
