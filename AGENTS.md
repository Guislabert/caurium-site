# Agent notes — Caurium website

The public site is a static Astro build (`output: 'static'`) deployed to Cloudflare Workers Static
Assets. Read `README.md` for the stack and `docs/` for the process; this file holds only the rules
that are easy to break by accident.

## Routes and content

- Every route is a file under `src/pages/`. Directory-style URLs (`/products/gate/`) come from
  `index.astro` files or `[slug].astro`, and `trailingSlash: 'always'`.
- `sitemap.xml`, `robots.txt`, `llms.txt` and `build-log/feed.xml` are `APIRoute` endpoints, not
  static files: they read the content modules so a claim cannot drift from the page.
- Indexable routes are declared once in `src/lib/routes.ts`. `tests/content.test.ts` compares that
  list to `src/pages/`, so a new page cannot ship unlisted and a deleted page cannot linger.
- All copy that states a fact comes from `src/content/`. A stage, price or boundary changed in a page
  without changing its record is a bug the tests catch.

## Rendering

- Astro trims whitespace between template text and an element. Where a sentence must not join the
  next word, write `{' '}` explicitly (`Content reviewed{' '}<time …>`).
- Slotted content is not a prop. A component that may receive `slot="meta"` must check
  `Astro.slots.has('meta')`, or the content renders nowhere.
- Interactive behaviour is a plain `<script>` in the component, guarded with
  `document.addEventListener('astro:page-load', …)` and a `data-bound` flag. There is no client
  framework; do not add one for a menu, a copy button or a fetch.
- The status panel writes remote data with `innerHTML`. Escape every field first.

## Checks

`pnpm check` runs `astro check`, ESLint (including `eslint-plugin-astro`), the content tests, the
build and `check:links` against `dist/`. Run it before committing; CI runs the same sequence.

## Branches

`main` is production, `dev` is the preview. They may differ only in the visual layer listed in
`scripts/check-branches.mjs`; `pnpm check:branches` fails on anything else.
