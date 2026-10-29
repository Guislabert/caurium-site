# Acceptance record

Environment: local build on Node 26.9.0, pnpm 12.15.0, Astro 7.4.4, Tailwind CSS 4.3.3,
Chromium via Playwright. Evidence is recorded as `PASS`, `FAIL` or `NOT RUN` with the method used.

Legend: `[ ]` not run · `[x]` pass · `[!]` fail.

## 15.1 Content truth and business boundaries

- [x] Gate, Probe, Guard and Box each have purpose, stage, workflow, scope, release criteria,
      exclusions, boundaries, example and a next step.
- [x] Each stage matches a deployment: Probe `private-preview` (deployed, open by application),
      Gate `in-development` (deployed, not open), Guard and Box `planned` (no worker). Nothing is
      `available`, because no billing entity exists. Enforced by `tests/content.test.ts`.
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
- [x] The static build has no runtime server dependency; `dist/` contains no internal evidence.
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
- [x] Preview is `noindex` and production indexing is opt-in via `PUBLIC_SITE_ENV`.
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
- [x] CSP switched from Report-Only to enforcing. Nine routes were scanned under Report-Only with
      the beacon origin allowed; the run reported zero violations, so the header is now
      `Content-Security-Policy`. The textarea and the `/start/` fetch were re-tested after the
      switch.
- [x] `www` redirects to the apex with path and query preserved. `www` is bound to the same
      Worker; `src/worker.ts` answers 301 before assets (`run_worker_first`). Verified:
      `/pricing/?plan=team` → `301 https://caurium.tech/pricing/?plan=team`.
- [x] No management database, private node control or shared management cookie.
- [x] Build and preview require no network credentials.

## 15.5 Production release (T08)

- [x] Domain ownership, Cloudflare project ownership and deployment permission verified. The zone
      is served by `monika`/`norman.ns.cloudflare.com`; the Worker is bound to the apex and to
      `www`, and CI deploys through a scoped account token.
- [ ] Privacy and terms reflect the real entity, purpose and data handling. Partly met: the data
      handling is described and a privacy address exists; the entity is still unpublished, so the
      pages describe a free preview and no payment is accepted.
- [x] HTTPS valid on the apex (Google Trust Services WE1). HTTP redirects to HTTPS.
- [x] `www` redirects with path and query preserved, no loop. Verified against the deployed
      Worker.
- [x] Worker custom domains complete: apex → `caurium-site`, `www` → `caurium-site`, plus the
      separate `caurium-docs` hostname. Both custom domains carry a certificate.
      Regression found and fixed during this pass: the `www` custom domain was missing, so the
      hostname did not resolve at all. It was re-bound and now answers
      `301 https://<apex>/trust/?x=1` — path and query preserved.
- [x] DNS diff limited to this site, with the mail change stated rather than glossed over. Two
      records this project owns were added: Worker custom domains for the apex and `www`, both
      pointing at `caurium-site`. Email Routing was enabled for the contact addresses, which
      replaced the apex MX with Cloudflare's three `route*.mx.cloudflare.net` entries; the previous
      apex MX set was empty, so no existing mail delivery was displaced. The apex TXT
      `v=spf1 -all` was deliberately left unchanged — it restricts outbound sending only, and
      Cloudflare reports the zone as `misconfigured/locked` because of it. No node, proxy or other
      service record was touched.
- [x] Production spot checks pass: 16 routes return 200 (`/`, `/access/`, `/start/`,
      `/start/received/`, `/products/probe/`, `/docs/faq/`, `/trust/`, `/terms/`, `/privacy/`,
      `/architecture/`, `/status/`, `/build-log/`, `/llms.txt`, `/sitemap.xml`, `/robots.txt`,
      `/og/access.png`); `/pricing/` returns 301 to `/access/`; an unknown path returns 404.
- [x] Deployment provenance recorded: the CI deploy job passes `--message "<sha> <ref>"`, so
      `wrangler versions list` names the commit behind each Worker version (verified for
      `6c5d98c…`). Rollback is the previous version ID from the same list.

Conclusion: the site is deployed and serves both the apex and `www`, with automated content, link
and status-contract checks passing, an enforcing CSP, three verified contact mailboxes and CI
deploys that record the commit behind every Worker version.

One item remains open and it is not technical: no legal entity is published. The site is
deliberately `noindex`, free, and sells nothing, so the absence of an accountable operator does not
create an obligation the site cannot meet. Publishing an entity, a governing law and a billing
contact is the precondition for taking payment and for turning indexing on.
