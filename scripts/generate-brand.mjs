import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

/**
 * Brand asset generator.
 *
 * The mark is the four-node segmented C used by src/components/Logo.tsx.
 * Keep the geometry here in sync with that component if the mark changes.
 */

const INK = '#111110';
const MUTED = '#5b5b55';
const BORDER = '#e4e2db';
const BORDER_STRONG = '#c9c7bf';
const ACCENT = '#1d4ed8';
const INVERSE_INK = '#f4f3ee';
const INVERSE_ACCENT = '#8FB0FF';

const ARC = 'M22.43 23.66A10 10 0 0 1 9.57 23.66A10 10 0 0 1 7.34 11A10 10 0 0 1 22.43 8.34';
const NODES = [
  [22.43, 23.66],
  [9.57, 23.66],
  [7.34, 11],
  [22.43, 8.34],
];

const SANS = 'DejaVu Sans, Liberation Sans, Arial, sans-serif';
const MONO = 'DejaVu Sans Mono, Liberation Mono, monospace';

function mark(color, accent, { strokeWidth = 1.6, nodeRadius = 1.9 } = {}) {
  const circles = NODES.map(
    ([cx, cy], index) =>
      `<circle cx="${cx}" cy="${cy}" r="${nodeRadius}" fill="${index === 0 ? accent : color}"/>`,
  ).join('');
  return `<path d="${ARC}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>${circles}`;
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function iconSvg(size, background, fg, accent) {
  const radius = Math.round(size * 0.22);
  const scale = size * 0.56;
  const offset = (size - 32 * (scale / 32)) / 2;
  const s = scale / 32;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${background}"/>
  <g transform="translate(${offset} ${offset}) scale(${s})">${mark(fg, accent, {
    strokeWidth: size <= 32 ? 2.1 : 1.6,
    nodeRadius: size <= 32 ? 2.3 : 1.9,
  })}</g>
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
      sharp(Buffer.from(iconSvg(size, INK, INVERSE_INK, INVERSE_ACCENT)))
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

function wordmark(width, fg) {
  const scale = 32 / 26;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="40" viewBox="0 0 ${width} 40">
  <g transform="translate(0 7) scale(${scale})">${mark(fg, ACCENT)}</g>
  <text x="44" y="27.5" font-family="${SANS}" font-size="21" font-weight="700" letter-spacing="-0.4" fill="${fg}">Caurium</text>
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
    kicker: 'Caurium · Early development',
    title: 'Infrastructure for a connected world.',
    description:
      'A focused toolkit for API access, service monitoring, operational safeguards and private development environments.',
    footer: 'ROADMAP · ALL PRODUCTS PLANNED',
    chips: [
      ['Gate', 'Access'],
      ['Probe', 'Observe'],
      ['Guard', 'Safeguard'],
      ['Box', 'Environments'],
    ],
  },
  products: {
    kicker: 'Products · Roadmap',
    title: 'Four narrow modules. One boundary each.',
    description: 'Gate, Probe, Guard and Box are Planned. Each stage is a claim about evidence.',
    footer: 'ROADMAP · ALL PRODUCTS PLANNED',
    chips: [
      ['Gate', 'Access'],
      ['Probe', 'Observe'],
      ['Guard', 'Safeguard'],
      ['Box', 'Environments'],
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
    kicker: 'Probe · Planned',
    title: 'See the state of a service.',
    description:
      'Checks authorized endpoints, turns results into component state, and publishes only sanitized data.',
    footer: 'PLANNED · NO MONITORING CONNECTED',
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
    footer: 'ILLUSTRATIVE · PRODUCT DOMAIN PLANNED',
  },
  docs: {
    kicker: 'Documentation',
    title: 'Understand the system before you use it.',
    description:
      'System overview, the product-stage dictionary and security boundaries — written to stay true while modules are Planned.',
    footer: 'DOCUMENTATION · REVIEWED 2026-10-28',
  },
  status: {
    kicker: 'Service status',
    title: 'Monitoring is not connected yet.',
    description:
      'Public status is published only from sanitized checks with a recorded collection time. Without valid data, the state is Unknown.',
    footer: 'STATUS · NO FEED CONNECTED',
  },
};

function ogSvg(key, page) {
  const titleLines = wrap(page.title, 22);
  const descLines = wrap(page.description, 74).slice(0, 3);
  const titleStartY = titleLines.length > 1 ? 318 : 352;
  const titleSize = titleLines.length > 1 ? 70 : 76;

  const titleMarkup = titleLines
    .map(
      (line, index) =>
        `<text x="72" y="${titleStartY + index * (titleSize + 6)}" font-family="${SANS}" font-size="${titleSize}" font-weight="700" letter-spacing="-2.6" fill="${INK}">${escapeXml(line)}</text>`,
    )
    .join('');

  const descStartY = titleStartY + (titleLines.length - 1) * (titleSize + 6) + 52;
  const descMarkup = descLines
    .map(
      (line, index) =>
        `<text x="74" y="${descStartY + index * 32}" font-family="${SANS}" font-size="22" fill="${MUTED}">${escapeXml(line)}</text>`,
    )
    .join('');

  const chips = page.chips ?? [];
  const chipWidth = chips.length ? (1056 - (chips.length - 1) * 16) / chips.length : 0;
  const chipMarkup = chips
    .map(([name, role], index) => {
      const x = 72 + index * (chipWidth + 16);
      return `
    <rect x="${x}" y="506" width="${chipWidth}" height="72" rx="6" fill="#ffffff" stroke="${BORDER}"/>
    <circle cx="${x + 20}" cy="531" r="3.2" fill="${ACCENT}"/>
    <text x="${x + 32}" y="537" font-family="${SANS}" font-size="18" font-weight="700" fill="${INK}">${escapeXml(name)}</text>
    <text x="${x + 20}" y="561" font-family="${MONO}" font-size="10.5" fill="${MUTED}" letter-spacing="1.4">${escapeXml(role.toUpperCase())} · PLANNED</text>`;
    })
    .join('');

  const packageName = key === 'home' ? 'caurium' : `caurium-${key}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${INK}" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="${BORDER}"/>

  <g transform="translate(64 46) scale(1.05)">${mark(INK, ACCENT)}</g>
  <text x="108" y="72" font-family="${SANS}" font-size="21" font-weight="700" letter-spacing="-0.3" fill="${INK}">Caurium</text>
  <text x="72" y="118" font-family="${MONO}" font-size="11" fill="${MUTED}" letter-spacing="1.8">${escapeXml(page.kicker.toUpperCase())}</text>

  <rect x="1004" y="48" width="132" height="30" rx="4" fill="none" stroke="${BORDER_STRONG}"/>
  <circle cx="1021" cy="63" r="3.4" fill="none" stroke="${MUTED}" stroke-width="1.4"/>
  <text x="1032" y="67" font-family="${MONO}" font-size="9.5" fill="${MUTED}" letter-spacing="1.2">PLANNED</text>

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
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">${mark(INK, ACCENT)}</svg>\n`,
);
await writeFile(
  'public/brand/caurium-mark-inverse.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">${mark(INVERSE_INK, INVERSE_ACCENT)}</svg>\n`,
);
await writeFile('public/brand/caurium-wordmark.svg', `${wordmark(150, INK)}\n`);
await writeFile('public/brand/caurium-wordmark-inverse.svg', `${wordmark(150, INVERSE_INK)}\n`);
await writeFile(
  'public/brand/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><rect width="32" height="32" rx="7" fill="${INK}"/>${mark(INVERSE_INK, INVERSE_ACCENT, { strokeWidth: 2.1, nodeRadius: 2.3 })}</svg>\n`,
);

// Raster icons
await png(iconSvg(64, INK, INVERSE_INK, INVERSE_ACCENT), 64, 'public/brand/icon-64.png');
await png(iconSvg(180, INK, INVERSE_INK, INVERSE_ACCENT), 180, 'public/brand/apple-touch-icon.png');
await png(iconSvg(192, INK, INVERSE_INK, INVERSE_ACCENT), 192, 'public/brand/icon-192.png');
await png(iconSvg(512, INK, INVERSE_INK, INVERSE_ACCENT), 512, 'public/brand/icon-512.png');

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
