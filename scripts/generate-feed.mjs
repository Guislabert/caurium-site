import { mkdir, readFile, writeFile } from 'node:fs/promises';

const entries = JSON.parse(await readFile('src/content/build-log.json', 'utf8'));
const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://caurium.tech').replace(/\/$/, '');

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function pubDate(date) {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

const items = entries
  .map((entry) => {
    const url = entry.href ? `${base}${entry.href}` : `${base}/build-log/`;
    return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="false">${escapeXml(`${entry.date}-${entry.title}`)}</guid>
      <pubDate>${pubDate(entry.date)}</pubDate>
      <description>${escapeXml(entry.detail)}</description>
    </item>`;
  })
  .join('\n');

const latest = entries[0]?.date ?? new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Caurium build log</title>
    <link>${base}/build-log/</link>
    <description>A dated record of changes to the Caurium public site. No product is available.</description>
    <language>en</language>
    <lastBuildDate>${pubDate(latest)}</lastBuildDate>
${items}
  </channel>
</rss>
`;

await mkdir('public/build-log', { recursive: true });
await writeFile('public/build-log/feed.xml', xml);
console.log(`build log feed written (${entries.length} entries)`);
