import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/content/products';
import { SITE } from '@/content/site';

export const dynamic = 'force-static';

const PATHS = [
  '/',
  '/products/',
  ...PRODUCTS.map((product) => `/products/${product.slug}/`),
  '/architecture/',
  '/docs/',
  '/docs/overview/',
  '/docs/product-stages/',
  '/docs/security/',
  '/status/',
  '/privacy/',
  '/terms/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, '');
  const lastModified = new Date(`${SITE.reviewedAt}T00:00:00Z`);

  return PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.6,
  }));
}
