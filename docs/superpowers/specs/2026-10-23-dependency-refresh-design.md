# Dependency Refresh Design

## Intent

Keep the site on current stable releases with the smallest possible production risk. The update should preserve the existing fully static/SSG rendering behavior and avoid introducing a new caching model that the site does not currently need.

## Goals

- Update Next.js from 16.4.2 to 16.4.3.
- Update `@biomejs/biome` from 2.5.15 to 2.6.2.
- Update Sass from 1.105.2 to 1.106.1.
- Regenerate `package-lock.json` through npm.
- Verify formatting, linting, tests, and the production build.

## Non-goals

- Do not enable `cacheComponents`.
- Do not migrate existing route handlers, fetch caching, or rendering behavior.
- Do not update already-current packages or adopt prerelease/canary versions.
- Do not make unrelated source changes.

## Constraints

- Preserve the current npm package manager and lockfile.
- Keep the existing Next.js webpack production build configuration.
- Preserve all static and SSG routes shown by the current production build.

## Approaches considered

1. **Stable dependency refresh only — selected.** Update the three outdated stable packages and verify the existing application. This is low risk and directly addresses maintenance and security without changing runtime semantics.
2. **Refresh plus Cache Components migration.** Enable `cacheComponents`, replace incompatible `force-static` usage, and migrate caching boundaries. This adds migration and runtime risk while providing little benefit because all current routes already prerender as static content or SSG.

## Implementation outline

Use npm to install the exact current stable versions, review the resulting manifest and lockfile diff, then run the full project verification suite. If an update exposes a compatibility failure, fix only the minimum dependency-related issue and re-run verification.
