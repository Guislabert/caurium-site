import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (!SITE.indexable) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE.url.replace(/\/$/, '')}/sitemap.xml`,
    host: SITE.url.replace(/\/$/, ''),
  };
}
