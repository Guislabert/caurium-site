import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs';
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld';

export function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  meta,
  aside,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  meta?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="hero-glow opacity-80" aria-hidden="true" />
      <div className="container-page relative z-10 py-10 md:py-14 lg:py-16">
        <Breadcrumbs items={crumbs} />

        <div
          className={`mt-8 grid gap-10 lg:gap-16 ${
            aside ? 'lg:grid-cols-[1fr_290px] lg:items-start' : ''
          }`}
        >
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="h1 mt-4 max-w-[20ch]">{title}</h1>
            <div className="lede mt-6 max-w-2xl">{description}</div>
            {meta ? <div className="mt-6 flex flex-wrap items-center gap-3">{meta}</div> : null}
            {children}
          </div>
          {aside ? <div className="lg:pt-2">{aside}</div> : null}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(crumbs)) }}
      />
    </section>
  );
}
