import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BoundaryTable } from '@/components/BoundaryTable';
import { Callout } from '@/components/Callout';
import { CapabilityList } from '@/components/CapabilityList';
import { CodeBlock } from '@/components/CodeBlock';
import { PageHero } from '@/components/PageHero';
import { ProductSpecPanel } from '@/components/ProductSpecPanel';
import { ProductStageBadge } from '@/components/ProductStageBadge';
import { RelatedModules } from '@/components/RelatedModules';
import { ReleaseCriteria } from '@/components/ReleaseCriteria';
import {
  PRODUCTS,
  STAGE_DESCRIPTIONS,
  STAGE_LABELS,
  getProduct,
} from '@/content/products';
import { pageMetadata } from '@/lib/seo';

const META_TITLES: Record<string, string> = {
  gate: 'Caurium Gate — API Access Roadmap',
  probe: 'Caurium Probe — Service Monitoring Roadmap',
  guard: 'Caurium Guard — Operational Safeguards Roadmap',
  box: 'Caurium Box — Private Development Environments Roadmap',
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return pageMetadata({
    title: META_TITLES[product.id],
    description: product.metaDescription,
    path: `/products/${product.slug}/`,
    absoluteTitle: true,
    ogImage: `/og/${product.slug}.png`,
    ogAlt: `Caurium ${product.name} — ${product.title} Planned module record.`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const index = PRODUCTS.findIndex((item) => item.id === product.id);
  const reviewed = new Date(`${product.reviewedAt}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Products', href: '/products/' }, { label: product.name }]}
        eyebrow={`${product.name} · ${product.role}`}
        title={product.title}
        description={product.summary}
        meta={
          <>
            <ProductStageBadge stage={product.stage} />
            <span className="mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
              Content reviewed{' '}
              <time dateTime={product.reviewedAt}>{reviewed}</time>
            </span>
          </>
        }
        aside={<ProductSpecPanel product={product} figureNumber={index + 2} />}
      />

      <section className="section border-b border-border" aria-labelledby="context-heading">
        <div className="container-page">
          <p className="section-index">01 / Context</p>
          <h2 id="context-heading" className="sr-only">
            Who {product.name} is for and the problem it addresses
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="border-t border-border-strong pt-5">
              <p className="eyebrow">Who it is for</p>
              <p className="mt-3 max-w-lg text-[15px] leading-7">{product.audience}</p>
            </div>
            <div className="border-t border-border-strong pt-5">
              <p className="eyebrow">The problem</p>
              <p className="mt-3 max-w-lg text-[15px] leading-7">{product.problem}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section border-b border-border bg-paper"
        aria-labelledby="workflow-heading"
      >
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="section-index">02 / Intended workflow</p>
              <h2 id="workflow-heading" className="h2 mt-4">
                Input, handling, output.
              </h2>
            </div>
            <span className="badge-stage" data-stage="planned">
              <span className="badge-dot" aria-hidden="true" />
              Planned
            </span>
          </div>

          <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {product.workflow.map((step, stepIndex) => (
              <li key={step.title} className="relative border-t border-border-strong pt-5">
                <span
                  aria-hidden="true"
                  className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full border border-border-strong bg-paper"
                />
                <p className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
                  {String(stepIndex + 1).padStart(2, '0')} / Step
                </p>
                <h3 className="h3 mt-3">{step.title}</h3>
                <p className="mt-2 max-w-sm text-[13.5px] leading-6 text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-2xl text-xs leading-5 text-muted">
            {product.workflowCaption} Illustrative workflow — not a live product experience.
          </p>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="scope-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">03 / Scope</p>
            <h2 id="scope-heading" className="h2 mt-4 max-w-[16ch]">
              What is intended, and what is verified.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">{product.scopeNote}</p>

            <Callout title="Verified capabilities: none." tone="warning">
              There is no public deployment of {product.name}, so no capability is marked
              Implemented or Verified.
            </Callout>

            <div className="mt-7">
              <p className="eyebrow">Not this</p>
              <ul className="mt-3 space-y-2.5">
                {product.notThis.map((item) => (
                  <li key={item} className="flex gap-3 text-[13px] leading-6 text-muted">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-border-strong" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <CapabilityList features={product.features} productName={product.name} />
        </div>
      </section>

      <section
        className="section border-b border-border bg-paper"
        aria-labelledby="criteria-heading"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">04 / Release criteria</p>
            <h2 id="criteria-heading" className="h2 mt-4 max-w-[15ch]">
              What must be true before this changes.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              The stage label moves only after these checks are run and recorded. Internal evidence
              stays internal; the public page publishes only the resulting scope.
            </p>
          </div>
          <ReleaseCriteria criteria={product.releaseCriteria} productName={product.name} />
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="example-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">05 / Example</p>
            <h2 id="example-heading" className="h2 mt-4 max-w-[14ch]">
              The shape of the contract.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              Examples describe an intended interface or record. They are not callable and may
              change before release.
            </p>
          </div>
          <CodeBlock
            title={product.example.title}
            language={product.example.language}
            code={product.example.code}
            note={product.example.note}
          />
        </div>
      </section>

      <section
        className="section border-b border-border bg-paper"
        aria-labelledby="limits-heading"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">06 / Limits and boundaries</p>
            <h2 id="limits-heading" className="h2 mt-4 max-w-[16ch]">
              Written down before they matter.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              Boundaries are part of the product definition. If an item is not listed here, it is
              not part of the intended first release.
            </p>
          </div>
          <BoundaryTable boundaries={product.boundaries} productName={product.name} />
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="availability-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="section-index">07 / Availability</p>
            <h2 id="availability-heading" className="h2 mt-4">
              {STAGE_LABELS[product.stage]}.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              {STAGE_DESCRIPTIONS[product.stage]}
            </p>
          </div>

          <div className="rounded-[16px] border border-border bg-paper p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="eyebrow">Current stage</span>
              <ProductStageBadge stage={product.stage} />
            </div>
            <p className="mt-4 text-[15px] leading-6">
              {product.name} is not available for use. There is no console, sign-up, API key or
              paid plan. The stage will change only after the release criteria are met and recorded
              with evidence.
            </p>
            <div className="mt-5 border-t border-border pt-4">
              <p className="eyebrow">Next step</p>
              <p className="mt-2 max-w-lg text-[13.5px] leading-6 text-muted">
                {product.nextStep.detail}
              </p>
              <Link href={product.nextStep.href} className="btn btn-secondary mt-4">
                {product.nextStep.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="related-heading">
        <div className="container-page">
          <p className="section-index">08 / Other modules</p>
          <h2 id="related-heading" className="h2 mt-4">
            The rest of the roadmap.
          </h2>
          <div className="mt-8">
            <RelatedModules currentId={product.id} />
          </div>
        </div>
      </section>
    </>
  );
}
