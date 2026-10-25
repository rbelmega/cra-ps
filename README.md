# Personal Portfolio Website

Rostyslav Belmeha’s portfolio and Markdown blog at [belmeha.com](https://www.belmeha.com),
plus public marketing, support, and privacy pages for Homa, IdioMate, UVly, and
Traffic Rules. The portfolio and app documents are in English; the Traffic Rules
landing page is in Ukrainian.

## Stack and architecture

- Next.js 16.4.3 App Router, React 19.3.1, TypeScript 7.0.2; exact dependencies and
  commands live in `package.json` and `package-lock.json`.
- Server-rendered/static pages with small client boundaries for browser effects.
- SCSS Modules, shared app-document styles, Biome linting/formatting.
- Markdown articles rendered with `react-markdown`, `remark-gfm`, and `rehype-highlight`.
- Local fonts and responsive WebP portraits; optional deferred Google Analytics.
- Webpack production build; Next’s default development bundler.

```text
AGENTS.md                       Project instructions and workflow entry point
.agents/skills/                 Four reusable, project-specific skills
.codex/config.toml              Project-only Superpowers override
.codex/agents/                  Optional reviewer and performance auditor
src/
├── app/
│   ├── (en)/                   Portfolio, blog/[slug], app support/privacy pages
│   ├── (uk)/traffic-rules/      Ukrainian landing page and client motion effects
│   ├── social-preview/         Homepage social image
│   ├── sitemap.ts              Canonical public pages and articles
│   ├── robots.ts
│   └── global-not-found.tsx
├── components/                 Document, portfolio sections, Markdown renderer
├── domain/                     Blog catalog, public-content loading, SEO, contacts
└── polyfills/                  Modern-browser replacement for Next polyfills
public/
├── posts.json                  Article catalog: id, slug, name, date, file, etc.
├── posts/                      Markdown article bodies
├── bio.json                    Portfolio content
├── assets/                     Original fonts/images and derived serving formats
└── traffic-rules/              Screenshots, app icon, official store badges
test/                           Node test runner: built SEO, app pages, budgets, motion
docs/                           Engineering rules and asset regeneration reference
```

Route groups `(en)` and `(uk)` do not appear in public URLs. `/traffic-rules` is
Ukrainian; its `/support` and `/privacy-policy` pages are English. Homa, IdioMate,
and UVly root routes redirect to their privacy pages. Blog URLs use stable slugs;
legacy `/blog/<id>` URLs permanently redirect to the matching article.

## Local development

Use a Node.js version supported by the installed Next.js release and npm. Install
exact locked dependencies and start development:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). For a production server:

```sh
npm run build
npm start
```

Optional `.env.local` settings:

```dotenv
NEXT_PUBLIC_GOOGLE_ANALYTICS_V4=G-YOURID
NEXT_PUBLIC_SITE_URL=https://www.belmeha.com
```

Analytics is enabled only in production with a valid measurement ID. The external
library uses `lazyOnload` after the load event and during idle time; initialization
uses `afterInteractive` so events can queue. Very short visits may not be recorded.

Public content is read from `public/` on the server first, with remote fallback to
`NEXT_PUBLIC_SITE_URL` (default `https://www.belmeha.com`) and one-hour revalidation.
This variable does **not** change canonical URLs: `src/domain/seo.ts` fixes them to
the production origin. The former `USE_LOCAL_POSTS` setting is no longer used.

## Commands and checks

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build production with Webpack |
| `npm start` | Serve the production build |
| `npm run lint -- --error-on-warnings` | Lint with Biome, treating warnings as failures |
| `npm run format:check` | Check supported source formatting |
| `npm run format` | Write formatting changes; review the resulting diff |
| `npm test` | Build production, then run `test/*.test.mjs` |
| `npm run lighthouse` | Build and measure local mobile/desktop performance |
| `npm run lighthouse:production` | Measure the currently deployed homepage on mobile |

`npm test` covers built canonical/social metadata, page languages, 404 output,
sitemap/robots, numeric article redirects, real 1200×630 PNG social previews,
app-specific content, bounded motion, and homepage asset budgets. Some app-copy
checks inspect source strings; these do not replace browser verification of layout,
links, keyboard focus, or reduced motion. Tests that read `.next/` need a fresh build.

`npm run analyze` remains available, but its source-map explorer requires source
maps. Production browser source maps are currently disabled, so this diagnostic
command needs an intentional temporary configuration change before use.

## Lighthouse and performance

Install Chrome/Chromium, then run:

```sh
npm run lighthouse
```

This builds the app, starts an isolated production server at `127.0.0.1:3001`, and
runs three audits each for `/`, `/blog/cracking-the-pagespeed-code`, and
`/traffic-rules` on mobile and desktop. Keep port 3001 free. The server stops after
collection; a median Performance score below 90 warns without failing the command.

Reports remain in ignored `lighthouse-reports/mobile/` and
`lighthouse-reports/desktop/`. Timestamped HTML/JSON files retain past runs;
`manifest.json` identifies the latest runs and representatives. To reuse a fresh
production build for one profile:

```sh
npm run lighthouse:mobile
npm run lighthouse:desktop
```

`npm run lighthouse:production` performs three mobile audits against the deployed
`https://www.belmeha.com/`, saving reports in `lighthouse-reports/production/`.
It does not build, start localhost, or deploy local changes.

For a nonstandard browser, set `CHROME_PATH` or save
`{ "chromePath": "/absolute/path/to/chrome" }` in ignored `.lighthouse-browser.json`;
the environment variable takes precedence. For a local comparison with Analytics,
build with the same public measurement ID used in production.

