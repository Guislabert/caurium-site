import Link from 'next/link';
import type { Metadata } from 'next';
import { CauriumMark } from '@/components/Logo';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { SystemBoard } from '@/components/SystemBoard';
import { PRODUCTS } from '@/content/products';
import { HERO } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Caurium — Developer Infrastructure & AI Connectivity',
  description:
    'Explore Caurium’s roadmap for controlled API access, service monitoring, operational safeguards, and private development environments.',
  path: '/',
  absoluteTitle: true,
  ogImage: '/og/home.png',
});

const WORKFLOW = [
  {
    step: '01',
    label: 'Connect',
    title: 'Connect',
    detail:
      'Gate puts one allow-listed upstream behind a per-caller credential, so access can be scoped, limited and revoked.',
  },
  {
    step: '02',
    label: 'Observe',
    title: 'Observe',
    detail:
      'Probe checks endpoints you own from fixed locations and publishes only sanitized state and timestamps.',
  },
  {
    step: '03',
    label: 'Operate',
    title: 'Operate',
    detail:
      'Guard keeps backups, recovery steps and access records repeatable. Box gives invited projects a private place to build.',
  },
] as const;

const PRINCIPLES = [
  {
    code: 'P.01',
    title: 'Scoped access',
    detail:
      'Every caller gets its own credential and limits. Revoking one does not break another.',
  },
  {
    code: 'P.02',
    title: 'Explicit service boundaries',
    detail:
      'The public site, product APIs, management and separately operated networks do not share runtime credentials or default network access.',
  },
  {
    code: 'P.03',
    title: 'Documented behavior',
    detail:
      'Limits, failure modes and retention are written down before a feature is called available. Unverified claims stay unverified.',
  },
] as const;

const DOC_LINKS = [
  {
    href: '/docs/overview/',
    title: 'System overview',
    detail: 'The concepts, the four modules, and what is outside the public site.',
  },
  {
    href: '/docs/product-stages/',
    title: 'Product stages',
    detail: 'What Planned, In development, Internal use and later stages mean.',
  },
  {
    href: '/docs/security/',
    title: 'Security boundaries',
    detail: 'How public, product, management and operation domains are separated.',
  },
] as const;

