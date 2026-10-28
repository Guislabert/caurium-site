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
  title: 'Caurium — endpoint monitoring in private preview',
  description:
    'Probe checks the endpoints you own, opens one incident after three failures, alerts a webhook and publishes a sanitized status page. Private preview from €19 per month. Gate, Guard and Box are planned.',
  path: '/',
  absoluteTitle: true,
  ogImage: '/og/home.png',
});

const PROBLEMS = [
  {
    code: '01',
    title: 'A key that cannot be revoked alone.',
    detail:
      'One API key is copied into a second service. Revoking it breaks both, so nobody revokes it.',
    product: 'Gate',
    href: '/products/gate/',
  },
  {
    code: '02',
    title: 'An endpoint that is down while the status page stays green.',
    detail: 'Someone remembered to deploy. Nobody remembered to update the page.',
    product: 'Probe',
    href: '/products/probe/',
  },
  {
    code: '03',
    title: 'A backup that has never been restored.',
    detail: 'The job is green. The restore has never been run.',
    product: 'Guard',
    href: '/products/guard/',
  },
  {
    code: '04',
    title: 'A dev server that outlives the project.',
    detail: 'Shared credentials, unclear ownership, no clean way to reclaim it.',
    product: 'Box',
    href: '/products/box/',
  },
] as const;

const WORKFLOW = [
  {
    step: '01',
    label: 'Connect',
    title: 'Connect',
    detail:
      'A caller presents a Caurium key. Gate checks identity, scope and remaining budget, then forwards to one allow-listed upstream. The caller gets a response or a typed error.',
  },
  {
    step: '02',
    label: 'Observe',
    title: 'Observe',
    detail:
      'Probe requests a fixed, owner-authorized endpoint on a schedule and records status, latency and the check time. Three consecutive failures open an incident; stale data shows Unknown.',
  },
  {
    step: '03',
    label: 'Operate',
    title: 'Operate',
    detail:
      'Guard records the asset, encrypts a backup off-site and proves a restore in a clean environment. The result is written down, including failure.',
  },
] as const;

const PRINCIPLES = [
  {
    code: 'P.01',
    title: 'One credential, one caller.',
    detail:
      'Every caller gets its own key and limits. Revoking one does not break another.',
  },
  {
    code: 'P.02',
    title: 'A boundary is not a hidden URL.',
    detail:
      'Management access is a separate application with its own identity, not a path on the public site.',
  },
  {
    code: 'P.03',
    title: 'Unknown is a valid answer.',
    detail:
      'Missing, stale or malformed data is shown as Unknown, never carried forward as green.',
  },
  {
    code: 'P.04',
    title: 'No capability without a record.',
    detail:
      'A feature is called available only after its test is run and written down. A passing build is not evidence.',
  },
] as const;

const TRUST_LINKS = [
  {
    href: '/architecture/',
    title: 'How the domains are separated',
    detail: 'Public site, product services and management access do not share runtime credentials.',
  },
  {
    href: '/trust/#not-claimed',
    title: 'What we do not claim',
    detail: 'No certification, SLA, uptime percentage or customer reference.',
  },
  {
    href: '/trust/#gaps',
    title: 'The reporting gap',
    detail: 'No public security channel exists yet. This is a release blocker, not a footnote.',
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
    detail: 'How public, product and management domains are separated.',
  },
  {
    href: '/docs/faq/',
    title: 'FAQ',
    detail: 'Availability, prices, regions, status and how to report a concern.',
  },
] as const;

