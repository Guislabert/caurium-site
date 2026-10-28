export const SITE = {
  name: 'Caurium',
  tagline: 'API access, monitoring and recovery.',
  description:
    'Caurium is building four narrow infrastructure modules: Gate for scoped API access, Probe for endpoint checks, Guard for recovery, and Box for invited development environments. All four are Planned.',
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
  eyebrow: 'Caurium · Early development',
  title: 'Infrastructure with boundaries you can check.',
  description:
    'Four narrow modules for the parts of infrastructure that are easy to leave unverified: who can call an API, whether an endpoint is really up, and whether a backup can be restored. All four are Planned. Each product page states the evidence required before that changes.',
  stage: 'Early development. No module is available for use.',
  primaryCta: { label: "See what's planned", href: '/products/' },
  secondaryCta: { label: 'Read the boundary model', href: '/architecture/' },
} as const;

export const OG_IMAGE = '/og/caurium-og.png';
