import type { ReactNode } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { DocsNavigation } from '@/components/DocsNavigation';
import { DocToc, type TocItem } from '@/components/DocToc';
import { SITE } from '@/content/site';

export function DocsShell({
  current,
  title,
  description,
  toc,
  children,
}: {
  current: string;
  title: string;
  description: string;
  toc?: TocItem[];
  children: ReactNode;
}) {
  return (
    <div className="container-page py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs/' },
          ...(current === '/docs/' ? [] : [{ label: title }]),
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[168px_minmax(0,720px)_176px] xl:justify-between xl:gap-10">
        <DocsNavigation current={current} />

        <article className="min-w-0">
          <header className="border-b border-border pb-7">
            {/* The "Documentation" kicker repeated the section the nav already shows. */}
            <h1 className="h1 max-w-[20ch] text-[clamp(2.1rem,4vw,3.5rem)]">{title}</h1>
            <p className="lede mt-4 max-w-[38rem]">{description}</p>
            <p className="mono mt-5 text-[11px] uppercase tracking-[0.06em] text-muted">
              Last reviewed{' '}
              <time dateTime={SITE.reviewedAt}>{SITE.reviewedAt}</time> · Applies to the public
              site
            </p>
          </header>

          <div className="doc-prose pt-7">{children}</div>

          <footer className="mt-12 border-t border-border pt-6">
            <p className="text-xs leading-5 text-muted">
              This document describes the current public site and the intended boundaries of
              planned products. It is not a certificate, an SLA or a release announcement. See the{' '}
              <Link href="/docs/product-stages/" className="text-link">
                stage dictionary
              </Link>{' '}
              before interpreting any product label.
            </p>
          </footer>
        </article>

        {toc && toc.length > 0 ? <DocToc items={toc} /> : <div className="hidden xl:block" />}
      </div>
    </div>
  );
}
