import { PRODUCTS } from '@/content/products';

/**
 * The indexable routes, in one place.
 *
 * The sitemap builds from this list and the test suite compares it to the files in
 * `src/pages/`, so a page cannot be published without being listed and a removed page
 * cannot linger in the sitemap.
 *
 * `/start/received/` is deliberately absent: it is a noindex confirmation page.
 */
export const PUBLIC_ROUTES = [
  '/',
  '/products/',
  ...PRODUCTS.map((product) => `/products/${product.slug}/`),
  '/access/',
  '/start/',
  '/architecture/',
  '/docs/',
  '/docs/overview/',
  '/docs/product-stages/',
  '/docs/security/',
  '/docs/faq/',
  '/docs/glossary/',
  '/trust/',
  '/build-log/',
  '/status/',
  '/privacy/',
  '/terms/',
];
