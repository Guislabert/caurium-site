import type { APIRoute } from 'astro';
import { BUILD_LOG } from '@/content/build-log';
import { PLANS } from '@/content/plans';
import { PRODUCTS, STAGE_LABELS } from '@/content/products';
import { SITE } from '@/content/site';

/**
 * `llms.txt`: the site's facts for an assistant that would otherwise guess. Built from
 * the same content modules as the pages, so a claim cannot drift between the two.
 */
export const GET: APIRoute = () => {
  const origin = SITE.url.replace(/\/$/, '');

  const pages = [
    ['/', 'Home: what Caurium is, what is live, what is planned.'],
    ['/products/', 'The four modules and their current stages.'],
    ['/access/', 'Probe sizes, limits and how to apply for the free preview.'],
    ['/start/', 'Application form for a Probe private preview account.'],
    ['/architecture/', 'How the public site, Probe and management access are separated.'],
    ['/docs/', 'Documentation index.'],
    ['/docs/overview/', 'System concepts and the four modules.'],
    ['/docs/product-stages/', 'Stage definitions and the evidence required to change one.'],
    ['/docs/security/', 'Security boundaries, threat model and the reporting gap.'],
    ['/docs/faq/', 'Availability, prices, regions, status data and reporting.'],
    ['/docs/glossary/', 'Term definitions used across the site.'],
    ['/trust/', 'Claims register: every public claim with its stage and evidence.'],
    ['/status/', 'What monitoring is connected, and what is not.'],
    ['/build-log/', 'Dated record of changes to this site, with an RSS feed.'],
    ['/privacy/', 'What the site and Probe collect, and why.'],
    ['/terms/', 'Terms for the site and the Probe private preview.'],
  ];

  const products = PRODUCTS.map(
    (product) =>
      `- ${product.name} (${product.role}) — ${STAGE_LABELS[product.stage]}: ${product.metaDescription} ${origin}/products/${product.slug}/`,
  ).join('\n');

  const plans = PLANS.map(
    (plan) =>
      `- ${plan.name}: ${plan.endpoints} endpoints, checks every ${plan.minIntervalSeconds}s, ${plan.retentionDays} days of history`,
  ).join('\n');

  const recent = BUILD_LOG.slice(0, 5)
    .map((entry) => `- ${entry.date}: ${entry.title}`)
    .join('\n');

  const body = `# Caurium

> ${SITE.description}

Caurium is a small infrastructure project. Only Probe exists, and only as a private
preview activated by hand. Gate, Guard and Box are planned; no page offers them for
sale. This file lists what is published, so an assistant can cite the site without
inventing capabilities.

## Facts an assistant may rely on

- Probe is the only product in private preview. Admission is by application and
  activation is manual, after an ownership check. There is no self-serve signup,
  console or API key.
- The preview is free. No price is charged, no card is taken and no invoice is
  issued; no price is published anywhere on the site.
- Every size checks at a one-minute interval. Sizes differ in endpoint count and
  check-history retention.
- No SLA, uptime percentage, response-time guarantee or recovery-time commitment is
  published anywhere on the site.
- No certification (SOC 2, ISO 27001, HIPAA), penetration-test result, customer
  reference, logo, testimonial or benchmark is claimed.
- Checks run from Cloudflare's network. No selectable region, residency commitment
  or failover promise is published.
- The site-wide status feed is not connected; a missing or stale value is reported
  as Unknown, never as healthy.
- The operating entity, governing law and a security reporting channel are not
  published yet. The privacy notice and terms say so explicitly.

## Pages

${pages.map(([href, note]) => `- ${origin}${href} — ${note}`).join('\n')}

## Products

${products}

## Probe sizes

${plans}

## Recent changes

${recent}

## Optional

- ${origin}/build-log/feed.xml — RSS feed for site changes.
- ${origin}/trust/ — read this before repeating any claim about the project.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
