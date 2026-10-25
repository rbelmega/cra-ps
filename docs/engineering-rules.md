# Engineering rules

## Rendering and styling

- Keep portfolio, blog, and app content server-rendered/static where possible.
  Isolate browser effects in small client components, as in `MotionEffects.tsx`.
- Use TypeScript, SCSS Modules, and existing shared app-page styles. Let Biome
  determine formatting; do not add another formatter or UI library for a small change.
- Use the current static rendering model. A previous dependency review found no
  need for Cache Components; reconsider only for a concrete dynamic-data requirement.
- Production builds use Webpack (`npm run build`); development uses Next's default
  bundler. Changes to aliases must account for both `webpack` and `turbopack` config.
- Preserve the modern-browser baseline in `package.json` and the custom polyfill
  aliases. Recheck built bundles when upgrading Next.js: these use an internal path.

## Public content and SEO

- Canonical origin comes from `src/domain/seo.ts`, independent of preview hosts.
  `NEXT_PUBLIC_SITE_URL` controls only the public-content remote fallback origin.
- Blog catalog: `public/posts.json`; bodies: `public/posts/*.md`. Keep IDs and
  slugs stable, legacy numeric redirects working, and internal Markdown links
  routed through `rewriteMarkdownHref`.
- Keep per-page titles, descriptions, canonicals, Open Graph/Twitter metadata,
  actual social images, HTML language, sitemap, and robots consistent. Sitemap
  entries represent canonical pages, not redirects or missing URLs.
- Support/privacy pages are React routes. Do not recreate removed app Markdown
  sources. App-specific claims must match supplied product facts; website Google
  Analytics does not establish that a mobile app uses analytics.
- Keep official store badges intact and preserve verified store destinations.
  Check current publisher guidelines when changing badge presentation.

## Performance and accessibility

- Homepage budgets are enforced in `test/homepage-performance.test.mjs`: at most
  24 KiB of preloaded fonts and 140,000 gzip bytes of initial modern-browser JS.
  Do not relax budgets simply to make a regression pass.
- Preserve font subset/full-font fallbacks, portrait dimensions/responsive
  variants, and the certification arrow's system-font fallback. Regeneration is
  documented in [performance assets](performance-assets.md).
- `/assets/*` is cached immutable for a year. Give changed assets a new URL when
  stale cached content would matter; adjust all references together.
- Analytics runs only in production with a valid `G-…` ID. Keep the external
  library on `lazyOnload` and initialization on `afterInteractive` unless the task
  explicitly changes that tradeoff. Check event delivery when changing timing.
- Preserve visible focus, contrast, semantic headings, image alternatives, and
  accessible link names. Motion must honor `prefers-reduced-motion`, remain bounded,
  clean up listeners/observers/frames, and leave content readable without effects.

## Measurements and maintenance

- Distinguish local Lighthouse, deployed/preview Lighthouse, Google PageSpeed lab,
  and real-user field data. Identify URL, tested revision when known, analytics
  setting, browser/Lighthouse versions, throttling, and successful run count.
- Compare repeated runs under equivalent conditions. Report medians and range;
  exclude failed runs with a reason. One score of 100 is not proof of stable 100.
- Keep reports in ignored `lighthouse-reports/`. Do not commit generated builds,
  browser binaries, local environment settings, or private credentials.
- Upgrade dependencies with `package-lock.json`; inspect current stable versions,
  peer requirements, and migration notes. Avoid `npm audit fix --force` and unrelated
  framework migrations. Preserve the reason for the PostCSS override until verified
  unnecessary. Validate the final dependency tree with the existing checks.
- `npm run analyze` uses source maps, while production source maps are currently
  disabled. Use an intentional temporary diagnostic configuration if needed and
  restore it before delivery; do not promise that command works unchanged.
