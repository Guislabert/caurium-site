# Content audit

Every public claim, its stage and its evidence. Update this file whenever copy changes.

Review date: 2026-10-28. Reviewed by: operator (in progress). Promotion evidence is retained in an
internal record outside this public repository and is never shipped in the site build.

## Brand

| Claim | Where | Stage | Evidence |
| --- | --- | --- | --- |
| “API access, monitoring and recovery.” | `SITE.tagline`, footer, default metadata | positioning statement | No capability implied beyond the four modules. |
| “Infrastructure with boundaries you can check.” | home H1 | brand line | No capability claim. |
| “Caurium is building four narrow infrastructure modules: Gate … Probe … Guard … Box. All four are Planned.” | `SITE.description`, hero, page metadata | factual | Four product records in `src/content/products.ts`; no deployment exists. |
| “Early development. No module is available for use.” | hero, proof strip, footer | factual | All products `planned`; no endpoint, console, key or payment flow. |

Retired positioning — “Developer infrastructure & AI connectivity” and “Infrastructure for a
connected world” — has been removed from the root metadata, manifest and OG card generator. A test
fails if either phrase returns.

## Home page

| Section | Claim | Stage | Evidence |
| --- | --- | --- | --- |
| Proof strip | Four modules, all Planned | factual | `PRODUCTS`; stage dictionary. |
| Proof strip | Live endpoints: None | factual | No product deployment. |
| Proof strip | Status feeds: Not connected | factual | `NEXT_PUBLIC_STATUS_URL` unset. |
| Proof strip | Last review: 28 Oct 2026 | factual | `SITE.reviewedAt`. |
| 01 Problem | Four failure modes are “design targets, not observed incidents” | intended design | Section states no incident is being described. |
| 02 Products | Four modules, four narrow jobs | factual | Product records. |
| 03 Workflow | Connect / Observe / Operate | intended design | Caption says none of it is live today. |
| 04 Principles | One credential per caller; a boundary is not a hidden URL; Unknown is valid; capability requires a record | intended design | Matches module boundaries. |
| 05 Boundaries | Trust is a boundary, not a badge | factual | Links to `/trust/` register and known gaps. |
| 06 Documentation | Read what exists before relying on it | factual | Links to overview, stages, security, FAQ. |
| 07 Status | All states Unknown until a feed is connected | factual | Status validator defaults to Unknown. |
| 08 Build log | Read the plan, check the evidence | factual | Dated entries; RSS feed. |

## Products

| Product | Stage | Added content | Evidence |
| --- | --- | --- | --- |
| Gate | Planned | Use case, 7 scope items, 3 design decisions, 4 open questions, 5 FAQs, 6 release criteria, 3 exclusions | No deployment. |
| Probe | Planned | Use case, 7 scope items, 3 design decisions, 4 open questions, 5 FAQs, 6 release criteria, 3 exclusions | No probe running. |
| Guard | Planned | Use case, 7 scope items, 3 design decisions, 4 open questions, 5 FAQs, 6 release criteria, 3 exclusions | No restore recorded. |
| Box | Planned | Use case, 7 scope items, 3 design decisions, 4 open questions, 5 FAQs, 6 release criteria, 3 exclusions | No instance delivered. |

Home page, `/products/`, `/docs/product-stages/`, each product page and page metadata read the
stage from `src/content/products.ts`. A test enforces that no product or feature is promoted
without also editing the supporting record.

Design decisions and open questions are published as design intent, not as capability claims. The
product page says so above both sections.

## Claims register (`/trust/`)

| Group | Claims | Label |
| --- | --- | --- |
| Current state | Four modules; all Planned; no account, console, key, payment or contact form; static Workers hosting; no first-party tracking; monitoring not connected | Fact |
| Module design | Gate one upstream; Probe authorized targets; Guard restore evidence; Box container isolation | Planned |
| Proposed material | Product examples are contracts, not endpoints; status only from sanitized checks | Intended design |
| Missing items | No security reporting channel; no legal entity or governing law | Known gap |

`src/content/claims.ts` is the source. Each record carries the page, anchor and evidence. The page
states that the register wins if it disagrees with any other copy.

