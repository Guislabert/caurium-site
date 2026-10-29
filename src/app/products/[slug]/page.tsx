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
import { jsonLdScript, productJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

const META_TITLES: Record<string, string> = {
  gate: 'Caurium Gate — API Access Roadmap',
  probe: 'Caurium Probe — Endpoint Monitoring',
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
    ogAlt: `Caurium ${product.name} — ${product.title} ${STAGE_LABELS[product.stage]} module record.`,
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

  const structuredData = productJsonLd(product.slug);

  return (
    <>
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(structuredData) }}
        />
      ) : null}
      <PageHero
        crumbs={[{ label: 'Products', href: '/products/' }, { label: product.name }]}
        title={product.title}
        description={product.summary}
        meta={
          <>
            <ProductStageBadge stage={product.stage} />
            <span className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
              Content reviewed{' '}
              <time dateTime={product.reviewedAt}>{reviewed}</time>
            </span>
          </>
        }
        aside={<ProductSpecPanel product={product} figureNumber={index + 2} />}
      >
        <dl className="mt-7 grid max-w-2xl gap-4 border-t border-border pt-5 sm:grid-cols-2">
          <div>
            <dt className="eyebrow">For</dt>
            <dd className="note mt-2 text-[14px] leading-6 text-ink-2">{product.forLine}</dd>
          </div>
          <div>
            <dt className="eyebrow">Not for</dt>
            <dd className="mt-2 text-[14px] leading-6 text-muted">
              {product.notThis
                .slice(0, 2)
                .map((item) => item.replace(/\.$/, ''))
                .join(' · ')}
            </dd>
          </div>
        </dl>
      </PageHero>

      <section className="section border-b border-border" aria-labelledby="context-heading">
        <div className="container-page">
          <h2 id="context-heading" className="sr-only">
            Who {product.name} is for and the problem it addresses
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="border-t border-border-strong pt-5">
              <p className="eyebrow">Who it is for</p>
              <p className="mt-3 max-w-lg text-[15.5px] leading-7">{product.audience}</p>
            </div>
            <div className="border-t border-border-strong pt-5">
              <p className="eyebrow">The problem</p>
              <p className="mt-3 max-w-lg text-[15.5px] leading-7">{product.problem}</p>
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
              <h2 id="workflow-heading" className="h2">
                Input, handling, output.
              </h2>
            </div>
            <ProductStageBadge stage={product.stage} />
          </div>

          <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {product.workflow.map((step, stepIndex) => (
              <li key={step.title} className="relative border-t border-border-strong pt-5">
                <span
                  aria-hidden="true"
                  className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full border border-border-strong bg-paper"
                />
                <p className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
                  {String(stepIndex + 1).padStart(2, '0')} / Step
                </p>
                <h3 className="h3 mt-3">{step.title}</h3>
                <p className="mt-2 max-w-sm text-[14px] leading-6 text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>

          <p className="note mt-10 text-[13px] leading-5 text-muted">
            {product.workflowCaption}
          </p>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="scope-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="scope-heading" className="h2 max-w-[16ch]">
              What is intended, and what is verified.
            </h2>
            <p className="mt-5 note max-w-sm text-[14px] leading-6 text-muted">{product.scopeNote}</p>

            <Callout title="Verified capabilities: none." tone="warning">
              There is no public deployment of {product.name}, so no capability is marked
              Implemented or Verified.
            </Callout>

            <div className="mt-7">
              <p className="eyebrow">Not this</p>
              <ul className="mt-3 space-y-2.5">
                {product.notThis.map((item) => (
                  <li key={item} className="flex gap-3 text-[13.5px] leading-6 text-muted">
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
        aria-labelledby="decisions-heading"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="decisions-heading" className="h2 max-w-[15ch]">
              Why the boundary sits here.
            </h2>
            <p className="mt-5 note max-w-sm text-[14px] leading-6 text-muted">
              These are the choices that define the first release. They are design intent, not
              claims about a running service.
            </p>
          </div>
          <div className="border-t border-border-strong">
            {product.designDecisions.map((decision, decisionIndex) => (
              <div
                key={decision.title}
                className="grid grid-cols-[36px_1fr] gap-4 border-b border-border py-5"
              >
                <span className="mono pt-1 text-[11px] tracking-[0.06em] text-muted">
                  D.{String(decisionIndex + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-[16px] font-medium leading-6">{decision.title}</h3>
                  <p className="mt-1.5 max-w-xl text-[14px] leading-6 text-muted">
                    {decision.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="criteria-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="criteria-heading" className="h2 max-w-[15ch]">
              What must be true before this changes.
            </h2>
            <p className="mt-5 note max-w-sm text-[14px] leading-6 text-muted">
              The stage label moves only after these checks are run and recorded. Internal evidence
              stays internal; the public page publishes only the resulting scope.
            </p>
          </div>
          <ReleaseCriteria criteria={product.releaseCriteria} productName={product.name} />
        </div>
      </section>

      <section
        className="section border-b border-border bg-paper"
        aria-labelledby="example-heading"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="example-heading" className="h2 max-w-[14ch]">
              The shape of the contract.
            </h2>
            <p className="mt-5 note max-w-sm text-[14px] leading-6 text-muted">
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

      <section className="section border-b border-border" aria-labelledby="limits-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="limits-heading" className="h2 max-w-[16ch]">
              Written down before they matter.
            </h2>
            <p className="mt-5 note max-w-sm text-[14px] leading-6 text-muted">
              Boundaries are part of the product definition. If an item is not listed here, it is
              not part of the intended first release.
            </p>
          </div>
          <BoundaryTable boundaries={product.boundaries} productName={product.name} />
        </div>
      </section>

      <section
        className="section border-b border-border bg-paper"
        aria-labelledby="questions-heading"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="questions-heading" className="h2 max-w-[15ch]">
              What is still undecided.
            </h2>
            <p className="mt-5 note max-w-sm text-[14px] leading-6 text-muted">
              These decisions are not made yet. Publishing them is part of the scope: a reader
              should not have to guess which parts of the design are settled.
            </p>
          </div>
          <ol className="border-t border-border-strong">
            {product.openQuestions.map((question, questionIndex) => (
              <li
                key={question}
                className="grid grid-cols-[36px_1fr] gap-4 border-b border-border py-4"
              >
                <span className="mono text-[11px] tracking-[0.06em] text-muted">
                  Q.{String(questionIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-[14px] leading-6 text-ink-2">{question}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="faq-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="faq-heading" className="h2 max-w-[14ch]">
              Questions a reader should ask.
            </h2>
            <p className="mt-5 note max-w-sm text-[14px] leading-6 text-muted">
              Short answers about availability and behavior. Every answer describes the intended
              design unless it says otherwise.
            </p>
            <Link href="/docs/faq/" className="link-arrow mt-6">
              All questions
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="border-t border-border-strong">
            {product.faq.map((item) => (
              <details key={item.question} className="group border-b border-border">
                <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-4 py-4 text-[15px] font-medium leading-6 text-ink [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="mono pt-0.5 text-[13.5px] text-muted transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="note mt-3 text-[14px] leading-6 text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section border-b border-border bg-paper"
        aria-labelledby="availability-heading"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <h2 id="availability-heading" className="h2">
              {STAGE_LABELS[product.stage]}.
            </h2>
            <p className="mt-4 note max-w-sm text-[14px] leading-6 text-muted">
              {STAGE_DESCRIPTIONS[product.stage]}
            </p>
          </div>

          <div className="rounded-[10px] border border-border bg-paper p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="eyebrow">Current stage</span>
              <ProductStageBadge stage={product.stage} />
            </div>
            <p className="mt-4 text-[15.5px] leading-6">
              {product.stage === 'planned'
                ? `${product.name} is not available for use. There is no console, sign-up, API key or paid plan. The stage will change only after the release criteria are met and recorded with evidence.`
                : `${product.name} is available in private preview. Accounts are reviewed, paid monthly and activated by hand; there is no self-serve console. The stage will change again only after the remaining release criteria are met and recorded.`}
            </p>
            {product.stage !== 'planned' ? (
              <Link href="/access/" className="btn btn-primary mt-4">
                See access
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
            <div className="mt-5 border-t border-border pt-4">
              <p className="eyebrow">Next step</p>
              <p className="mt-2 max-w-lg text-[14px] leading-6 text-muted">
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
          <h2 id="related-heading" className="h2">
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
