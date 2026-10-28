import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@fontsource-variable/inter';
import '@fontsource-variable/roboto-slab';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { OG_IMAGE, SITE } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Caurium — endpoint monitoring in private preview',
    template: '%s — Caurium',
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: `${SITE.url.replace(/\/$/, '')}/` },
  robots: SITE.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  icons: {
    icon: [
      { url: '/brand/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/brand/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: 'Caurium — endpoint monitoring in private preview',
    description: SITE.description,
    url: `${SITE.url.replace(/\/$/, '')}/`,
    locale: 'en_US',
    images: [
      {
        url: `${SITE.url.replace(/\/$/, '')}${OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: 'Caurium — endpoint monitoring in private preview.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caurium — endpoint monitoring in private preview',
    description: SITE.description,
    images: [`${SITE.url.replace(/\/$/, '')}${OG_IMAGE}`],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f6f4ee',
  colorScheme: 'light',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: `${SITE.url.replace(/\/$/, '')}/`,
  description: SITE.description,
  inLanguage: 'en',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
