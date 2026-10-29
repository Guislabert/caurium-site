import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { CLAIMS, CLAIM_STAGE_LABELS } from '@/content/claims';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Trust and claims',
  description:
    'Every public Caurium claim with its page, stage and evidence status. No certifications, customer references or uptime history are claimed.',
  path: '/trust/',
  ogImage: '/og/trust.png',
  ogAlt: 'Caurium trust and claims register.',
});

const NOT_CLAIMED = [
  'No SOC 2, ISO 27001, HIPAA or other certification.',
  'No penetration-test result, bug-bounty program or audit report.',
  'No availability guarantee, SLA or response-time commitment.',
  'No customer, logo, testimonial or case study.',
  'No checkout on this site, and no charge during the preview. Planned prices and limits are listed.',
  'No region label for a product or probe that has not run there.',
  'No uptime percentage or performance benchmark.',
] as const;

const GAPS = [
  {
    title: 'No public legal entity or governing law',
    detail:
      'The privacy notice and terms say so explicitly, which is why no payment is accepted. The three contact addresses are published and all three accept mail at the MX; security@ has had a delivery confirmed. What is missing is a named party to hold responsible.',
  },
  {
    title: 'No published security response commitment',
    detail:
      'A security address is published and delivery to it has been confirmed. No acknowledgement window, triage process or bug-bounty programme is documented, so no response time is promised.',
  },
  {
    title: 'No operating entity behind the prices',
    detail:
      'Caurium is a project name, not a registered company. The planned prices are published, but nothing is charged until the entity, governing law and a billing contact exist.',
  },
  {
    title: 'The site is not indexable yet',
    detail:
      'The apex serves this site over HTTPS and www redirects to it, but the build stays noindex while no legal entity is published. Indexing turns on when paid activation does, so search traffic is not pointed at a project with no accountable operator.',
  },
  {
    title: 'Payment and activation are manual',
    detail:
      'No checkout runs on this site and nothing is charged during the preview. Accounts are created by hand after an ownership check.',
  },
] as const;

const SEPARATION = [
  {
    title: 'Public site',
    detail:
      'A static build with no login, database, product credential or management route.',
  },
  {
    title: 'Product services',
    detail:
      'Probe runs as a separate Worker with its own D1 database, scheduler and customer records. Gate and Guard are in development; Box is planned.',
  },
  {
    title: 'Management access',
    detail:
      'A separate application with its own identity and permissions. It is not a path on the public site.',
  },
] as const;

export default function TrustPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Trust & claims' }]}
        title="Trust is a boundary, not a badge."
        description="Caurium has no certifications, customer references or uptime history to publish. This page records every public claim, what supports it, and what is still missing."
        meta={
          <>
            <span className="badge-stage" data-stage="private-preview">
              <span className="badge-dot" aria-hidden="true" />
              Claims reviewed 29 Oct 2026
            </span>
            <span className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
              No certification claimed
            </span>
          </>
        }
      />

      <section className="section border-b border-border" aria-labelledby="state-heading">
        <div className="container-page">
          <h2 id="state-heading" className="h2 max-w-[18ch]">
            What exists, in four lines.
          </h2>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-[12px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '04', label: 'Modules', detail: 'Probe live, three in development' },
              { value: '01', label: 'Live product', detail: 'Probe, private preview' },
              { value: '00', label: 'Published customers', detail: 'No reference is claimed' },
              { value: '00', label: 'Certifications', detail: 'None claimed' },
            ].map((fact) => (
              <div key={fact.label} className="bg-paper p-6">
                <dt className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
                  {fact.label}
                </dt>
                <dd className="mono mt-2 text-3xl leading-none tracking-[-0.03em]">{fact.value}</dd>
                <dd className="note mt-2 text-[12px] leading-5 text-muted">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section border-b border-border bg-paper" aria-labelledby="claims-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="claims-heading" className="h2 max-w-[18ch]">
                Every public claim, with its evidence.
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-5 text-muted">
              Fact means it describes the deployed site or Probe service. Planned and Intended
              design describe what does not exist yet. Known gap is a blocker, not a promise.
            </p>
          </div>

          <div className="table-scroll mt-10 rounded-[10px] border border-border">
            <table className="w-full border-collapse text-left text-[13.5px]">
              <caption className="sr-only">
                Public Caurium claims with their page, stage and evidence status
              </caption>
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th scope="col" className="px-4 py-3 font-medium">Claim</th>
                  <th scope="col" className="px-4 py-3 font-medium">Page</th>
                  <th scope="col" className="px-4 py-3 font-medium">Stage</th>
                  <th scope="col" className="px-4 py-3 font-medium">Evidence</th>
                </tr>
              </thead>
              <tbody>
                {CLAIMS.map((claim) => (
                  <tr key={claim.claim} className="border-b border-border align-top last:border-b-0">
                    <td className="max-w-[320px] px-4 py-3 leading-5">{claim.claim}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Link href={claim.href} className="text-accent-ink hover:underline">
                        {claim.page}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`mono text-[11px] uppercase tracking-[0.06em] ${
                          claim.stage === 'gap'
                            ? 'text-warning'
                            : claim.stage === 'fact'
                              ? 'text-olive'
                              : 'text-muted'
                        }`}
                      >
                        {CLAIM_STAGE_LABELS[claim.stage]}
                      </span>
                    </td>
                    <td className="max-w-[320px] px-4 py-3 leading-5 text-muted">
                      {claim.evidence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="separation-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="separation-heading" className="h2 max-w-[15ch]">
              What is kept apart.
            </h2>
            <p className="mt-5 note max-w-sm text-[14px] leading-6 text-muted">
              The public site explains the system; it does not operate it. These boundaries are the
              part of trust that can be inspected rather than asserted.
            </p>
            <Link href="/architecture/" className="link-arrow mt-6">
              Read the architecture
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="border-t border-border-strong">
            {SEPARATION.map((item) => (
              <div key={item.title} className="border-b border-border py-5">
                <div>
                  <h3 className="text-[16px] font-medium leading-6">{item.title}</h3>
                  <p className="note mt-1.5 text-[14px] leading-6 text-muted">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-border bg-paper" id="not-claimed" aria-labelledby="not-claimed-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="not-claimed-heading" className="h2 max-w-[14ch]">
              What this page will not say.
            </h2>
          </div>
          <ul className="border-t border-border-strong">
            {NOT_CLAIMED.map((item) => (
              <li key={item} className="border-b border-border py-4">
                <span className="block text-[14px] leading-6 text-ink-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-b border-border" id="gaps" aria-labelledby="gaps-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="gaps-heading" className="h2 max-w-[15ch]">
              What is still missing.
            </h2>
            <p className="mt-5 note max-w-sm text-[14px] leading-6 text-muted">
              These are recorded as production blockers. A missing item is not a hidden item; it is
              listed here until it exists.
            </p>
          </div>
          <div className="border-t border-border-strong">
            {GAPS.map((gap) => (
              <div key={gap.title} className="border-b border-border py-5">
                <div>
                  <h3 className="text-[15.5px] font-medium leading-6">{gap.title}</h3>
                  <p className="note mt-1.5 text-[14px] leading-6 text-muted">{gap.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="history-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="history-heading" className="h2">
              What changed, and when.
            </h2>
          </div>
          <div className="space-y-5">
            <p className="note text-[14px] leading-7 text-muted">
              The claims register is reviewed with the site content. The build log records each
              review, including corrections and removals. There is no newsletter; the RSS feed is
              the notification channel.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/build-log/" className="btn btn-secondary">
                Open the build log
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/docs/faq/" className="btn btn-secondary">
                Read the FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
