---
name: cra-performance
description: Measure or improve cra-ps Lighthouse/PageSpeed results, homepage payload budgets, fonts, portraits, or analytics loading. Use for performance work rather than ordinary page copy edits.
---

# Portfolio performance

Read `docs/engineering-rules.md` and `docs/performance-assets.md` from the repository
root. Relevant code: components `Document.tsx`, `App.tsx`, `Bio.tsx`,
`next.config.ts`, and `test/homepage-performance.test.mjs`.

1. Establish the target: localhost, preview, or production; mobile or desktop;
   local Lighthouse or a supplied PageSpeed report. Read the supplied report before
   explaining its score. Do not replace a production question with a local result.
2. Record a baseline before changing code. `npm run lighthouse` builds and runs
   three local audits per URL/profile. `npm run lighthouse:production` runs three
   mobile audits on the deployed homepage; it does not deploy local edits. Read
   `lighthouserc*.cjs`; save reports in ignored `lighthouse-reports/`. Set
   `CHROME_PATH` or `.lighthouse-browser.json` when needed.
3. Inspect LCP element/timing, render-blocking assets, font preloads, long tasks,
   and third-party requests. Compare equivalent browser versions, throttling and
   analytics settings; heavy local CPU load can invalidate comparisons. Failed
   NO_FCP runs provide no usable score.
4. Make a focused change while preserving the 24 KiB font/140,000-byte gzip JS
   budgets and full character fallbacks. Keep original TTF/JPEG sources and follow
   the asset regeneration reference rather than inventing a new pipeline.
5. Run relevant tests with a fresh build and repeat comparable measurements.
   When changing Analytics timing, also verify request timing and page_view
   delivery using the configured measurement ID; do not invent an ID.

Report tested URLs, known revision, environment/analytics, run count, median/range,
LCP/CLS/TBT and report locations. Label historical results as historical. Local or
preview gains do not prove production gains; measure the changed production
version after deployment. Field-data claims require actual field evidence.
