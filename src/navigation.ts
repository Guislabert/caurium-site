import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Platform', href: '/#platform' },
    { text: 'How it works', href: '/#how-it-works' },
    { text: 'Regions', href: '/#regions' },
    { text: 'Docs', href: 'https://docs.asterlyn.io' },
    {
      text: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
  ],
  actions: [{ text: 'Talk to us', href: getPermalink('/contact') }],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Platform', href: '/#platform' },
        { text: 'How it works', href: '/#how-it-works' },
        { text: 'Regions', href: '/#regions' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Documentation', href: 'https://docs.asterlyn.io' },
        { text: 'GitHub', href: 'https://github.com/Guislabert/asterlyn-site' },
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
      href: 'https://github.com/Guislabert/asterlyn-site',
    },
  ],
  footNote: `© ${new Date().getFullYear()} AsterLyn. All rights reserved.`,
};
