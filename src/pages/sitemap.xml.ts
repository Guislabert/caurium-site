import type { APIRoute } from 'astro';
import { BUILD_LOG } from '@/content/build-log';
import { SITE } from '@/content/site';
import { PUBLIC_ROUTES } from '@/lib/routes';

/**
 * A single `lastmod` on every URL tells a crawler nothing. The build log already records
 * the date each public page last changed, so the sitemap reuses it and falls back to the
 * site review date only where no entry exists.
 */
function lastRecordedChange(): Map<string, string> {
  const dates = new Map<string, string>();
  for (const entry of BUILD_LOG) {
    if (!entry.href) continue;
    const previous = dates.get(entry.href);
    if (!previous || entry.date > previous) dates.set(entry.href, entry.date);
  }
  return dates;
}

export const GET: APIRoute = () => {
  const origin = SITE.url.replace(/\/$/, '');
  const dates = lastRecordedChange();

  const urls = PUBLIC_ROUTES
    .map((path) => {
      const lastmod = dates.get(path) ?? SITE.reviewedAt;
      const priority = path === '/' ? '1.0' : '0.6';
      const changefreq = path === '/' ? 'weekly' : 'monthly';
      return `  <url>
    <loc>${origin}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
