import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/**
 * Static site, built to `dist/` and served by the Workers Static Assets binding in
 * `wrangler.jsonc`. Every route is prerendered: there is no adapter, no server
 * runtime and no database behind the public site.
 */
export default defineConfig({
  site: 'https://caurium.tech',
  output: 'static',
  // Directory-style URLs (/products/gate/ -> dist/products/gate/index.html) match
  // the canonical form the sitemap, metadata and worker redirects already use.
  trailingSlash: 'always',
  build: {
    /*
     * Astro inlines stylesheets under 4 kB by default. The whole design system is one
     * ~90 kB sheet, so inlining it would re-send it with every page: leave it as a
     * hashed file under /_astro, which is cached immutably by public/_headers.
     */
    inlineStylesheets: 'never',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
