# Content audit

Every public claim, its stage and its evidence. Update this file whenever copy changes.

Review date: 2026-10-28. Reviewed by: operator (in progress). Promotion evidence is retained in an
internal record outside this public repository and is never shipped in the site build.

## Brand

| Claim | Where | Stage | Evidence |
| --- | --- | --- | --- |
| “Developer infrastructure & AI connectivity.” | every page (brand description) | positioning statement | Not a capability claim. No product implied. |
| “Infrastructure for a connected world.” | home H1 | brand line | No capability claim. |
| “Caurium is building a focused toolkit for API access, service monitoring, operational safeguards, and private development environments.” | home hero | planned | Four product records below. |
| “Early development. Product availability is listed on each product page.” | home hero, footer | factual | All products `planned`. |
| “Caurium is in early development. Planned features are not available for use.” | footer | factual | All products `planned`. |

## Products

| Product | Stage | Public capability claims | Evidence | Verified? |
| --- | --- | --- | --- | --- |
| Gate | Planned | None. Seven scope items, five release criteria, three exclusions — all labelled Planned. | No deployment. | No |
| Probe | Planned | None. Seven scope items, five release criteria, three exclusions — all labelled Planned. | No deployment. | No |
| Guard | Planned | None. Seven scope items, four release criteria, three exclusions — all labelled Planned. | No deployment. | No |
| Box | Planned | None. Seven scope items, five release criteria, three exclusions — all labelled Planned. | No deployment. | No |

Home page, `/products/`, `/docs/product-stages/`, each product page and page metadata all read the
stage from `src/content/products.ts`. A test enforces that no product or feature is promoted
without also editing this file.

Release criteria are published as conditions to meet, not as completed checks. The
`Release criteria` section on each product page says so in the surrounding copy. The section does
not imply that any criterion has passed.

## Illustrative material

| Item | Location | Label |
| --- | --- | --- |
| Fig. 01 — roadmap architecture (four modules and boundaries) | home | “Illustrative example — not a live service.” + `Planned` badge |
| Workflow (Connect / Observe / Operate) | home | “Planned workflow”, “Illustrative workflow — not a live product experience.” |
| Fig. 06 — service boundaries | `/architecture/` | “Planned architecture — illustrative, not a deployed system.” + `Current` / `Planned` legend |
| Product workflow lists and spec panel | each product page | `Planned` badge, “Intended workflow — not a live product experience.” |
| Gate curl example | `/products/gate/` | “Proposed API — subject to change”, `api.example.com`, `YOUR_API_KEY` |
| Probe status example | `/products/probe/` | “Proposed schema — subject to change”; states the feed is not connected |
| Guard backup manifest | `/products/guard/` | “Proposed manifest — subject to change”; `lastVerifiedAt: null` |
| Box instance specification | `/products/box/` | “Proposed spec — subject to change”; region is a placeholder |
| Status contract JSON | `/status/` | “Illustrative example — not a live service.” + schema note |
| Open Graph cards | `/og/*.png` | Each card repeats the relevant stage or “not connected” state |

## Status page

| Claim | Stage | Evidence |
| --- | --- | --- |
| “Monitoring is not connected yet. No live service status or uptime history is available on this page.” | factual (default) | `NEXT_PUBLIC_STATUS_URL` unset. |
| Component health, timestamps and coverage | only when a sanitized feed is configured | Contract in `src/lib/status.ts`; stale (>180 s), future, malformed or unknown data renders Unknown. |
| Uptime percentage | deliberately absent | No verified window exists. |

## Documentation and legal pages

| Page | Claims | Basis |
| --- | --- | --- |
| `/docs/overview/` | Public / product / management domains are separate; all modules Planned | Architecture invariants; no product deployment |
| `/docs/product-stages/` | Stage definitions, permitted CTA and promotion rules | `src/content/products.ts`; no promotion record exists |
| `/docs/security/` | Website static; management separate; credentials, SSRF, sanitized status, container isolation | Intended design; no product exists. Reporting gap stated explicitly. |
| `/privacy/` | No accounts, forms, first-party analytics or cookies; Cloudflare processes request logs | Static build and hosting configuration. No entity invented. |
| `/terms/` | Informational use only; no offer, service, account or guarantee | All modules Planned; no contract formed. |

## Things deliberately absent

- Customers, logos, testimonials, case studies, user counts.
- Prices, plans, checkout, payment links.
- Console, login, sign-up, API key, “Get started” buttons that lead nowhere.
- SLA, response time, certification, benchmark or performance numbers.
- Region claims for products or probes.
- Contact page, contact email, contact form, social links and GitHub links (no verified channel).
- Separately operated network services, their hostnames, addresses or topology.

## Known gaps (production blockers)

1. Legal entity, governing law and privacy contact are not established; `/privacy/` and `/terms/`
   say so explicitly.
2. No security reporting channel is published; `/docs/security/` records this gap.
3. Domain ownership and Cloudflare project are unverified; `NEXT_PUBLIC_SITE_ENV` stays `preview`.
4. Lighthouse results are not yet recorded; browser acceptance runs are recorded in
   `docs/acceptance.md`.
5. No operating entity is published. Until it is, `/privacy/` and `/terms/` cannot be treated as
   final legal notices.
