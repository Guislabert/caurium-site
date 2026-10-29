# Caurium website

The public Caurium website: a static, evidence-first site for infrastructure products.

Every claim on the site maps to a record in `src/content/`. Probe is in private preview; Gate,
Guard and Box are `Planned` and are not for sale.

## What this repository is

- A static Astro build (`output: 'static'`), deployed to Cloudflare Workers Static Assets.
- The single source of truth for product stages, plan limits, boundaries and the claims
  register.
- Not the product. Probe runs as a separate Worker with its own database and scheduler. There is
  no runtime, login, payment or API route in this build.

## Requirements

- Node.js 22.23.4 or newer (verified with Node 26.9.0)
- pnpm 12.15.0 (`corepack enable` if pnpm is not installed)

## Local development

```bash
corepack enable
pnpm install
cp .env.example .env.local
pnpm dev            # http://localhost:4321
```

The application form at `/start/` posts to the Probe Worker. Cross-origin requests from
`http://localhost:4321` are not accepted by the deployed Worker, so submitting locally fails by
design until the Worker lists that origin. Point `PUBLIC_PROBE_URL` at a local stub to exercise the
success path. Everything else works offline.

## Branches, environments and versions

`main` is production and deploys `caurium-site`. `dev` is the preview and test bench and
deploys `caurium-site-dev`. The two may differ **only** in the visual layer, and
`pnpm check:branches` fails if they drift anywhere else.

Releases are annotated tags per branch: `v0.2.0` on `main`, `dev-v0.3.1` on `dev`.
Cut one with `pnpm release minor "…"`.

Full process, promotion rules and the version policy: [`docs/branches.md`](docs/branches.md).

## Checks

```bash
pnpm typecheck     # astro check (.astro, .ts, .tsx type checking)
pnpm lint          # ESLint, including eslint-plugin-astro
pnpm test          # Content, claims and status-contract tests
pnpm build         # Static build to dist/
pnpm check:links   # Internal links, sitemap and forbidden strings in dist/
pnpm check         # All of the above
```

`pnpm build` writes the static site to `dist/`. CI runs the same set on every pull request.

## Preview the exported site

```bash
pnpm build
pnpm start         # serves dist/ with serve
```

For the Cloudflare Workers Static Assets path, follow [`docs/deployment.md`](docs/deployment.md).

## Environment

| Variable | Purpose | Default |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, robots and the RSS feed | `https://caurium.tech` |
| `PUBLIC_SITE_ENV` | `preview` emits noindex + disallow-all robots; `production` enables indexing | `preview` |
| `PUBLIC_STATUS_URL` | Optional sanitized read-only status feed | empty (status shows “not connected”) |
| `PUBLIC_PROBE_URL` | Origin of the Probe Worker that receives `/start/` applications | `https://caurium-probe.caurium.workers.dev` |

These values are read at build time by `src/lib/env.ts` and embedded in the output. Change one,
rebuild, redeploy.

Changing `PUBLIC_PROBE_URL` also requires the origin in the `connect-src` and `form-action`
directives of `public/_headers`; `pnpm test` fails if they disagree.

Do not put secrets in `PUBLIC_*` or in this repository. The website build needs no product,
management or network credentials.

## Editing content

| File | Holds |
| --- | --- |
| `src/content/site.ts` | Brand, navigation, hero copy, footer groups, canonical URL, review date |
| `src/content/products.ts` | Gate, Probe, Guard and Box stages, scope, boundaries, release criteria, exclusions, examples |
| `src/content/plans.ts` | Probe sizes: endpoint limits, interval, retention. No prices. |
| `src/content/claims.ts` | The `/trust/` claims register: page, stage, evidence |
| `src/content/build-log.json` | Dated entries; `/build-log/feed.xml` renders them to RSS |
| `docs/content-audit.md` | Claim-to-evidence mapping, updated with any copy change |

Home, product pages, access, docs and metadata all read from these records. A product stage may
only change when its acceptance evidence is recorded; a shipped feature does not promote its
siblings or the module.

Routes are declared once in `src/lib/routes.ts`; the sitemap builds from it and `pnpm test` compares
it to `src/pages/`, so a page cannot ship unlisted.

Internal promotion evidence and the brand plan are kept outside this public repository and are
never copied to `public/` or `dist/`.

## Design and boundaries

- Visual direction: warm paper and off-white surfaces, navy ink, violet as the action colour, lime
  as the evidence marker, mono metadata, and the rounded-square C mark.
- Type: Roboto Slab for display, Inter for text, JetBrains Mono for metadata; self-hosted through
  the `@fontsource-variable/*` packages. Tokens live in `src/styles/globals.css`; the reasoning is in
  [`docs/design-system.md`](docs/design-system.md).
- No fabricated customers, logos, testimonials, metrics, uptime, SLAs, certifications or live
  consoles.
- The public site has no path to management, product APIs or separately operated network services.
- Illustrative diagrams and example APIs are labelled. Product examples carry a “Proposed …
  subject to change” note; diagrams carry an “Illustrative example” note.

## Structure

```text
src/pages/          routes (home, products, access, start, architecture, docs, status, legal, 404,
                    plus sitemap.xml, robots.txt, llms.txt and the RSS feed endpoints)
src/layouts/        the document shell (head, metadata, header and footer)
src/components/     shell, navigation, diagrams, product records, docs and legal layout
src/styles/         design tokens and component CSS (Tailwind v4)
src/content/        site, product, plan, claim and build-log records
src/lib/            env accessor, routes, JSON-LD and status-contract validation
public/             mark, icons, per-page OG cards, _headers, manifest
docs/               design, deployment, content audit, acceptance record
scripts/            brand generation, deployment checks and build-output checks
tests/              content invariants and status-contract tests
```

## Current state

Probe is a free private preview opened by ticket and activated by hand. No price is published and
nothing is charged. A size only sets the endpoint count and check-history retention. Monitoring for
this site is not connected, so `/status/` reports Unknown. Gate, Guard and Box are `Planned`. There
is no console, API key, checkout or self-serve signup.

This is a presentation site, not an acquisition channel: the build stays `noindex` and `robots.txt`
disallows everything. There is no IndexNow ping and no sitemap submission.

See [`docs/acceptance.md`](docs/acceptance.md) for the verification record and
[`docs/content-audit.md`](docs/content-audit.md) for the evidence behind every claim.

## License

MIT. See [`LICENSE.md`](LICENSE.md).
