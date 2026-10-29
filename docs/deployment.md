# Deployment

> This document describes the Cloudflare Workers Static Assets setup and the verification steps.
> It is not a completion report; verify the current deployment in the Cloudflare dashboard.

## 1. Project settings

| Setting | Value |
| --- | --- |
| Hosting product | Cloudflare Workers Static Assets (`wrangler.jsonc`) |
| Repository | to be confirmed before creation (do not duplicate an existing project) |
| Production branch | `main` (protected) |
| Build command | `pnpm build` |
| Build output directory | `out` |
| Node version | `22.23.4` or newer (verified locally on 26.9.0) |
| Package manager | `pnpm@12.15.0` (declared in `package.json`) |

Environment variables for preview:

```text
NEXT_PUBLIC_SITE_URL=https://<preview-or-production-origin>
NEXT_PUBLIC_SITE_ENV=preview
NEXT_PUBLIC_STATUS_URL=
```

Production:

```text
NEXT_PUBLIC_SITE_URL=https://caurium.tech
NEXT_PUBLIC_SITE_ENV=production
NEXT_PUBLIC_STATUS_URL=            # only after a sanitized endpoint exists
```

Preview must stay `preview`: the build emits `noindex` metadata and a disallow-all `robots.txt`.
Never reuse production upstream secrets in a preview build; this site needs none.

## 2. Deployment

Pushes to `main` deploy automatically. The `deploy` job in
`.github/workflows/actions.yaml` builds and runs `wrangler deploy --message "<sha> <ref>"`, so the
Worker version list names the commit that produced it, which the manual flow below did not.

This is a presentation site. It has no search or answer-engine submission step: no IndexNow ping,
no sitemap push. The build stays `noindex` and `robots.txt` disallows everything until the site is
meant to be found.

Required repository configuration:
- Secrets: `CLOUDFLARE_API_TOKEN` (a scoped API token, not an OAuth login: Workers Scripts
  edit on this account only), `CLOUDFLARE_ACCOUNT_ID` (`REDACTED`).
- Variable: `CLOUDFLARE_DEPLOY=enabled`. The job only runs when this is set, so a fork or a
  fresh clone does not attempt a deploy. Once it is enabled, a missing secret fails the job
  instead of silently reporting success without deploying.
- Variables: `NEXT_PUBLIC_SITE_ENV` (`preview` until release), `NEXT_PUBLIC_PROBE_URL`,
  optional `NEXT_PUBLIC_STATUS_URL`. The first two are already set on the repository.

Current state: all three are configured, so a push to `main` deploys. `wrangler` is a
devDependency; the job runs the repository's own binary, not a globally installed one, so the
version is pinned by `pnpm-lock.yaml`.

Rotate the token in the Cloudflare dashboard and re-set the secret; the old value stops working
the moment it is rolled in the account.

The first manual deployment, if the project does not exist yet:

1. Verify repository ownership and whether a Cloudflare project already exists.
2. Create or confirm the Workers project from the repository. Build with `pnpm build`; `wrangler.jsonc` serves `./out`.
3. Deploy a preview and check every route against `docs/acceptance.md`.
4. Bind the custom domain through Workers → Settings → Domains & Routes. Use the product flow; do
   not hand-write a CNAME to an unknown target.
5. Bind `www` to the same Worker. `src/worker.ts` answers 301 to the apex, preserving path and
   query string. `run_worker_first` is required, otherwise the asset layer answers before the
   host check runs. `_redirects` cannot do this: Workers Static Assets only accepts relative
   targets there.
6. Verify the certificate chain, canonical URLs, sitemap, robots, security headers, 404 status and
   the status-page fallback.
7. Record commit, build ID, deployment ID, timestamp, domain and the previous rollback version.

Do not change existing DNS records for separately operated services. Export the zone read-only
first, diff the intended change set, and apply only the records required for this site.

## 2b. Build assets

`pnpm build` does not regenerate brand assets. `public/brand/*`, `public/favicon.ico` and
`public/og/*.png` are committed outputs of `pnpm brand`. Run it only when the mark, palette or OG
copy changes, then rebuild and inspect one card from each route group (home, product, docs,
status). The generator uses `sharp`; it is a build-time dependency, not a runtime one.

## 3. Headers and caching

`public/_headers` is copied into `out/`. It sets:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `X-Frame-Options: DENY`
- `Content-Security-Policy-Report-Only` with `default-src 'self'`, inline styles/scripts (required by
  the static Next.js bootstrap), `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`
- Long cache for `/_next/static/*`, daily cache for `/og/*` and `/brand/*`, revalidation for HTML.

The policy already names the Probe Worker origin in `connect-src` and `form-action`, because the
application form posts there. A test fails if those two disagree with `NEXT_PUBLIC_PROBE_URL`.

If `NEXT_PUBLIC_STATUS_URL` is configured, add its origin to `connect-src`.

Before switching the policy from Report-Only to enforcing, two known violations must clear:
- Cloudflare injects `https://static.cloudflareinsights.com/beacon.min.js` at the edge, which
  `script-src 'self' 'unsafe-inline'` blocks. Either allow that origin or disable the automatic
  Web Analytics injection for this Worker.
- Do not add a fixed CSP nonce without a runtime that can generate it.

HSTS: enable only on a verified host, starting with a short max-age. Do not add
`includeSubDomains` or `preload` while unverified subdomains exist.

## 4. Dynamic pieces

This site has no runtime. The status view is a client-side fetch only when
`NEXT_PUBLIC_STATUS_URL` is set; it validates schema, component allow-list, timestamps and staleness
(180 seconds). A contact form, Gate API or other dynamic surface must be a separate Worker with its
own credentials, limits and storage — not a Next.js Route Handler in a static export.

## 5. Rollback

1. In Cloudflare Workers, roll back to the previous version or redeploy the previous commit.
2. Re-check the home page, product stages, navigation, canonical and status fallback.
3. DNS changes roll back separately; do not assume they follow the deployment.
4. Record the reason, deployment IDs and verification result.

## 6. Inputs still required before production

- Verified domain ownership and Cloudflare zone access.
- Confirmed Workers project ownership and production branch.
- Real legal entity, privacy contact and security contact.
- Decision on whether `NEXT_PUBLIC_STATUS_URL` exists.
- Lighthouse runs in the target environment (see `docs/acceptance.md`).
- Deployed-preview checks for `_headers`, CSP Report-Only and the 404 response.

Until these exist, `NEXT_PUBLIC_SITE_ENV` must stay `preview`; do not point the production domain
at a build whose legal pages name no entity.
