import { getPermalink } from './utils/permalinks';

const docs = 'https://docs.caurium.tech';

export const headerData = {
  links: [
    { text: 'Base', href: getPermalink('/base') },
    { text: 'Probe', href: getPermalink('/probe') },
    { text: 'Guard', href: getPermalink('/guard') },
    { text: 'Pricing', href: getPermalink('/pricing') },
    { text: 'Regions', href: getPermalink('/regions') },
    { text: 'Docs', href: docs },
  ],
  actions: [{ text: 'Talk to us', href: getPermalink('/contact') }],
};

export const footerData = {
  links: [
    {
      title: 'Platform',
      links: [
        { text: 'Caurium Base', href: getPermalink('/base') },
        { text: 'Caurium Probe', href: getPermalink('/probe') },
        { text: 'Caurium Guard', href: getPermalink('/guard') },
        { text: 'Pricing', href: getPermalink('/pricing') },
        { text: 'Regions', href: getPermalink('/regions') },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Documentation', href: docs },
        { text: 'Trust & security', href: getPermalink('/trust') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Privacy', href: getPermalink('/privacy') },
        { text: 'Terms', href: getPermalink('/terms') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    {
      ariaLabel: 'GitHub',
      icon: 'tabler:brand-github',
      href: 'https://github.com/Guislabert/caurium-site',
    },
  ],
  footNote: `© ${new Date().getFullYear()} Caurium. All rights reserved.`,
};
