import { readFile } from 'node:fs/promises';

const key = process.env.INDEXNOW_KEY;
if (!key || !/^[a-f0-9]{8,128}$/i.test(key)) {
  console.error('INDEXNOW_KEY must be 8-128 hex characters. See docs/indexnow.md.');
  process.exit(1);
}

const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://caurium.tech').replace(/\/$/, '');

let sitemap;
try {
  sitemap = await readFile('out/sitemap.xml', 'utf8');
} catch {
  console.error('out/sitemap.xml is missing. Run `pnpm build` first.');
  process.exit(1);
}

const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (urlList.length === 0) {
  console.error('out/sitemap.xml contains no URLs.');
  process.exit(1);
}

const payload = {
  host: new URL(origin).host,
  key,
  keyLocation: `${origin}/${key}.txt`,
  urlList,
};

const dryRun = process.env.INDEXNOW_DRY_RUN === '1';
if (dryRun) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

// The key file has to be reachable before the ping, otherwise the engine rejects it.
const keyFile = `out/${key}.txt`;
let published = null;
try {
  published = (await readFile(keyFile, 'utf8')).trim();
} catch {
  console.error(`${keyFile} is missing. Write the key to public/${key}.txt and rebuild.`);
  process.exit(1);
}
if (published !== key) {
  console.error(`${keyFile} does not contain INDEXNOW_KEY.`);
  process.exit(1);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

// 200 and 202 both mean accepted; 422 means the payload or key was rejected.
console.log(`IndexNow ${response.status} for ${urlList.length} URLs`);
if (!response.ok) {
  console.error(await response.text());
  process.exit(1);
}
