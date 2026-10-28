# Acceptance record

Environment: local build on Node 26.9.0, pnpm 12.15.0, Next.js 16.4.3, Tailwind CSS 4.3.3,
Chromium via Playwright. Evidence is recorded as `PASS`, `FAIL` or `NOT RUN` with the method used.

Legend: `[ ]` not run · `[x]` pass · `[!]` fail.

## 15.1 Content truth and business boundaries

- [x] Gate, Probe, Guard and Box each have purpose, stage, workflow, scope, release criteria,
      exclusions, boundaries, example and a next step.
- [x] Every product without launch evidence is `Planned`, and the stage is consistent on home,
      detail pages, docs and metadata (enforced by `tests/content.test.ts`).
- [x] Planned capabilities, diagrams and proposed APIs carry adjacent English labels. The test
      suite checks that every product example is labelled illustrative or proposed.
- [x] No fabricated customers, reviews, certifications, prices, regions, user counts, performance
      or uptime (enforced by test pattern list).
- [x] No dead “Console”, “Login”, “Get started”, payment or access buttons.
- [x] No contact CTA exists; documentation links serve as the primary action.
- [x] Public content contains no private nodes, origin IPs, management addresses, SSH details or
      secrets (enforced by test pattern list and `check:links`).

## 15.2 Pages and interaction

- [x] All P0 routes exist; three substantive docs are complete (`overview`, `product-stages`,
      `security`) plus the docs index and legal pages.
- [x] 360/390/768/1024/1440 px have no horizontal overflow or clipped controls. Verified with
      Playwright over 14 routes × 5 widths (70 page loads); `documentElement.scrollWidth` never
      exceeded `innerWidth` after the fixes recorded below.
- [x] Product links, breadcrumbs, footer links, docs TOC anchors, copy buttons and mobile menu
      work. Anchors verified by evaluating every `a[href^="#"]` target in the DOM.
- [x] Keyboard, focus return, skip link, contrast and semantics checked. Mobile menu opens, focuses
      its first link, closes on Escape and returns focus to the trigger (Playwright check).
- [x] No JavaScript errors or hydration errors in the browser console across the 70 loads above.
- [x] Unknown paths return the real 404 page with status 404 (`npx serve out`, `/nope/`).
- [x] Code blocks scroll locally at 360 px and do not widen the page.

Fixes made during this pass: `min-w-0` on docs navigation, code-block and table grid children;
`text-balance` on the hero heading; mobile docs navigation collapsed to a horizontal strip.

## 15.3 Build, performance and SEO

- [x] Package manager and dependencies locked; clean install and production build reproduce.
- [x] `typecheck`, `lint` and `build` run separately. Result: typecheck clean, ESLint clean,
      18 static pages generated.
- [x] `pnpm test`: 17 tests pass (content invariants and status contract).
- [x] `pnpm check:links`: 77 HTML files, 31 internal targets, sitemap verified.
- [x] Static export has no runtime server dependency; `out/` contains no internal evidence.
- [ ] Three mobile Lighthouse runs on home and one product page reach the section 13.3 targets.
      `NOT RUN` — no Lighthouse run has been recorded yet.
- [x] Title, description, canonical, OG, sitemap, robots match product stages.
- [x] Preview is `noindex` and production indexing is opt-in via `NEXT_PUBLIC_SITE_ENV`.
- [x] Structured data contains only `WebSite` with verified fields; no offers or ratings.
- [x] Per-page OG cards exist for home, products, each product, architecture, docs and status.

## 15.4 Status and security

- [x] Unconnected monitoring shows explicit English text and no green state.
- [x] Unit tests cover normal, invalid JSON, missing fields, stale, future and unknown component
      cases (`tests/status.test.ts`).
- [x] Staleness is judged from `checkedAt`; `generatedAt` does not refresh an old check.
- [x] Secret scan and build-output scan find nothing (`check:links` forbidden strings, content test).
- [ ] Static response security headers verified after deployment. `NOT RUN` — nothing is deployed.
- [ ] CSP Report-Only reviewed on a deployed preview. `NOT RUN`.
- [x] No management database, private node control or shared management cookie.
- [x] Build and preview require no network credentials.

## 15.5 Production release (T08)

- [ ] Domain ownership, Cloudflare project ownership and deployment permission verified.
- [ ] Privacy and terms reflect the real entity, purpose and data handling.
- [ ] HTTPS valid; `www` and HTTP redirect with path and query preserved, no loop.
- [ ] Pages binding complete; authoritative and recursive DNS verified.
- [ ] DNS diff limited to this site; existing node and mail records unchanged.
- [ ] Production spot checks pass.
- [ ] Deployment ID, commit, timestamp and rollback version recorded.

Conclusion: preview-ready locally, with automated content, link, responsive-layout and console
checks passing. Production is blocked on the inputs listed in `docs/deployment.md` §6, and
Lighthouse plus deployed-header checks remain `NOT RUN`.