Compare the same URL, browser/Lighthouse version, throttling and analytics settings
under similar machine load. Report medians/ranges and successful run counts.
Local Lighthouse, deployed/preview Lighthouse, Google PageSpeed lab scores, and
real-user field data are separate evidence. A local or preview score of 100 does
not establish production performance or stable 100 across runs.

The homepage has enforced budgets of **24 KiB preloaded fonts** and **140,000 gzip
bytes initial modern-browser JavaScript**. See [performance assets](docs/performance-assets.md)
for WOFF2 subsets, full-font fallback, responsive portraits and regeneration.

## Review of work to date

Repository history, current code/tests, and the available project chats show these
main areas of work:

| Area | Current result and lesson to preserve |
| --- | --- |
| Portfolio and blog | Server-rendered content, article slugs/redirects, dark article styling, internal Markdown-link rewriting |
| SEO | Fixed production canonicals, per-article metadata/images, language-aware documents, canonical-only sitemap, global 404 |
| App pages | React support/privacy routes for four apps; app-specific facts and stable public links matter |
| Traffic Rules | Ukrainian marketing page, iOS/Android store links, official badges, responsive screenshots and reduced-motion-aware effects |
| Performance/accessibility | Font subsets, responsive portraits, CSS inlining, modern-browser polyfill aliases, contrast improvements and deferred Analytics |
| Measurement | Local/deployed Lighthouse profiles and payload tests; production claims require production evidence under comparable conditions |
| Dependencies | Next.js/tooling refresh with lockfile and regression checks; retain static rendering unless a concrete dynamic requirement arises |

The project has useful regression coverage and focused performance work. The main
maintenance gaps were stale README instructions and the lack of reusable project
context. Framework-internal polyfill aliases need rechecking after upgrades;
source-string app tests need browser checks for visual changes. Historical scores
and past successful checks are not a current production audit.

## Skills, rules, and agents

[AGENTS.md](AGENTS.md) is the instruction entry point. It links to
[engineering rules](docs/engineering-rules.md), covering rendering/bundlers, stable
URLs and metadata, truthful app copy, accessibility, asset budgets/caching,
measurements, dependency updates, and verification proportional to the change.
Rules are repository guidance loaded through AGENTS.md; no broad command-approval
allowlists are added.

Repository skills live in `.agents/skills/`, discovered by Codex for this project:

| Skill | Use |
| --- | --- |
| [cra-performance](.agents/skills/cra-performance/SKILL.md) | Lighthouse/PageSpeed diagnosis, controlled comparisons, fonts/images, analytics and budgets |
| [cra-content-seo](.agents/skills/cra-content-seo/SKILL.md) | Blog/catalog updates, routing, metadata, sitemap, canonical URLs and social previews |
| [cra-app-pages](.agents/skills/cra-app-pages/SKILL.md) | App privacy/support content, Ukrainian landing page, badges, screenshots and motion |
| [cra-maintenance](.agents/skills/cra-maintenance/SKILL.md) | npm/tooling updates, bundler compatibility and regression validation |

Example requests: `Use $cra-performance to compare the deployed mobile homepage`,
`Use $cra-content-seo to add this article`, or `Use $cra-maintenance to update dependencies`.
The skills can also be selected automatically when relevant.

Optional custom agents are defined in `.codex/agents/`:

- [cra_reviewer](.codex/agents/cra_reviewer.toml): inspect code, SEO, app-content and
  accessibility regressions without editing.
- [cra_performance_auditor](.codex/agents/cra_performance_auditor.toml): examine
  measurement quality and performance regressions; fresh audits only when requested.

Ask explicitly to delegate, for example: `Ask cra_reviewer to review this diff`.
Agents inherit the session’s model preferences and permissions; no model is pinned
and agent review is not a compulsory step for routine changes.

### Superpowers disabled for this project

[.codex/config.toml](.codex/config.toml) sets the Superpowers plugin’s project
`enabled` override to `false`. Plugin enablement is controlled by configuration;
AGENTS.md and agent prompts do not duplicate this setting. The global installation
is retained for other projects.
Existing `docs/superpowers/` plans are historical records, not active rules.

Project configuration requires a trusted project. Start a new project chat/session
(or reopen Codex if needed) to reload the configuration and local skills/agents;
existing chat context can still contain previously loaded skills. Verify the plugin
state after reloading, especially in installations with managed plugin settings.

Configuration conventions follow official OpenAI documentation for
[project config](https://learn.chatgpt.com/docs/config-file/config-basic),
[skills](https://learn.chatgpt.com/docs/build-skills),
[plugin enablement](https://learn.chatgpt.com/docs/config-file/config-reference), and
[custom agents](https://learn.chatgpt.com/docs/agent-configuration/subagents).

## Configuration and deployment

`next.config.ts` disables production browser source maps, enables experimental CSS
inlining/global 404, sets image/CDN patterns, redirects numeric blog IDs and caches
`/assets/*` immutable for a year. Change asset URLs when replacing cached content.
TypeScript targets ES2020 with bundler resolution and `strict: false`. Browser
minimums live in `package.json`: Chrome/Edge 120, Firefox 115, Safari/iOS 17 and
corresponding mobile variants, excluding dead browsers and Opera Mini.

Deploy to the existing Vercel project or compatible Node.js hosting. Set public
build-time variables before building; verify the deployed revision, public routes
and Analytics behavior after a release. Local build/test results do not confirm
that a deployment contains the change.

## Author and license

**Rostyslav Belmeha** · [Website](https://www.belmeha.com) ·
[GitHub](https://github.com/rbelmega) ·
[LinkedIn](https://www.linkedin.com/in/rostyslav-belmega/) ·
[Twitter](https://twitter.com/izzz0)

Private project — all rights reserved.
