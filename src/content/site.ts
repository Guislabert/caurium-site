export const SITE = {
  name: 'Caurium',
  tagline: 'API access, monitoring and recovery.',
  description:
    'Caurium builds narrow infrastructure modules. Probe, endpoint monitoring with webhook alerts and a sanitized status page, runs as a free private preview. Gate, authenticated routing to one upstream, is in development. Guard and Box are planned.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://caurium.tech',
  locale: 'en',
  stageNote:
    'Probe is a free private preview, opened by application. Gate, Guard and Box are planned and not for sale.',
  reviewedAt: '2026-10-29',
  indexable: process.env.NEXT_PUBLIC_SITE_ENV === 'production',
} as const;

/**
 * Published mailboxes, verified by a delivery check against the MX records before
 * being added here. Caurium is presented as a project name; no legal entity is
 * published, and nothing is charged during the preview.
 */
export const CONTACT = {
  security: 'security@caurium.tech',
  support: 'support@caurium.tech',
  privacy: 'privacy@caurium.tech',
} as const;

export const NAV = [
  { label: 'Products', href: '/products/', description: 'Four modules, one focused roadmap.' },
  { label: 'Access', href: '/access/', description: 'Apply for the free Probe preview.' },
  { label: 'Architecture', href: '/architecture/', description: 'How the service domains are separated.' },
  { label: 'Docs', href: '/docs/', description: 'Concepts, stages and boundaries.' },
  { label: 'Status', href: '/status/', description: 'What is connected, and what is not.' },
] as const;

export const FOOTER_LINKS = [
  {
    title: 'Products',
    links: [
      { label: 'Gate', href: '/products/gate/' },
      { label: 'Probe', href: '/products/probe/' },
      { label: 'Guard', href: '/products/guard/' },
      { label: 'Box', href: '/products/box/' },
      { label: 'Access', href: '/access/' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Architecture', href: '/architecture/' },
      { label: 'Documentation', href: '/docs/' },
      { label: 'Product stages', href: '/docs/product-stages/' },
      { label: 'Status', href: '/status/' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Build log', href: '/build-log/' },
      { label: 'Trust & claims', href: '/trust/' },
      { label: 'FAQ', href: '/docs/faq/' },
      { label: 'Glossary', href: '/docs/glossary/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' },
    ],
  },
] as const;

export const HERO = {
  eyebrow: 'Caurium · Probe private preview',
  title: 'Infrastructure with boundaries you can check.',
  description:
    'Probe checks the endpoints you own, opens one incident after three consecutive failures, alerts your webhook and publishes a status page that never exposes an origin address. It runs as a free private preview, opened by application. Gate, Guard and Box remain planned.',
  stage: 'Free private preview · By application · No SLA',
  primaryCta: { label: 'Apply for access', href: '/access/' },
  secondaryCta: { label: 'Read the boundary model', href: '/architecture/' },
} as const;

export const OG_IMAGE = '/og/caurium-og.png';
