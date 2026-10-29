# Branches and environments

Two branches, two Workers, one rule: a branch can only deploy the Worker it owns.

| Branch | Deploys to | URL | Indexable | Custom domain |
| --- | --- | --- | --- | --- |
| `main` | `caurium-site` | `caurium.tech` | only when `NEXT_PUBLIC_SITE_ENV=production` | apex + `www` |
| `dev` | `caurium-site-dev` | `caurium-site-dev.caurium.workers.dev` | never | none |
| any other | nothing | — | — | — |

## Why this shape

The environment is a **Worker name**, not a branch name. `wrangler.jsonc` names
`caurium-site`; `wrangler.dev.jsonc` names `caurium-site-dev`. Nothing else differs
between them, so the two environments cannot drift in behaviour — only in where the
bytes land.

A branch without a Worker of its own gets checks and nothing else. That is the point:
work in progress is verified, not published.

## What protects the separation

- **CI triggers.** `check` runs on every pull request and on pushes to `main` and `dev`.
- **Deploy conditions.** Each deploy job is pinned to one branch *and* one config:
  - `deploy` requires `refs/heads/main` and runs `wrangler deploy` with the default config
  - `deploy-dev` requires `refs/heads/dev` and runs `wrangler deploy --config wrangler.dev.jsonc`
- **Separate concurrency groups.** `production` and `dev-preview`, so a dev deploy
  never waits behind production, and `cancel-in-progress` differs on purpose: a stale
  preview is useless, a half-finished production deploy is not.
- **Branch protection.** Both branches require `Check and build`. `main` additionally
  requires the branch to be up to date before merging.
- **No custom domain on dev.** `caurium-site-dev` has no hostname bound, so it is
  reachable only at its `workers.dev` address. A broken redesign cannot serve the apex.
- **`NEXT_PUBLIC_SITE_ENV=preview` is hard-coded in the dev job.** Even if someone sets
  the repository variable to `production`, a preview build stays `noindex`.

## Working in two windows

Two checkouts can run side by side without interfering, because the branch decides
everything:

```sh
# window A — production work
git checkout main
pnpm dev            # localhost:3000

# window B — redesign work
git checkout dev
pnpm dev            # localhost:3000 too, so run one at a time or pass --port
```

Both serve on port 3000 by default. To run them at the same time, give one a port:

```sh
pnpm dev --port 3001
```

`.next` and `out` are build artifacts and are gitignored, so the two checkouts never
share them. If a build reports a lock from another process, it means a second
`next build` is running in the same checkout — not in the other one.

## Promoting dev to main

`dev` is where a redesign is prepared. It reaches production by merge, never by
pointing a deploy at it:

```sh
git checkout main
git merge --no-ff dev
git push origin main      # CI checks, then deploys caurium-site
```

## Adding another environment

Copy the shape, do not bend it:

1. `wrangler.<env>.jsonc` with a distinct `name`. Nothing else needs to differ.
2. A `deploy-<env>` job pinned to `refs/heads/<branch>` with `--config wrangler.<env>.jsonc`
   and its own `concurrency.group`.
3. No custom domain unless the environment is meant to be public.
4. `NEXT_PUBLIC_SITE_ENV=preview` unless it is production.

## The failure this prevents

Before this file existed, `dev` deployments were run by hand and carried no commit in
their version message, so the running code could not be traced to anything. The
production Worker and the dev Worker also shared one config, which meant a mistyped
deploy command could overwrite production with redesign work. Both are fixed: every
version message now carries a SHA and a branch ref, and the config is chosen by the
job rather than by the person running it.
