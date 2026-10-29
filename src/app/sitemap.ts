import type { MetadataRoute } from 'next';
import { BUILD_LOG } from '@/content/build-log';
import { PRODUCTS } from '@/content/products';
import { SITE } from '@/content/site';

export const dynamic = 'force-static';

const PATHS = [
  '/',
  '/products/',
  ...PRODUCTS.map((product) => `/products/${product.slug}/`),
  '/pricing/',
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

/**
 * A single `lastmod` on every URL tells a crawler nothing. The build log already
 * records the date each public page last changed, so the sitemap reuses it and
 * falls back to the site review date only where no entry exists.
 */
const LAST_RECORDED_CHANGE = new Map<string, string>();
for (const entry of BUILD_LOG) {
  if (!entry.href) continue;
  const previous = LAST_RECORDED_CHANGE.get(entry.href);
  if (!previous || entry.date > previous) LAST_RECORDED_CHANGE.set(entry.href, entry.date);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, '');

  return PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(`${LAST_RECORDED_CHANGE.get(path) ?? SITE.reviewedAt}T00:00:00Z`),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.6,
  }));
}
