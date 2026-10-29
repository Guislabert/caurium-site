import { readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

/**
 * Brand asset generator.
 *
 * The mark is the v1 rounded-square C used by src/components/CauriumMark.astro.
 * Keep the geometry here in sync with that component if the mark changes.
 */

// Read from src/styles/globals.css. The generator used to carry its own copy of the v1
// navy/paper palette, so a reskin left the mark, favicons and OG cards on the old
// colours while every page had moved on. One source now.
const TOKENS = Object.fromEntries(
  [...readFileSync('src/styles/globals.css', 'utf8').matchAll(/(--[a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g)]
    .map((m) => [m[1], m[2]]),
);

function token(name) {
  const value = TOKENS[name];
  if (!value) throw new Error(`token ${name} missing from globals.css`);
  return value;
}

const INK = token('--ink');
const INK_2 = token('--ink-2');
const CREAM = token('--paper');
const SURFACE = token('--background');
const MUTED = token('--muted');
const BORDER = token('--border');
const BORDER_STRONG = token('--border-strong');
const ACCENT = token('--accent');
const ACCENT_SOFT = token('--accent-soft');
const LIME = token('--accent');

const SERIF = 'DejaVu Serif, Liberation Serif, Georgia, serif';
const MONO = 'DejaVu Sans Mono, Liberation Mono, monospace';

function mark({ bg = INK, fg = CREAM, dot = LIME } = {}) {
  return `<rect x="1" y="1" width="30" height="30" rx="9" fill="${bg}"/><path d="M21.4 9.9a8.2 8.2 0 1 0 0 12.2" fill="none" stroke="${fg}" stroke-width="3" stroke-linecap="round"/><circle cx="23.6" cy="16" r="2.2" fill="${dot}"/>`;
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function iconSvg(size, bg, fg, dot) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${bg}"/>
  <path d="M44.5 19.5a17.5 17.5 0 1 0 0 25" fill="none" stroke="${fg}" stroke-width="7.5" stroke-linecap="round"/>
  <circle cx="48.5" cy="32" r="4.8" fill="${dot}"/>
</svg>`;
}

async function png(svg, size, file) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(file);
}

function icoEntry(pngBuffer, size, offset) {
  const entry = Buffer.alloc(16);
  entry[0] = size >= 256 ? 0 : size;
  entry[1] = size >= 256 ? 0 : size;
  entry[2] = 0;
  entry[3] = 0;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(offset, 12);
  return entry;
}

async function buildIco(sizes) {
  const pngs = await Promise.all(
    sizes.map((size) =>
      sharp(Buffer.from(iconSvg(size, INK, CREAM, LIME)))
        .resize(size, size)
        .png()
        .toBuffer(),
    ),
  );
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);

  const entries = [];
  let offset = 6 + sizes.length * 16;
  for (let i = 0; i < sizes.length; i += 1) {
    entries.push(icoEntry(pngs[i], sizes[i], offset));
    offset += pngs[i].length;
  }

  return Buffer.concat([header, ...entries, ...pngs]);
}

function wordmark(width, fg, inverse = false) {
  const markup = inverse ? mark({ bg: CREAM, fg: INK }) : mark();
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="40" viewBox="0 0 ${width} 40">
  <g transform="translate(0 4)">${markup}</g>
  <text x="44" y="28" font-family="${SERIF}" font-size="23" font-weight="600" letter-spacing="-0.4" fill="${fg}">Caurium</text>
</svg>`;
}

/** Wraps text toward a maximum character count without breaking words. */
function wrap(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

const PAGES = {
  home: {
    kicker: 'Caurium · Probe private preview',
    title: 'Infrastructure with boundaries you can check.',
    description:
      'Probe checks the endpoints you own, alerts a webhook and publishes a sanitized status page. Gate, Guard and Box remain planned.',
    footer: 'PROBE PRIVATE PREVIEW · €19–€99/MONTH',
    badge: 'PRIVATE PREVIEW',
    chips: [
      ['Gate', 'Access', 'Planned'],
      ['Probe', 'Observe', 'Preview'],
      ['Guard', 'Safeguard', 'Planned'],
      ['Box', 'Environments', 'Planned'],
    ],
  },
  products: {
    kicker: 'Products · One live, three planned',
    title: 'Four narrow modules. One boundary each.',
    description: 'Probe is live in private preview. Gate, Guard and Box remain planned.',
    footer: 'PROBE LIVE · THREE PLANNED',
    badge: 'ONE LIVE',
    chips: [
      ['Gate', 'Access', 'Planned'],
      ['Probe', 'Observe', 'Private preview'],
      ['Guard', 'Safeguard', 'Planned'],
      ['Box', 'Environments', 'Planned'],
    ],
  },
  gate: {
    kicker: 'Gate · Planned',
    title: 'Controlled API access.',
    description:
      'One endpoint, one allow-listed upstream, per-caller credentials and limits that are enforced before the request leaves.',
    footer: 'PLANNED · NO CALLABLE ENDPOINT',
  },
  probe: {
    kicker: 'Probe · Private preview',
    title: 'Know when a service needs attention.',
    description:
      'Checks owner-authorized endpoints, opens one incident after three failures, alerts a webhook and publishes sanitized state.',
    footer: 'PRIVATE PREVIEW · MANUAL ACTIVATION',
    badge: 'PRIVATE PREVIEW',
  },
  guard: {
    kicker: 'Guard · Planned',
    title: 'Operational safeguards.',
    description:
      'Backups, recovery procedures and access records that can be repeated under pressure.',
    footer: 'PLANNED · NO MANAGEMENT ACCESS',
  },
  box: {
    kicker: 'Box · Planned',
    title: 'Invitation-only development environments.',
    description: 'Scoped, short-lived instances for known users — honest about container isolation.',
    footer: 'PLANNED · NO PUBLIC CONSOLE',
  },
  architecture: {
    kicker: 'Architecture',
    title: 'Designed around clear service boundaries.',
    description:
      'Public site, product services and management access are separate deployments with separate credentials.',
    footer: 'PROBE LIVE · MANAGEMENT PLANNED',
    badge: 'PARTIAL',
  },
  docs: {
    kicker: 'Documentation',
    title: 'Understand the system before you use it.',
    description:
      'System overview, the product-stage dictionary and security boundaries — recorded with the stage each claim actually holds.',
    footer: 'DOCUMENTATION · REVIEWED 2026-10-29',
    badge: 'REVIEWED 29 OCT',
  },
  access: {
    kicker: 'Probe · Access',
    title: 'Three sizes. Free, by application.',
    description:
      'The private preview costs nothing. A size sets the endpoint count and how long check history is kept; every size checks every minute.',
    footer: 'FREE PRIVATE PREVIEW · BY APPLICATION',
    badge: 'FREE PREVIEW',
  },
  start: {
    kicker: 'Probe · Application',
    title: 'Send the endpoints. We check ownership.',
    description:
      'Applications are reviewed by hand. Every account has a named owner and an agreed endpoint list before monitoring starts.',
    footer: 'MANUAL REVIEW · NO SLA',
    badge: 'APPLY',
  },
  status: {
    kicker: 'Service status',
    title: 'Status pages from sanitized checks.',
    description:
      'Probe customer status pages are live. The site-wide feed is not connected. Without valid data, the state is Unknown.',
    footer: 'PROBE CUSTOMER PAGES LIVE · SITE FEED NOT CONNECTED',
    badge: 'PARTIAL',
  },
  trust: {
    kicker: 'Trust · Claims',
    title: 'Trust is a boundary, not a badge.',
    description:
      'Every public claim labelled with its stage and its evidence. No customer references, regions, SLAs or certifications. Prices apply to Probe only.',
    footer: 'CLAIMS REVIEWED 2026-10-29',
    badge: 'REVIEWED 29 OCT',
  },
  legal: {
    kicker: 'Privacy & terms',
    title: 'What is collected, and on what basis.',
    description:
      'The privacy notice covers application details, Probe account data and check metadata. The terms cover the private preview and publish no SLA.',
    footer: 'LEGAL NOTICES · PRIVATE PREVIEW',
    badge: 'LEGAL',
  },
  'build-log': {
    kicker: 'Build log',
    title: 'A dated record of what changed.',
    description:
      'What changed on the public site, what was corrected, and what is still missing. No release dates.',
    footer: 'RSS FEED · NO NEWSLETTER',
  },
};

function ogSvg(key, page) {
  const titleLines = wrap(page.title, 20);
  const descLines = wrap(page.description, 66).slice(0, 3);
  // Three-line titles need to start higher and set smaller so the description
  // still clears the chip row at y=506.
  const titleStartY = titleLines.length > 2 ? 216 : titleLines.length > 1 ? 300 : 342;
  const titleSize = titleLines.length > 2 ? 54 : 68;

  const titleMarkup = titleLines
    .map(
      (line, index) =>
        `<text x="72" y="${titleStartY + index * (titleSize + 8)}" font-family="${SERIF}" font-size="${titleSize}" font-weight="600" letter-spacing="-1.8" fill="${INK}">${escapeXml(line)}</text>`,
    )
    .join('');

  const descStartY = titleStartY + (titleLines.length - 1) * (titleSize + 8) + 54;
  const descMarkup = descLines
    .map(
      (line, index) =>
        `<text x="74" y="${descStartY + index * 32}" font-family="${SERIF}" font-size="21" fill="${INK_2}">${escapeXml(line)}</text>`,
    )
    .join('');

  const chips = page.chips ?? [];
  const chipWidth = chips.length ? (1056 - (chips.length - 1) * 16) / chips.length : 0;
  const chipMarkup = chips
    .map(([name, role, status = 'Planned'], index) => {
      const x = 72 + index * (chipWidth + 16);
      const live = status !== 'Planned';
      const note = `${role.toUpperCase()} · ${status.toUpperCase()}`;
      const noteSize = note.length > 22 ? 8.6 : 10.5;
      return `
    <rect x="${x}" y="506" width="${chipWidth}" height="72" rx="18" fill="${live ? ACCENT_SOFT : SURFACE}" stroke="${live ? ACCENT : BORDER}"/>
    <circle cx="${x + 20}" cy="531" r="4" fill="${live ? ACCENT : MUTED}"/>
    <text x="${x + 34}" y="537" font-family="${SERIF}" font-size="19" font-weight="600" fill="${INK}">${escapeXml(name)}</text>
    <text x="${x + 20}" y="561" font-family="${MONO}" font-size="${noteSize}" fill="${live ? ACCENT : MUTED}" letter-spacing="1.2">${escapeXml(note)}</text>`;
    })
    .join('');

  const packageName = key === 'home' ? 'caurium' : `caurium-${key}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${INK}" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="${CREAM}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="${BORDER}"/>

  <g transform="translate(64 44) scale(1.1)">${mark()}</g>
  <text x="110" y="73" font-family="${SERIF}" font-size="23" font-weight="600" letter-spacing="-0.3" fill="${INK}">Caurium</text>
  <text x="72" y="118" font-family="${MONO}" font-size="11" fill="${MUTED}" letter-spacing="1.8">${escapeXml(page.kicker.toUpperCase())}</text>

  ${(() => {
    const badge = (page.badge ?? 'PLANNED').toUpperCase();
    const live = badge !== 'PLANNED';
    const width = Math.max(132, 52 + badge.length * 7.1);
    const x = 1136 - width;
    return `<rect x="${x}" y="48" width="${width}" height="30" rx="15" fill="${live ? ACCENT_SOFT : 'none'}" stroke="${live ? ACCENT : BORDER_STRONG}"/>
  <circle cx="${x + 17}" cy="63" r="3.4" fill="${live ? ACCENT : 'none'}" stroke="${live ? ACCENT : MUTED}" stroke-width="1.4"/>
  <text x="${x + 28}" y="67" font-family="${MONO}" font-size="9.5" fill="${live ? ACCENT : MUTED}" letter-spacing="1.2">${escapeXml(badge)}</text>`;
  })()}

  ${titleMarkup}
  ${descMarkup}

  <line x1="72" y1="472" x2="1128" y2="472" stroke="${BORDER_STRONG}"/>
  ${chipMarkup}

  <line x1="72" y1="598" x2="1128" y2="598" stroke="${BORDER}"/>
  <text x="72" y="614" font-family="${MONO}" font-size="10" fill="${MUTED}" letter-spacing="1.4">${escapeXml(page.footer)}</text>
  <text x="1128" y="614" text-anchor="end" font-family="${MONO}" font-size="10" fill="${MUTED}" letter-spacing="1.4">${packageName.toUpperCase()}</text>
</svg>`;
}

await mkdir('public/brand', { recursive: true });
await mkdir('public/og', { recursive: true });

// Vector marks
await writeFile(
  'public/brand/caurium-mark.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">${mark()}</svg>\n`,
);
await writeFile(
  'public/brand/caurium-mark-inverse.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">${mark({ bg: CREAM, fg: INK })}</svg>\n`,
);
await writeFile('public/brand/caurium-wordmark.svg', `${wordmark(150, INK)}\n`);
await writeFile('public/brand/caurium-wordmark-inverse.svg', `${wordmark(150, CREAM, true)}\n`);
await writeFile('public/brand/favicon.svg', `${iconSvg(32, INK, CREAM, LIME)}\n`);

// Raster icons
await png(iconSvg(64, INK, CREAM, LIME), 64, 'public/brand/icon-64.png');
await png(iconSvg(180, INK, CREAM, LIME), 180, 'public/brand/apple-touch-icon.png');
await png(iconSvg(192, INK, CREAM, LIME), 192, 'public/brand/icon-192.png');
await png(iconSvg(512, INK, CREAM, LIME), 512, 'public/brand/icon-512.png');

const ico = await buildIco([16, 24, 32, 48]);
await writeFile('public/favicon.ico', ico);

// Open Graph cards
const written = [];
for (const [key, page] of Object.entries(PAGES)) {
  const file = key === 'home' ? 'public/og/home.png' : `public/og/${key}.png`;
  const info = await sharp(Buffer.from(ogSvg(key, page))).png().toFile(file);
  written.push(`${file} ${info.width}x${info.height}`);
}

// Legacy alias kept for any cached link previews pointing at /og/caurium-og.png
await sharp('public/og/home.png').png().toFile('public/og/caurium-og.png');

console.log('brand assets written');
console.log(written.join('\n'));
console.log('ico bytes', ico.length);
