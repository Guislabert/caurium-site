import type { ReactNode } from 'react';
import { DocToc, type TocItem } from '@/components/DocToc';
import { PageHero } from '@/components/PageHero';
import { SITE } from '@/content/site';

export function LegalShell({
  title,
  description,
  toc,
  children,
}: {
  title: string;
  description: string;
  toc: TocItem[];
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        crumbs={[{ label: title }]}
        title={title}
        description={description}
        meta={
          <span className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
            Last updated <time dateTime={SITE.reviewedAt}>{SITE.reviewedAt}</time>
          </span>
        }
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,720px)_1fr] lg:gap-20">
          <article className="doc-prose min-w-0">{children}</article>
          <DocToc items={toc} />
        </div>
      </section>
    </>
  );
}
