---
name: cra-content-seo
description: Update cra-ps blog content, article routing, metadata, canonical URLs, sitemap, robots, or social-preview images while preserving existing public links.
---

# Content and SEO

Read `docs/engineering-rules.md`. Trace the relevant files before editing:

- `public/posts.json`, `public/posts/*.md`, `src/domain/blog.ts`: catalog, bodies,
  stable `id` and `slug`, and generated article URLs.
- `src/domain/public-content.ts`: server-only local reads with remote fallback,
  one-hour revalidation, and safe fallback values. `USE_LOCAL_POSTS` is obsolete.
- `src/domain/markdown-href.ts`: legacy Markdown links, fragments, query strings,
  external URLs, mail and telephone links.
- `src/domain/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `next.config.ts`:
  fixed production canonicals, discoverability, and numeric article redirects.
- `src/app/(en)/blog/[slug]/`: metadata, static params, article navigation,
  unknown-slug handling, and per-article social preview.

For a new post, add its real metadata and body together; choose a unique stable ID
and slug, then check static params, sitemap inclusion, preview generation, and
adjacent-post navigation. Preserve existing public addresses unless a redirect is
part of the requested change.

Keep English/Ukrainian language ownership in route-group layouts and shared
`Document`; groups do not create `/en` or `/uk` prefixes. Preserve honest author
details, certifications, and product claims instead of inventing facts.

Verify with `npm test` (includes a build). `test/seo-build.test.mjs` covers built
HTML metadata, language, global 404, canonical-only sitemap, 308 legacy redirects,
and actual 1200×630 PNG social images. If Markdown rewriting changes, exercise
affected link forms, including query/fragment preservation. Browser-check layout
when content affects visual presentation.
