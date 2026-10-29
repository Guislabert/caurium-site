import { PLANS } from '@/content/plans';
import { PRODUCTS } from '@/content/products';
import { SITE } from '@/content/site';

const ORIGIN = SITE.url.replace(/\/$/, '');

export const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${ORIGIN}/#organization`,
  name: 'Caurium',
  url: `${ORIGIN}/`,
  description: SITE.description,
  disambiguatingDescription:
    'Caurium operates Probe, an endpoint monitoring service in private preview. Gate, Guard and Box are planned and are not offered.',
  knowsAbout: [
    'endpoint monitoring',
    'API access control',
    'operational safeguards',
    'private development environments',
  ],
} as const;

export const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${ORIGIN}/#website`,
  name: SITE.name,
  url: `${ORIGIN}/`,
  description: SITE.description,
  inLanguage: 'en',
  publisher: { '@id': `${ORIGIN}/#organization` },
} as const;

const PRODUCT_TYPES: Record<string, string> = {
  probe: 'SoftwareApplication',
  gate: 'SoftwareApplication',
  guard: 'SoftwareApplication',
  box: 'SoftwareApplication',
};

/**
 * Only the product in private preview gets an Offer. The other three have no
 * price and no availability, so describing them as purchasable would be a claim
 * the site cannot support.
 */
export function productJsonLd(slug: string) {
  const product = PRODUCTS.find((entry) => entry.slug === slug);
  if (!product) return null;

  const base = {
    '@context': 'https://schema.org',
    '@type': PRODUCT_TYPES[product.slug] ?? 'SoftwareApplication',
    '@id': `${ORIGIN}/products/${product.slug}/#product`,
    name: product.name,
    description: product.metaDescription,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    url: `${ORIGIN}/products/${product.slug}/`,
    publisher: { '@id': `${ORIGIN}/#organization` },
  };

  if (product.stage !== 'private-preview' && product.stage !== 'available') return base;

  return {
    ...base,
    offers: PLANS.map((plan) => ({
      '@type': 'Offer',
      name: `${product.name} ${plan.name}`,
      price: plan.price,
      priceCurrency: 'EUR',
      availability:
        product.stage === 'available'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      url: `${ORIGIN}/pricing/`,
    })),
  };
}

export function breadcrumbJsonLd(items: { label: string; href?: string }[]) {
  const trail = [{ label: 'Home', href: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${ORIGIN}${item.href}` } : {}),
    })),
  };
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