const STATUS_STRIP = [
  { label: 'Modules', value: 'One live, three planned' },
  { label: 'Probe', value: 'Private preview' },
  { label: 'Activation', value: 'Manual, by hand' },
  { label: 'Last review', value: '29 Oct 2026' },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container-page relative z-10 grid gap-12 py-14 md:py-20 lg:grid-cols-[1.16fr_0.84fr] lg:items-center lg:gap-14 lg:py-24">
          <div>
            <p className="eyebrow">{HERO.eyebrow}</p>

            <h1 className="display hero-title mt-6 max-w-[18ch]">{HERO.title}</h1>
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
          <div className="container-page grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {STATUS_STRIP.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4 py-3 sm:block sm:px-5 sm:first:pl-0 sm:last:pr-0"
              >
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

      <section className="section section-paper border-b border-border" aria-labelledby="problem-heading">
        <div className="container-page">
          <SectionHeading
            index="01 / The problem"
            id="problem-heading"
            title="The failures we are designing against."
            intro="None of these is a customer story. They are the failure modes the four modules are meant to make visible."
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-[18px] border border-border bg-border sm:grid-cols-2">
            {PROBLEMS.map((item) => (
              <Link
                key={item.code}
                href={item.href}
                className="group flex flex-col justify-between gap-8 bg-paper p-6 transition-colors hover:bg-background md:p-8"
              >
                <div>
                  <p className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
                    {item.code} / Design target
                  </p>
                  <h3 className="mt-4 max-w-[24ch] text-[21px] font-medium leading-[1.25] tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[13.5px] leading-6 text-muted">{item.detail}</p>
                </div>
                <span className="link-arrow self-start">
                  {item.product}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-5 text-xs leading-5 text-muted">
            Design targets, not observed incidents. Probe is in private preview; Gate, Guard and Box
            are planned.
          </p>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="products-heading">
        <div className="container-page">
          <SectionHeading
            index="02 / Products"
            id="products-heading"
            title="Four modules. Four narrow jobs."
            intro="Each module has one job, one boundary and its own acceptance criteria. A release in one does not promote another."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
            {PRODUCTS.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs leading-5 text-muted">
              Probe is available in private preview. Gate, Guard and Box are planned.
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
              <p className="section-index">03 / Workflow</p>
              <h2 id="workflow-heading" className="h2 mt-4">
                Connect. Observe. Operate.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <span className="badge-stage" data-stage="private-preview">
                <span className="badge-dot" aria-hidden="true" />
                Observe is live
              </span>
              <p className="max-w-xs text-right text-xs leading-5 text-muted">
                Probe handles the Observe step today. Connect and Operate remain designs for Gate and
                Guard.
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

          <p className="mt-10 max-w-2xl text-xs leading-5 text-muted">
            What Probe gives you today: a status page with a timestamp, one webhook message when an
            incident opens and one when it recovers. A Gate key and a Guard restore record are still
            designs.
          </p>
        </div>
      </section>

      <section className="section section-lav border-b border-border" aria-labelledby="principles-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="section-index">04 / Principles</p>
            <h2 id="principles-heading" className="h2 mt-4 max-w-[15ch]">
              What we will and will not claim.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-muted">
              These are design constraints, not certifications. They describe how the system must
              behave once each part exists — and how this site is allowed to describe it.
            </p>
            <Link href="/docs/product-stages/" className="link-arrow mt-6">
              How a stage changes
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
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

      <section className="section section-lime border-b border-border" aria-labelledby="trust-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="section-index">05 / Boundaries</p>
            <h2 id="trust-heading" className="h2 mt-4 max-w-[14ch]">
              Trust is a boundary, not a badge.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-ink-2">
              Caurium has no certifications, customer references or uptime history to publish. What
              it can show is how the public site, product services and management access are
              separated — and what is still missing.
            </p>
            <Link href="/trust/" className="btn btn-secondary mt-7">
              Open trust &amp; claims
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="border-t border-border-strong">
            {TRUST_LINKS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start justify-between gap-6 border-b border-border py-5 transition-colors hover:bg-paper/60"
              >
                <span className="grid flex-1 gap-1 sm:grid-cols-[36px_1fr] sm:gap-4">
                  <span className="mono pt-0.5 text-[9px] tracking-[0.1em] text-ink-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-[15.5px] font-medium">{item.title}</span>
                    <span className="mt-1 block max-w-lg text-[13px] leading-6 text-ink-2">
                      {item.detail}
                    </span>
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="pt-1 text-ink-2 transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="docs-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="section-index">06 / Documentation</p>
            <h2 id="docs-heading" className="h2 mt-4 max-w-[15ch]">
              Read what exists before you rely on it.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-muted">
              Start with the overview and the stage dictionary. The Probe page documents its live
              status contract and the limits it does not promise.
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
            <p className="section-index">07 / Status</p>
            <h2 id="status-heading" className="h2 mt-4">
              Service status
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-muted">
              Each Probe account gets a status page built from its own checks. Caurium’s own
              site-wide feed is not connected yet, so this section reports that instead of a green
              summary.
            </p>
            <Link href="/status/" className="link-arrow mt-6">
              View status page
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div>
            <div className="status-panel">
              <div className="status-panel__head">
                <p className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
                  Caurium site feed · Schema v1
                </p>
                <span className="mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
                  Not connected
                </span>
              </div>
              <div className="status-panel__body">
                <p className="text-[15px] font-medium leading-6">
                  The site-wide feed is not connected.
                </p>
                <p className="mt-1.5 max-w-lg text-[13.5px] leading-6 text-muted">
                  Probe customer pages are live. This page does not claim a Caurium uptime history.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full border border-border-strong"
                    aria-hidden="true"
                  />
                  <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
                    No site-wide component is reported as operational
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

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              {['Operational', 'Degraded', 'Outage', 'Maintenance', 'Unknown'].map((state) => (
                <span
                  key={state}
                  className="mono flex items-center gap-1.5 text-[8.5px] uppercase tracking-[0.1em] text-muted"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      state === 'Unknown' ? 'border border-border-strong' : 'bg-border-strong'
                    }`}
                    aria-hidden="true"
                  />
                  {state}
                </span>
              ))}
              <span className="text-[11px] leading-5 text-muted">
                All states are Unknown until a feed is connected.
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
            08 / Build log
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 id="closing-heading" className="display max-w-[12ch] text-[#f6f4ee]">
                Read the plan. Check the evidence.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-[#f6f4ee]/70">
                The roadmap is public, every claim is dated, and a stage changes only when its
                evidence does. The build log records what changed — including what is still
                missing.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/build-log/" className="btn btn-inverse">
                Open the build log
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
