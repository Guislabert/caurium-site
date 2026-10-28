# Caurium

The public website for **Caurium** — a managed infrastructure practice for teams going global. Caurium operates environments in Germany, the United States, Singapore, Japan, and Australia, and covers hosting, synthetic monitoring, and recovery.

- **Caurium Base** — managed multi-region hosting.
- **Caurium Probe** — synthetic checks, alerting, and status pages.
- **Caurium Guard** — encrypted backups, a warm standby, and failover drills.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Brand home: positioning, products, operating model, regions, pricing preview, FAQ |
| `/base` | Managed hosting product page |
| `/probe` | Monitoring product page |
| `/guard` | Backup and recovery product page |
| `/pricing` | Plans and exclusions |
| `/regions` | The five live regions and expansion process |
| `/about` | Principles, how we work, and what Caurium is not |
| `/contact` | What to include in a first message |
| `/trust` | Security controls and data handling |
| `/privacy`, `/terms` | Legal pages |
| `/404` | Not-found page |

## Stack

- [Astro 7](https://astro.build/) with the [AstroWind](https://github.com/arthelokyo/astrowind) integration for config and SEO metadata (MIT licensed).
- Tailwind CSS v4 is present through AstroWind; the Caurium visual system lives in `src/styles/caurium.css` and does not depend on theme widgets.
- Astro's native Fonts API self-hosts Inter, Roboto Slab, and JetBrains Mono.
- Fully static output — no adapter, no server runtime.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview
```

Node 22.23.4 or newer is required by Astro 7.

## Deploying to Cloudflare

### Pages

1. Create a Pages project from the `Guislabert/caurium-site` repository.
2. Framework preset: **Astro**.
3. Build command: `npm run build`.
4. Build output directory: `dist`.
5. Environment variable: `NODE_VERSION=22.23.4`.
6. Add the custom domain `caurium.tech` (and `www` if required) in **Custom domains**.

### Workers static assets

`wrangler.jsonc` is also included, with `assets.directory` set to `./dist`, for deploying the same build as a Worker:

```bash
npm run build
npx wrangler deploy
```

## Editing content

- Brand and SEO defaults: `src/config.yaml`.
- Navigation and footer: `src/navigation.ts`.
- Region list: `src/data/regions.ts`.
- Visual tokens: `src/styles/caurium.css`.
- Layout shell: `src/layouts/CauriumLayout.astro`, `src/layouts/CauriumMarkdownLayout.astro`.

Keep the content factual. The site deliberately does not claim customers, certifications, uptime percentages, or a public API that do not exist. The console on the home page is labelled as illustrative and is not live data.

## License and attribution

The AstroWind integration is MIT licensed; see `LICENSE.md`. The Caurium design, copy, and visual assets in this repository are original work.
