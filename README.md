# Caurium website

Static brand and roadmap site for Caurium — developer infrastructure and AI connectivity.

Built with Next.js App Router (static export), TypeScript and Tailwind CSS. The first delivery
target is a previewable, honest website MVP: every product is `Planned`, and no page implies a
service that does not exist.

## Requirements

- Node.js 22.23.4 or newer (verified with Node 26.9.0)
- pnpm 12.15.0 (`corepack enable` if pnpm is not installed)

## Local development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

## Checks

```bash
pnpm typecheck     # TypeScript
pnpm lint          # ESLint
pnpm test          # Content and status-contract tests
pnpm build         # Static export to out/
pnpm check:links   # Internal links and forbidden strings in out/
pnpm check         # All of the above
```

`pnpm build` writes a static site to `out/`. There is no server runtime, database, login,
subscription or API route.

## Preview the exported site

```bash
pnpm build
pnpm start
```

`pnpm start` serves `out/` locally with `serve`. For a Cloudflare Workers Static Assets preview, follow
[`docs/deployment.md`](docs/deployment.md).

## Environment

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and robots | `https://caurium.tech` (unverified) |
| `NEXT_PUBLIC_SITE_ENV` | `preview` emits noindex + disallow-all robots; `production` enables indexing | `preview` |
| `NEXT_PUBLIC_STATUS_URL` | Optional sanitized read-only status endpoint | empty (status shows “not connected”) |

`NEXT_PUBLIC_*` values are embedded in the build. Change one, rebuild, redeploy.

Do not put secrets in `NEXT_PUBLIC_*` or in this repository. The website build requires no product,
management or network credentials.

## Editing content

- `src/content/site.ts` — brand, navigation, hero copy, footer groups, canonical URL.
- `src/content/products.ts` — the single source of truth for Gate, Probe, Guard and Box stages,
  scope, boundaries, release criteria, explicit exclusions and examples. Home, product pages,
  docs and metadata all read from here.
- `scripts/generate-brand.mjs` — generates the v1 rounded-square C mark, favicons, app icons and
  the per-page Open Graph cards in `public/og/`. Run `pnpm brand` after changing the mark geometry;
  keep it in sync with `src/components/Logo.tsx`.
- `src/app/docs/*` — substantive documentation pages.
- `docs/content-audit.md` — claim-to-evidence mapping. Update it with any content change.
- Internal promotion evidence and the brand/business plan are retained outside this public
  repository and are never copied to `public/` or `out/`.

A product stage may only change when its acceptance evidence is recorded. A feature that ships
does not promote sibling features or the module itself.

## Design and boundaries

- Visual direction: v1 editorial engineering — warm paper and off-white surfaces, navy ink,
  violet as the action colour, lime as the evidence marker, rounded figure cards, mono metadata
  and the v1 rounded-square C mark.
- Type: Roboto Slab for display, Inter for text, JetBrains Mono for metadata; self-hosted through
  the `@fontsource-variable/*` packages.
- Design tokens live in `src/app/globals.css`; the reasoning is recorded in
  [`docs/design-system.md`](docs/design-system.md).
- No fabricated customers, logos, testimonials, metrics, uptime, SLAs, prices, certifications or
  live consoles.
- The public site has no path to management, product APIs or separately operated network services.
- All illustrative diagrams and example APIs are labelled. Every product example carries a
  “Proposed … subject to change” note; diagrams carry an “Illustrative example” note.
- The brand and business plan is an internal document and is not published in this repository.

## Structure

```text
src/app/            routes (home, products, architecture, docs, status, legal, 404)
src/components/     shell, navigation, diagrams, product records, docs and legal layout
src/content/        site and product records
src/lib/            metadata and status-contract validation
public/             four-node mark, icons, per-page OG cards, _headers, manifest
docs/               brand, design, deployment, content audit, acceptance, release evidence
scripts/            brand generation and build-output link checks
tests/              content invariants and status-contract tests
```

## Current state

All four products are `Planned`. Monitoring is not connected. No account, console, API key,
payment flow or contact form exists. See `docs/acceptance.md` for the verification record.
