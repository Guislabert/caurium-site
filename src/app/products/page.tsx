import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { ProductCard } from '@/components/ProductCard';
import {
  PRODUCTS,
  STAGE_CTA_ALLOWED,
  STAGE_DESCRIPTIONS,
  STAGE_LABELS,
  type ProductStage,
} from '@/content/products';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Products — roadmap and stages',
  description:
    'Four Caurium modules: Gate for scoped API access, Probe for service monitoring, Guard for operational safeguards, and Box for invitation-only development environments.',
  path: '/products/',
  ogImage: '/og/products.png',
  ogAlt: 'Caurium products — four planned modules on one focused roadmap.',
});

const STAGES = Object.keys(STAGE_LABELS) as ProductStage[];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Products' }]}
        eyebrow="Products"
        title="A focused roadmap, one module at a time."
        description="Caurium is building four narrow modules. Each page states the intended workflow, the limits, and the evidence required before its stage can change. None of them is available for use today."
        meta={
          <>
            <span className="badge-stage" data-stage="planned">
              <span className="badge-dot" aria-hidden="true" />
              All modules Planned
            </span>
            <span className="mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
              Reviewed 28 Oct 2026
            </span>
          </>
        }
      />

      <section className="section border-b border-border" aria-labelledby="modules-heading">
        <div className="container-page">
          <p className="section-index">01 / Module records</p>
          <h2 id="modules-heading" className="sr-only">
            The four Caurium modules
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
            {PRODUCTS.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <p className="mt-5 text-xs leading-5 text-muted">
            All four modules are Planned. No module is available for use today.
          </p>
        </div>
      </section>

      <section
        className="section border-b border-border bg-paper"
        aria-labelledby="choose-heading"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">02 / Choose by problem</p>
            <h2 id="choose-heading" className="h2 mt-4 max-w-[15ch]">
              Start from the failure, not the product name.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              Each module exists because one failure mode is easy to leave unverified. Pick the
              sentence that sounds familiar.
            </p>
          </div>

          <div className="border-t border-border-strong">
            {[
              {
                problem: 'You cannot revoke one caller without breaking another.',
                product: 'Gate',
                href: '/products/gate/',
              },
              {
                problem: 'You learn about downtime from a customer, not from a check.',
                product: 'Probe',
                href: '/products/probe/',
              },
              {
                problem: 'You cannot prove that the last backup can be restored.',
                product: 'Guard',
                href: '/products/guard/',
              },
              {
                problem: 'A shared development environment has outlived its project.',
                product: 'Box',
                href: '/products/box/',
              },
              {
                problem: 'You are deciding whether to rely on any of this.',
                product: 'Product stages',
                href: '/docs/product-stages/',
              },
            ].map((row) => (
              <Link
                key={row.href}
                href={row.href}
                className="group flex items-start justify-between gap-6 border-b border-border py-5 transition-colors hover:bg-background"
              >
                <span className="max-w-xl text-[14px] leading-6 text-ink-2">{row.problem}</span>
                <span className="link-arrow shrink-0">
                  {row.product}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="stages-heading">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="section-index">03 / Stages</p>
              <h2 id="stages-heading" className="h2 mt-4 max-w-[14ch]">
                A label is a statement of evidence.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
                Status is stored once and reused by the home page, product pages, documentation and
                metadata. A module can move forward only when its own acceptance criteria are met.
              </p>
            </div>

            <div className="min-w-0">
              <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
                {STAGES.map((stage, index) => {
                  const current = stage === 'planned';
                  return (
                    <li
                      key={stage}
                      className={`p-3 ${current ? 'bg-accent-soft' : 'bg-background'}`}
                    >
                      <p className="mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <p className={`mt-1.5 text-[11.5px] font-medium leading-4 ${current ? 'text-accent' : ''}`}>
                        {STAGE_LABELS[stage]}
                      </p>
                      <p className="mono mt-1 text-[7.5px] uppercase tracking-[0.08em] text-muted">
                        {current ? 'Current' : 'Later'}
                      </p>
                    </li>
                  );
                })}
              </ol>

              <div className="table-scroll mt-6">
                <table className="w-full border-collapse text-sm">
                  <caption className="sr-only">
                    Current stage, meaning and permitted call to action for each Caurium module
                  </caption>
                  <thead>
                    <tr className="border-y border-border bg-background text-left">
                      <th scope="col" className="px-3 py-3 font-medium">
                        Module
                      </th>
                      <th scope="col" className="px-3 py-3 font-medium">
                        Stage
                      </th>
                      <th scope="col" className="px-3 py-3 font-medium">
                        What that means
                      </th>
                      <th scope="col" className="px-3 py-3 font-medium">
                        Permitted CTA
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRODUCTS.map((product) => (
                      <tr key={product.id} className="border-b border-border align-top">
                        <th scope="row" className="whitespace-nowrap px-3 py-4 text-left font-medium">
                          <Link
                            href={`/products/${product.slug}/`}
                            className="text-accent hover:underline"
                          >
                            {product.name}
                          </Link>
                        </th>
                        <td className="whitespace-nowrap px-3 py-4 text-muted">
                          {STAGE_LABELS[product.stage]}
                        </td>
                        <td className="px-3 py-4 text-muted">
                          {STAGE_DESCRIPTIONS[product.stage]}
                        </td>
                        <td className="px-3 py-4 text-muted">{STAGE_CTA_ALLOWED[product.stage]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="not-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="section-index">04 / Boundaries</p>
            <h2 id="not-heading" className="h2 mt-4 max-w-[14ch]">
              What this roadmap is not.
            </h2>
          </div>
          <ul className="border-t border-border-strong">
            {[
              'A release schedule. Stage order shows dependency and priority, not dates.',
              'A price list. No plan, checkout or free tier is published.',
              'A console. There is no account, API key or login to create.',
              'A platform claim. Each module stands on its own verified scope.',
            ].map((item, index) => (
              <li key={item} className="grid grid-cols-[36px_1fr] gap-4 border-b border-border py-4">
                <span className="mono text-[9px] tracking-[0.1em] text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[13.5px] leading-6 text-ink-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
