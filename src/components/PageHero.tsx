import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs';
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld';

export function PageHero({
  crumbs,
  title,
  description,
  meta,
  aside,
  children,
}: {
  crumbs: Crumb[];
  title: ReactNode;
  description: ReactNode;
  meta?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative border-b border-border bg-paper">
      <div className="container-page relative py-10 md:py-14 lg:py-16">
        <Breadcrumbs items={crumbs} />

        <div
          className={`mt-8 grid gap-10 lg:gap-16 ${
            aside ? 'lg:grid-cols-[1fr_300px] lg:items-start' : ''
          }`}
        >
          <div>
            {/*
              The tracked-caps kicker above the headline was removed. On every page
              it repeated what the breadcrumb directly above it already said
              ("Probe · Access" under "Home / Access"), and the eyebrow-over-huge-
              headline pairing is the default AI-product hero. The headline now
              starts the page and carries the product name itself where it matters.
            */}
            <h1 className="h1 max-w-[22ch]">{title}</h1>
            <div className="lede mt-6 max-w-[38rem]">{description}</div>
            {meta ? (
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">{meta}</div>
            ) : null}
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
