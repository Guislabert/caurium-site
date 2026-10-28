import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const OUT = 'out';

async function walk(dir) {
  const entries = await readdir(dir);
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry);
    const info = await stat(path);
    if (info.isDirectory()) files.push(...(await walk(path)));
    else if (path.endsWith('.html')) files.push(path);
    else if (/\/__next[\w.$-]*\.txt$/.test(path)) files.push(path); // RSC payloads
  }
  return files;
}

function targetFor(pathname) {
  const clean = pathname.split('#')[0].split('?')[0];
  if (clean === '/' || clean === '') return `${OUT}/index.html`;
  if (clean.endsWith('/')) return `${OUT}${clean}index.html`;
  if (/\.[a-z0-9]+$/i.test(clean)) return `${OUT}${clean}`;
  return `${OUT}${clean}/index.html`;
}

const files = await walk(OUT);
const failures = [];
const checked = new Set();

for (const file of files) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    if (value.startsWith('/cdn-cgi/')) continue;
    const target = targetFor(value);
    if (checked.has(target)) continue;
    checked.add(target);
    try {
      const info = await stat(target);
      if (!info.isFile()) throw new Error('not a file');
    } catch {
      failures.push(`${file}: ${value}`);
    }
  }
}

const sitemap = await readFile(`${OUT}/sitemap.xml`, 'utf8');
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(match[1]);
  const target = targetFor(url.pathname);
  try {
    const info = await stat(target);
    if (!info.isFile()) throw new Error('not a file');
  } catch {
    failures.push(`sitemap: ${match[1]}`);
  }
}

// Prose may legitimately name technical terms (e.g. SSRF protection against "localhost"),
// so scan only script payloads for leaked environment names or host addresses.
const scriptFiles = files.filter((file) => /\/__next/.test(file) || file.endsWith('.js'));
const allText = (await Promise.all(scriptFiles.map((file) => readFile(file, 'utf8')))).join('\n');
const forbidden = ['localhost:', '127.0.0.1', 'asterlyn', 'Guislabert', 'github.com', 'release-evidence'];
for (const phrase of forbidden) {
  if (allText.toLowerCase().includes(phrase.toLowerCase())) {
    failures.push(`forbidden string in build output: ${phrase}`);
  }
}

// Public HTML must not carry unverified marketing claims or private identifiers.
const htmlText = (await Promise.all(files.map((file) => readFile(file, 'utf8')))).join('\n');
const forbiddenClaims = [
  'enterprise-grade',
  'military-grade',
  'zero downtime',
  'deploy globally in seconds',
  'start building for free',
  'connect every tool',
  '99.9%',
  '100% uptime',
  'soc 2 certified',
  'iso 27001 certified',
  'net.caurium.tech',
  'us1.net',
  '198.51.100.',
  '203.0.113.',
  '192.0.2.',
];
for (const phrase of forbiddenClaims) {
  if (htmlText.toLowerCase().includes(phrase.toLowerCase())) {
    failures.push(`forbidden claim or identifier in HTML: ${phrase}`);
  }
}

if (failures.length > 0) {
  console.error(`Link/content check failed (${failures.length}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`Link check passed: ${files.length} HTML files, ${checked.size} internal targets, sitemap verified.`);
