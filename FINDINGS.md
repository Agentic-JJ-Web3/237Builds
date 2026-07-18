# 237Builds — Codebase Findings (2026-07-18)

Snapshot of the codebase as of commit `5dc21a7`. Stack: static `index.html` + `script.js` (vanilla JS) + `data/companies.json`, Tailwind via CDN, hosted on Netlify.

## Confirmed bugs

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | Health filter button uses `data-category="heltech"` but every health entry in the data is `"healthtech"` | `index.html:61` vs `data/companies.json` | Clicking "🏥 Health" always returns 0 results — a whole category is unreachable |
| 2 | `Bitsvalley Payments` has `"category": "Fintech"` (capital F); filtering is case-sensitive and the button uses `"fintech"` | `data/companies.json`, `index.html:77` | Entry silently disappears from the FinTech filter |
| 3 | `/public/seed.svgr` (typo, extra "r") used for two partner logos | `index.html:153`, `index.html:188` | Broken image, falls back to hidden alt text |
| 4 | "Partners" carousel links to Google, AWS, Stripe, Microsoft, Y Combinator, Slack, GitHub, Salesforce, Shopify homepages, all rendered with the same placeholder logo | `index.html:130-195` | Misleading — implies partnerships that don't exist; potential trademark concern |
| 5 | Obfuscated Cloudflare challenge-platform snippet appended at the end of the file | `script.js:279` | Looks like an accidental copy-paste (e.g. from viewing source of a Cloudflare-protected page); does nothing useful here and shouldn't be in source control |
| 6 | Contact email inconsistent: README says `237builds@gmail.com`, footer CTA says `hello@237builds.cm` | `README.md` vs `index.html:215` | Confusing for contributors reaching out |
| 7 | Page `<title>` says "CameroonBuilds"; everywhere else (header, footer, README) says "237Builds" | `index.html:6` | Branding inconsistency, hurts SEO/brand recall |
| ~~8~~ | ~~Tailwind loaded via `cdn.tailwindcss.com` runtime script~~ — **Fixed**: added Tailwind CLI build (`tailwind.config.js`, `src/tailwind.css`, `npm run build:css`), committed purged/minified `public/tailwind.css`, swapped the CDN `<script>` for a `<link>` | `index.html:7` | Was: full framework shipped uncompiled, no purge, slower first paint |

## ~~No ranking logic exists~~ / ~~No sorting control in the UI~~

**Fixed**: `renderStartups()` in `script.js` now sorts whatever list it's given (`sortStartups()`) according to a `currentSort` mode before drawing cards, defaulting to alphabetical by `name`. Because every filter/search path (category, city, search box) already funnels through `renderStartups()`, the sort applies consistently no matter which combination of filters is active — no need to touch each filter function separately.

A `<select id="sortSelect">` next to the city filter lets visitors switch between:
- Name (A–Z) — default
- Name (Z–A)
- Newest founded / Oldest founded — using the existing, schema-required `startDate` field (no new data needed)

This replaces raw JSON insertion order with a rule that's deterministic and auditable by any contributor. `237Builds` (`id: 0`) still happens to render first under the default sort, but only because `"237Builds"` starts with a digit, which sorts before letters — not because of special-casing.

A "Featured" or true "date added" sort would still need real popularity/`dateAdded` data that doesn't exist yet — out of scope here.

## No contribution safety net

- ~~No JSON Schema for `companies.json`~~ — **Fixed**: added `data/companies.schema.json` (enforces the exact category enum, required fields, URL shape) plus `scripts/validate-companies.js` (also catches duplicate `id`s, which JSON Schema alone can't express) run via `npm run validate:data`. Would have caught #1 and #2 above.
- ~~No CI at all~~ — **Fixed**: `.github/workflows/validate-data.yml` runs `npm run validate:data` on every push/PR to `main`, so a bad `category` typo or duplicate `id` now fails the check instead of merging silently.
- ~~No `CONTRIBUTING.md`~~ — **Fixed**: added `CONTRIBUTING.md` with local setup, the data-validation workflow, and the PR steps; README's Contributing section now just links to it.
- ~~No PR/issue templates~~ — **Fixed**: added `.github/pull_request_template.md` and issue forms under `.github/ISSUE_TEMPLATE/` (bug report, feature request, new-startup submission with a category dropdown matching the schema enum).
- Contributors must hand-pick a unique `id`, which guarantees merge conflicts when two PRs land close together. (Duplicate `id`s are now at least caught by validation before merge.)

## No internationalization

All UI copy is hard-coded English strings in `index.html`. No locale files, no language switcher, no routing per locale.

## Other gaps worth addressing as the project grows

- No startup detail pages — cards link straight out to the external site, no room for a fuller story (team, funding stage, tags).
- No "report broken link/logo" mechanism — link rot will only ever be caught by maintainers.
- No sitemap or per-page meta descriptions (discovery is the whole point of the project).
- No analytics — no visibility into what devs actually search/filter for.
- No `package.json` / build tooling / tests / linting of any kind.

---
*This file is a living record — update it as items are resolved or new issues are found, rather than creating a new findings doc each time.*