const STATUS_STRIP = [
  { label: 'Modules', value: 'Four, all Planned' },
  { label: 'Public site', value: 'Static HTML' },
  { label: 'Monitoring', value: 'Not connected' },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container-page relative z-10 grid gap-12 py-14 md:py-20 lg:grid-cols-[1.16fr_0.84fr] lg:items-center lg:gap-14 lg:py-24">
          <div>
            <p className="eyebrow">{HERO.eyebrow}</p>

            <h1 className="display mt-6 max-w-[17ch] text-balance">{HERO.title}</h1>
            <p className="lede mt-7 max-w-[34rem]">{HERO.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={HERO.primaryCta.href} className="btn btn-primary">
                {HERO.primaryCta.label}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={HERO.secondaryCta.href} className="btn btn-secondary">
                {HERO.secondaryCta.label}
              </Link>
            </div>

            <p className="mt-8 max-w-md border-l border-border-strong pl-3 text-xs leading-5 text-muted">
              {HERO.stage}
            </p>
          </div>

          <div className="relative lg:rotate-[-1.2deg]">
            <SystemBoard />
          </div>
        </div>

        <div className="relative z-10 border-t border-border">
          <div className="container-page grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {STATUS_STRIP.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between gap-4 py-3 sm:block sm:px-5 sm:first:pl-0 sm:last:pr-0">
                <p className="mono flex items-center gap-1.5 text-[8.5px] uppercase tracking-[0.12em] text-muted">
                  <span className="h-1 w-1 rounded-full bg-olive" aria-hidden="true" />
                  {item.label}
                </p>
                <p className="text-[11.5px] text-muted sm:mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="products-heading">
        <div className="container-page">
          <SectionHeading
            index="01 / Products"
            id="products-heading"
            title="Four building blocks. A focused roadmap."
            intro="Each module solves one narrow problem. Availability is shown per product and is not implied by this roadmap."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
            {PRODUCTS.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs leading-5 text-muted">
              All four modules are Planned. No module is available for use today.
            </p>
            <p className="mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
              Fig. 02–05 · Module records
            </p>
          </div>
        </div>
      </section>

      <section
        className="section section-paper border-b border-border"
        aria-labelledby="workflow-heading"
      >
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="section-index">02 / Workflow</p>
              <h2 id="workflow-heading" className="h2 mt-4">
                Connect. Observe. Operate.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <span className="badge-stage" data-stage="planned">
                <span className="badge-dot" aria-hidden="true" />
                Planned workflow
              </span>
              <p className="max-w-xs text-right text-xs leading-5 text-muted">
                A sequence of intent, not a live product experience.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {WORKFLOW.map((item) => (
              <div key={item.step} className="border-t border-border-strong pt-5">
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-[11px] text-paper">
                  {item.step}
                </span>
                <p className="mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  {item.label}
                </p>
                <h3 className="h3 mt-3">{item.title}</h3>
                <p className="mt-2 max-w-sm text-[13.5px] leading-6 text-muted">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs leading-5 text-muted">
            Illustrative workflow — not a live product experience.
          </p>
        </div>
      </section>

      <section className="section section-lav border-b border-border" aria-labelledby="principles-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="section-index">03 / Principles</p>
            <h2 id="principles-heading" className="h2 mt-4 max-w-[14ch]">
              Clear boundaries. Practical infrastructure.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-muted">
              These are design constraints, not certifications. They describe how the system is
              meant to behave once each part exists.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {PRINCIPLES.map((principle) => (
              <div key={principle.code} className="border-t border-ink pt-4">
                <p className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
                  {principle.code}
                </p>
                <h3 className="mt-3 text-[15px] font-medium leading-6">{principle.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-muted">{principle.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="docs-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="section-index">04 / Documentation</p>
            <h2 id="docs-heading" className="h2 mt-4 max-w-[15ch]">
              Understand the system before you use it.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-muted">
              The documents state what exists, what does not, and how each boundary is meant to
              work. There is no quickstart because there is no callable service yet.
            </p>
            <Link href="/docs/" className="btn btn-secondary mt-7">
              Open documentation
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="border-t border-border-strong">
            {DOC_LINKS.map((doc, index) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="group flex items-start justify-between gap-6 border-b border-border py-5 transition-colors hover:bg-paper"
              >
                <span className="grid flex-1 gap-1 sm:grid-cols-[36px_1fr] sm:gap-4">
                  <span className="mono pt-0.5 text-[9px] tracking-[0.1em] text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-[15.5px] font-medium">{doc.title}</span>
                    <span className="mt-1 block max-w-lg text-[13px] leading-6 text-muted">
                      {doc.detail}
                    </span>
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="pt-1 text-muted transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-paper border-b border-border" aria-labelledby="status-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
          <div>
            <p className="section-index">05 / Status</p>
            <h2 id="status-heading" className="h2 mt-4">
              Service status
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-muted">
              Public status is published only from sanitized checks with a recorded collection
              time. Until monitoring is connected, this section reports exactly that.
            </p>
            <Link href="/status/" className="link-arrow mt-6">
              View status page
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="status-panel">
            <div className="status-panel__head">
              <p className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
                Public status · Schema v1
              </p>
              <span className="mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
                Not connected
              </span>
            </div>
            <div className="status-panel__body">
              <p className="text-[15px] font-medium leading-6">
                Monitoring is not connected yet.
              </p>
              <p className="mt-1.5 max-w-lg text-[13.5px] leading-6 text-muted">
                No live service status or uptime history is available on this page.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full border border-border-strong"
                  aria-hidden="true"
                />
                <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
                  No component is reported as operational
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-3">
              <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
                Data source: none
              </span>
              <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
                Last check: none
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-ink relative overflow-hidden" aria-labelledby="closing-heading">
        <div className="grid-ink pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <CauriumMark
          className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 text-[#f6f4ee] opacity-[0.08]"
          mono
        />
        <div className="container-page relative py-16 md:py-24">
          <p className="mono text-[10px] uppercase tracking-[0.16em] text-[#f6f4ee]/60">
            06 / Follow the build
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 id="closing-heading" className="display max-w-[12ch] text-[#f6f4ee]">
                Follow the build.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-[#f6f4ee]/70">
                The roadmap is public. The claims stay checkable. Each stage changes only when its
                evidence does.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/products/" className="btn btn-inverse">
                Explore the roadmap
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/docs/" className="btn btn-inverse-outline">
                Read the docs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
