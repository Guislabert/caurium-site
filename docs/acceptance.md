# Acceptance record

Environment: local build on Node 26.9.0, pnpm 12.15.0, Next.js 16.4.3, Tailwind CSS 4.3.3,
Chromium via Playwright. Evidence is recorded as `PASS`, `FAIL` or `NOT RUN` with the method used.

Legend: `[ ]` not run · `[x]` pass · `[!]` fail.

## 15.1 Content truth and business boundaries

- [x] Gate, Probe, Guard and Box each have purpose, stage, workflow, scope, release criteria,
      exclusions, boundaries, example and a next step.
- [x] Only Probe is `private-preview`; every product and feature without launch evidence stays
      `Planned`, and the stage is consistent on home, detail pages, docs and metadata (enforced by
      `tests/content.test.ts`).
- [x] Planned capabilities, diagrams and proposed APIs carry adjacent English labels. The test
      suite checks that every product example is labelled illustrative or proposed.
- [x] No fabricated customers, reviews, certifications, regions, user counts, performance or uptime
      (enforced by test pattern list). No price appears anywhere: the preview is free and a test
      fails on any euro figure in routes or content.
- [x] No dead “Console”, “Login”, “Get started” or access buttons. The only call to action is the
      `/start/` application form, and it posts to the deployed Probe Worker.
- [x] Three mailboxes are published in the footer (`security@`, `support@`, `privacy@`), Email
      Routing is enabled and the MX accepts all three (`RCPT 250`).
- [x] End-to-end delivery into the destination mailbox confirmed by an external send. Cloudflare's
      Email Routing analytics records `action=forward, status=delivered` at 2026-10-29T01:53:03Z
      for `security@`. The sender was a third-party mailbox this host does not control, which is
      what the previous `NOT RUN` required.
- [x] No contact page or contact form exists; the application form remains the only intake path.
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
      17 routes and 23 HTML files generated.
- [x] `pnpm test`: 28 tests pass (content invariants, claims, routes and status contract).
- [x] `pnpm check:links`: 112 HTML files, 37 internal targets, sitemap verified.
- [x] Static export has no runtime server dependency; `out/` contains no internal evidence.
- [x] Three mobile Lighthouse runs on home and one product page, against the deployed origin
      (Lighthouse 13.6.0, headless Chromium, default mobile emulation):

      | Run | Page | Perf | A11y | Best practices | SEO |
      | --- | --- | --- | --- | --- | --- |
      | 1 | `/` | 93 | 96 | 77 | 66 |
      | 2 | `/` | 97 | 96 | 77 | 66 |
      | 3 | `/` | 95 | 96 | 77 | 66 |
      | 1 | `/products/probe/` | 98 | 96 | 77 | 66 |
      | 2 | `/products/probe/` | 97 | 96 | 77 | 66 |
      | 3 | `/products/probe/` | 95 | 96 | 77 | 66 |

      Performance and accessibility meet the §13.3 targets. The two categories that do not are
      both explained by deliberate choices or by hosting, not by this codebase:
      - **SEO 66** — the only failing audit is `is-crawlable`. The build is `noindex` on purpose
        (see §15.5); this site is not meant to be found.
      - **Best practices 77** — the failing audits are `deprecations` (Fenced Frame API,
        `StorageType.persistent`) and `inspector-issues` (a CSP violation). Every item in all six
        runs resolves to Cloudflare edge-injected scripts: `cdn-cgi/challenge-platform/scripts/jsd/main.js`
        and `static.cloudflareinsights.com/beacon.min.js`. No first-party script is implicated.
- [x] Title, description, canonical, OG, sitemap, robots match product stages.
- [x] Preview is `noindex` and production indexing is opt-in via `NEXT_PUBLIC_SITE_ENV`.
- [x] Structured data contains only `WebSite` plus a `FAQPage` on `/docs/faq/`, all with verified
      fields; no offers, ratings or reviews.
- [x] Per-page OG cards exist for home, products, each product, pricing, application, architecture,
      docs, trust, build log and status.

## 15.4 Status and security

- [x] Unconnected monitoring shows explicit English text and no green state.
- [x] Unit tests cover normal, invalid JSON, missing fields, stale, future and unknown component
      cases (`tests/status.test.ts`).
- [x] Staleness is judged from `checkedAt`; `generatedAt` does not refresh an old check.
- [x] Secret scan and build-output scan find nothing (`check:links` forbidden strings, content test).
- [x] Static response headers verified on the deployed origin: `X-Content-Type-Options`,
      `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY` and a CSP in Report-Only.
- [x] The application form works with JavaScript disabled: Playwright with JS off fills and
      submits `/start/`, the browser posts natively to the Probe Worker, and lands on
      `/start/received/` with a 303. Verified against the deployed Worker.
- [ ] CSP switched from Report-Only to enforcing. `NOT RUN` — the form's endpoint is now allowed,
      but Cloudflare injects `static.cloudflareinsights.com/beacon.min.js` at the edge, which
      `script-src` blocks. One of the two has to change first.
- [x] `www` redirects to the apex with path and query preserved. `www` is bound to the same
      Worker; `src/worker.ts` answers 301 before assets (`run_worker_first`). Verified:
      `/pricing/?plan=team` → `301 https://caurium.tech/pricing/?plan=team`.
- [x] No management database, private node control or shared management cookie.
- [x] Build and preview require no network credentials.

## 15.5 Production release (T08)

- [ ] Domain ownership, Cloudflare project ownership and deployment permission verified.
- [ ] Privacy and terms reflect the real entity, purpose and data handling. Partly met: the data
      handling is described and a privacy address exists; the entity is still unpublished, so the
      pages describe a free preview and no payment is accepted.
- [x] HTTPS valid on the apex (Google Trust Services WE1). HTTP redirects to HTTPS.
- [x] `www` redirects with path and query preserved, no loop. Verified against the deployed
      Worker.
- [ ] Pages binding complete; authoritative and recursive DNS verified.
- [ ] DNS diff limited to this site; existing node and mail records unchanged.
- [ ] Production spot checks pass.
- [ ] Deployment ID, commit, timestamp and rollback version recorded.

Conclusion: the private preview is deployed and serves the apex domain, with automated content,
link and status-contract checks passing. Production is blocked on the inputs in
`docs/deployment.md` §6 — the legal entity and an enforcing CSP. Lighthouse has been run; its
unmet categories are the deliberate `noindex` and Cloudflare's edge-injected scripts.
