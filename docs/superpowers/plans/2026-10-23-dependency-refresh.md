# Dependency Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the three outdated stable dependencies while preserving the site's current static/SSG behavior.

**Architecture:** Keep the existing Next.js configuration and rendering model unchanged. Update only the direct dependency declarations and npm lockfile, then use the existing verification suite and production route table to detect compatibility or rendering regressions.

**Tech Stack:** Next.js 16, React 19, TypeScript 7, npm, Biome, Sass, Node test runner

**Spec:** `docs/superpowers/specs/2026-10-23-dependency-refresh-design.md`

## Global Constraints

- Update Next.js from 16.4.2 to 16.4.3.
- Update `@biomejs/biome` from 2.5.15 to 2.6.2.
- Update Sass from 1.105.2 to 1.106.1.
- Preserve npm and `package-lock.json`.
- Do not enable `cacheComponents` or change route, fetch-caching, or rendering behavior.
- Do not adopt prerelease/canary packages or update already-current dependencies.
- Do not make unrelated source changes.

## Review Focus

- Exact requested versions resolve in `node_modules` without duplicates or invalid peer dependencies.
- `package-lock.json` changes only as required by the three direct dependency updates.
- All existing routes remain static or SSG in the production build output.
- Biome 2.6.2 introduces no new lint or formatting diagnostics.
- Next.js 16.4.3 compiles the existing React 19.3.1 and TypeScript 7.0.2 code without warnings or errors.

---

### Task 1: Refresh and verify dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Test: existing `test/*.test.mjs`

**Interfaces:**
- Consumes: existing npm manifest, lockfile, Next.js configuration, and project verification scripts.
- Produces: an npm install resolving `next@16.4.3`, `@biomejs/biome@2.6.2`, and `sass@1.106.1` with no rendering-model changes.

- [ ] **Step 1: Establish the baseline**

Run: `npm run lint && npm run format:check && npm test`

Expected: lint and formatting exit successfully; the build completes; all existing Node tests pass; the route table contains only static (`○`) and SSG (`●`) application routes.

- [ ] **Step 2: Update the three direct dependency declarations**

Edit `package.json` so the dependency values are exactly:

```json
"next": "16.4.3",
"@biomejs/biome": "^2.6.2",
"sass": "1.106.1"
```

Do not change any other manifest entry and do not add `cacheComponents` to `next.config.ts`.

- [ ] **Step 3: Regenerate the npm lockfile and installed tree**

Run: `npm install`

Expected: npm completes without peer-dependency or engine errors and updates `package-lock.json` plus `node_modules` for the three requested packages.

- [ ] **Step 4: Verify resolved versions and dependency health**

Run: `npm ls next @biomejs/biome sass`

Expected: the tree reports `next@16.4.3`, `@biomejs/biome@2.6.2`, and `sass@1.106.1` with exit code 0 and no invalid or duplicate direct installations.

Run: `npm outdated --json`

Expected: `{}` with no outdated direct dependencies.

- [ ] **Step 5: Review the dependency diff**

Run: `git diff -- package.json package-lock.json`

Expected: only the three requested direct versions and their corresponding lockfile resolution/integrity data change.

- [ ] **Step 6: Run final verification**

Run: `npm run lint && npm run format:check && npm test && git diff --check`

Expected: every command exits 0, all existing tests pass, the production build succeeds, and the route table remains entirely static/SSG.

- [ ] **Step 7: Confirm Cache Components remain disabled**

Run: `rg -n "cacheComponents|use cache|cacheLife|cacheTag" next.config.ts src`

Expected: no matches and exit code 1, confirming that the dependency refresh did not alter the caching model.
