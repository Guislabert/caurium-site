export const SITE = {
  name: 'Caurium',
  tagline: 'Developer infrastructure & AI connectivity.',
  description:
    'Caurium is building a focused toolkit for API access, service monitoring, operational safeguards, and private development environments.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://caurium.tech',
  locale: 'en',
  stageNote: 'Caurium is in early development. Planned features are not available for use.',
  reviewedAt: '2026-10-28',
  /** Only set after the address is verified and a real intake process exists. */
  contactEmail: null as string | null,
  indexable: process.env.NEXT_PUBLIC_SITE_ENV === 'production',
} as const;

export const NAV = [
  { label: 'Products', href: '/products/', description: 'Four modules, one focused roadmap.' },
  { label: 'Architecture', href: '/architecture/', description: 'How the service domains are separated.' },
  { label: 'Docs', href: '/docs/', description: 'Concepts, stages and security boundaries.' },
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
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' },
    ],
  },
] as const;

export const HERO = {
  eyebrow: 'Caurium · Early development',
  title: 'Infrastructure for a connected world.',
  description:
    'Caurium is building a focused toolkit for API access, service monitoring, operational safeguards, and private development environments.',
  stage: 'Early development. Product availability is listed on each product page.',
  primaryCta: { label: 'Explore the roadmap', href: '/products/' },
  secondaryCta: { label: 'Read the docs', href: '/docs/' },
} as const;

export const OG_IMAGE = '/og/caurium-og.png';