## Build log and FAQ

| Surface | Claim | Stage | Evidence |
| --- | --- | --- | --- |
| `/build-log/` | Dated record of changes, corrections and removals | factual | `src/content/build-log.json`; RSS generated at build time. |
| `/build-log/` | No release dates, newsletter or “notify me” flow | factual | No form, email capture or subscription code. |
| `/docs/faq/` | Availability, prices, regions, status, examples, reporting | factual | Answers restate existing boundaries; no new capability claim. |
| `/docs/glossary/` | Module, stage, health, sanitized status, evidence, Unknown, boundary | factual | Definitions match product and status records. |

## Illustrative material

| Item | Location | Label |
| --- | --- | --- |
| Fig. 01 — roadmap architecture (four modules and boundaries) | home | “Illustrative example — not a live service.” + `Planned` badge |
| Workflow (Connect / Observe / Operate) | home | “What you would see … None of this is live today.” |
| Fig. 06 — service boundaries | `/architecture/` | “Planned architecture — illustrative, not a deployed system.” + `Current` / `Planned` legend |
| Product workflow lists and spec panel | each product page | `Planned` badge; intended workflow |
| Gate curl example | `/products/gate/` | “Proposed request contract — subject to change”, `api.example.com`, `YOUR_API_KEY` |
| Probe status example | `/products/probe/` | “Proposed schema — subject to change”; feed not connected |
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
| `/docs/security/` | Website static; management separate; credentials, SSRF, sanitized status, container isolation; threat model | Intended design; no product exists. Reporting gap stated explicitly. |
| `/docs/faq/` | Short answers about availability, price, regions, status and reporting | Restates boundaries; links to the claims register |
| `/docs/glossary/` | Term definitions used across the site | Product, stage and status records |
| `/trust/` | Claims register, separation model, not-claimed list, known gaps | `src/content/claims.ts`; gaps recorded as production blockers |
| `/privacy/` | No accounts, forms, first-party analytics or cookies; Cloudflare processes request logs | Static build and hosting configuration. No entity invented. |
| `/terms/` | Informational use only; no offer, service, account or guarantee | All modules Planned; no contract formed. |

## docs.caurium.tech (separate repository)

The documentation site previously described a live five-region managed service with prices, plans,
SLAs, customer references and contact addresses. That contradicted every public product record.
It has been rewritten as design documentation:

| Removed | Replaced with |
| --- | --- |
| Base managed hosting and named customers | Four module records: Gate, Probe, Guard, Box — all Planned |
| Five regions and residency claims | “No region claim until a deployment exists and is measured” |
| Prices, plans, billing terms and SLAs | “No price or plan is published”; measured restore duration instead of a promised RTO |
| `hello@` and `security@` addresses | Explicit known-gap statement; no address is published |
| Provisioning timelines, invoices, monthly reports | Intended workflow, boundaries and release criteria |

Each page carries a banner stating that no module is available and links to the claims register.
Old service-guide URLs redirect to their replacements. The docs site links to `caurium.tech` with
absolute URLs because it is a separate deployment.

## Things deliberately absent

- Customers, logos, testimonials, case studies, user counts.
- Prices, plans, checkout, payment links.
- Console, login, sign-up, API key, “Get started” buttons that lead nowhere.
- SLA, response time, certification, benchmark or performance numbers.
- Region claims for products or probes.
- Contact page, contact email, contact form, social links and GitHub links (no verified channel).
- Newsletter, email capture or “notify me” flow.
- Separately operated network services, their hostnames, addresses or topology.

## Known gaps (production blockers)

1. Legal entity, governing law and privacy contact are not established; `/privacy/` and `/terms/`
   say so explicitly.
2. No security reporting channel is published; `/docs/security/` and `/trust/#gaps` record this gap.
3. Domain ownership and Cloudflare project are unverified; `NEXT_PUBLIC_SITE_ENV` stays `preview`.
4. Lighthouse results are not yet recorded; browser acceptance runs are recorded in
   `docs/acceptance.md`.
5. No operating entity is published. Until it is, `/privacy/` and `/terms/` cannot be treated as
   final legal notices.
