import type { APIRoute } from 'astro';
import { BUILD_LOG } from '@/content/build-log';
import { SITE } from '@/content/site';

/**
 * The build log as RSS. Generated from `src/content/build-log.json`, so an entry that
 * appears on the page appears in the feed with the same wording.
 */
function escapeXml(value: string) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function pubDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

export const GET: APIRoute = () => {
  const base = SITE.url.replace(/\/$/, '');
  const latest = BUILD_LOG[0]?.date ?? new Date().toISOString().slice(0, 10);

  const items = BUILD_LOG.map((entry) => {
    const url = entry.href ? `${base}${entry.href}` : `${base}/build-log/`;
    return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="false">${escapeXml(`${entry.date}-${entry.title}`)}</guid>
      <pubDate>${pubDate(entry.date)}</pubDate>
      <description>${escapeXml(entry.detail)}</description>
    </item>`;
  }).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Caurium build log</title>
    <link>${base}/build-log/</link>
    <description>A dated record of changes to the Caurium public site. Probe is in private preview; Gate, Guard and Box are planned.</description>
    <language>en</language>
    <lastBuildDate>${pubDate(latest)}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
