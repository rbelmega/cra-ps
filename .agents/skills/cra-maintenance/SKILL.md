---
name: cra-maintenance
description: Refresh cra-ps npm dependencies or tooling and verify Next.js build compatibility, bundler aliases, static output, and regression coverage. Use for maintenance rather than feature design.
---

# Dependencies and tooling

Read `docs/engineering-rules.md`, `package.json`, `biome.json`, `next.config.ts`,
and `tsconfig.json`. Check the working tree before modifying manifests/lockfiles.

Use `npm outdated` or registry metadata to establish current stable versions and
official release/migration notes for compatibility. Keep npm and update
`package-lock.json` with the manifest. Do not combine an ordinary patch refresh
with Cache Components, stricter TypeScript migration, browser-baseline changes,
or a framework rewrite without a task requirement.

Inspect the resolved dependency tree, peers and PostCSS override. Keep Webpack
production and Turbopack development aliases consistent. Next's polyfill-module
alias targets framework internals: verify it still applies after upgrades and
that built output preserves the intended modern-browser payload. For Biome,
use the installed schema and inspect config changes; avoid unrelated automatic
repository-wide rewrites.

Run `npm run lint -- --error-on-warnings`, `npm run format:check`, and `npm test`
after final dependency changes. The test command includes production build;
inspect route output and budget/SEO tests. Report actual installed versions and
remaining audit/compatibility issues. An obsolete report is not evidence of the
current dependency state; avoid destructive forced audit fixes.
