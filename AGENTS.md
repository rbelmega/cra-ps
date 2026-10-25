# Project instructions

This repository serves Rostyslav Belmeha's portfolio, Markdown blog, and mobile-app
marketing, support, and privacy pages at `https://www.belmeha.com`.

## Working agreement

- Keep existing page languages: English
  under `src/app/(en)`, Ukrainian under `src/app/(uk)`; route groups do not add URL prefixes.
- Read [engineering rules](docs/engineering-rules.md) before changing application
  code or dependencies. `package.json`, build output, and tests are the source of
  truth when old plans or README descriptions disagree.
- Complete routine authorized work directly. Ask only when missing product facts,
  an actual ambiguity, or an external action requires a decision. Avoid mandatory
  design approvals, plans, agent reviews, or TDD ceremonies for every small edit.
- Preserve unrelated local changes. Do not commit, push, merge, deploy, or change
  external service settings unless the user requests that action.

## Local skills

Load only skills relevant to the task; paths are relative to this repository:

| Skill | Use for |
| --- | --- |
| `.agents/skills/cra-performance/SKILL.md` | Lighthouse, PageSpeed, fonts, images, JavaScript budgets, analytics timing |
| `.agents/skills/cra-content-seo/SKILL.md` | Blog posts, canonical URLs, redirects, sitemap, social previews, language metadata |
| `.agents/skills/cra-app-pages/SKILL.md` | App support/privacy pages and Traffic Rules landing page, store links, motion |
| `.agents/skills/cra-maintenance/SKILL.md` | Dependency/tooling upgrades and build compatibility |

## Agents

Project agents live in `.codex/agents/`: `cra_reviewer` for code/SEO/content
regressions and `cra_performance_auditor` for measurement quality. They inspect and
report without editing. Delegate only when requested by the user; their presence
does not require an agent on every task. Inherit the user's model preferences.

## Verification

- Application/tooling changes: `npm run lint -- --error-on-warnings`,
  `npm run format:check`, and `npm test`. The test command builds production first;
  do not run a second build unless code or build-time configuration changes.
- A focused test can run with `node --test test/<file>.test.mjs`; tests that read
  `.next/` require a fresh production build.
- UI/motion changes also need browser checks at mobile and desktop widths,
  keyboard navigation, and reduced-motion behavior where relevant.
- Documentation/instruction-only changes: verify links, actual paths, skill
  frontmatter, and TOML syntax. A full app build is optional for those edits.
- Report what was actually checked and any limitation. A build/test pass does not
  establish a browser or production performance result.
