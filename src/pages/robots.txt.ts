import type { APIRoute } from 'astro';
import { SITE } from '@/content/site';

/**
 * A preview build disallows everything. That is the point of the flag: the site can be
 * deployed and inspected before it is allowed to appear in search results.
 */
export const GET: APIRoute = () => {
  const origin = SITE.url.replace(/\/$/, '');

  const body = SITE.indexable
    ? `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
Host: ${origin}
`
    : `User-agent: *
Disallow: /
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
