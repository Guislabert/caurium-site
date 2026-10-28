import type { Metadata } from 'next';
import { OG_IMAGE, SITE } from '@/content/site';

function canonical(path: string) {
  const base = SITE.url.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean.endsWith('/') ? clean : `${clean}/`}`;
}

function absoluteAsset(path: string) {
  return `${SITE.url.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  ogImage = OG_IMAGE,
  ogAlt = 'Caurium — API access, monitoring and recovery.',
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  ogImage?: string;
  ogAlt?: string;
}): Metadata {
  const url = canonical(path);
  const resolvedTitle = absoluteTitle ? { absolute: title } : title;
  const image = absoluteAsset(ogImage);

  return {
    title: resolvedTitle,
    description,
    alternates: { canonical: url },
    robots: SITE.indexable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      title,
      description,
      url,
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
