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
      'The privacy notice and terms say so explicitly, which is why no payment is accepted. The privacy, support and security addresses are published and deliver.',
  },
  {
    title: 'No published security response commitment',
    detail:
      'A security address exists and delivers. What does not exist is a stated acknowledgement window or a bug-bounty programme, so no response time is promised.',
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
      'No checkout runs on this site. A Stripe link is sent after ownership is confirmed, and accounts are created by hand.',
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
      'Probe runs as a separate Worker with its own D1 database, scheduler and customer records. Gate, Guard and Box are planned.',
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
        eyebrow="Trust & claims"
        title="Trust is a boundary, not a badge."
        description="Caurium has no certifications, customer references or uptime history to publish. This page records every public claim, what supports it, and what is still missing."
        meta={
          <>
            <span className="badge-stage" data-stage="private-preview">
              <span className="badge-dot" aria-hidden="true" />
              Claims reviewed 29 Oct 2026
            </span>
            <span className="mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
              No certification claimed
            </span>
          </>
        }
      />

      <section className="section border-b border-border" aria-labelledby="state-heading">
        <div className="container-page">
          <p className="section-index">01 / Current state</p>
          <h2 id="state-heading" className="h2 mt-4 max-w-[18ch]">
            What exists, in four lines.
          </h2>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-[18px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '04', label: 'Modules', detail: 'Probe live, three planned' },
              { value: '01', label: 'Live product', detail: 'Probe, private preview' },
              { value: '00', label: 'Published customers', detail: 'No reference is claimed' },
              { value: '00', label: 'Certifications', detail: 'None claimed' },
            ].map((fact) => (
              <div key={fact.label} className="bg-paper p-6">
                <dt className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
                  {fact.label}
                </dt>
                <dd className="mono mt-2 text-3xl leading-none tracking-[-0.03em]">{fact.value}</dd>
                <dd className="mt-2 text-[11.5px] leading-5 text-muted">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section border-b border-border bg-paper" aria-labelledby="claims-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-index">02 / Claims register</p>
              <h2 id="claims-heading" className="h2 mt-4 max-w-[18ch]">
                Every public claim, with its evidence.
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-5 text-muted">
              Fact means it describes the deployed site or Probe service. Planned and Intended
              design describe what does not exist yet. Known gap is a blocker, not a promise.
            </p>
          </div>

          <div className="table-scroll mt-10 rounded-[16px] border border-border">
            <table className="w-full border-collapse text-left text-[13px]">
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
                      <Link href={claim.href} className="text-accent hover:underline">
                        {claim.page}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`mono text-[9px] uppercase tracking-[0.1em] ${
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
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">03 / Separation</p>
            <h2 id="separation-heading" className="h2 mt-4 max-w-[15ch]">
              What is kept apart.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              The public site explains the system; it does not operate it. These boundaries are the
              part of trust that can be inspected rather than asserted.
            </p>
            <Link href="/architecture/" className="link-arrow mt-6">
              Read the architecture
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="border-t border-border-strong">
            {SEPARATION.map((item, index) => (
              <div key={item.title} className="grid grid-cols-[36px_1fr] gap-4 border-b border-border py-5">
                <span className="mono pt-1 text-[9px] tracking-[0.1em] text-muted">
                  S.{String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-[15.5px] font-medium leading-6">{item.title}</h3>
                  <p className="mt-1.5 max-w-xl text-[13.5px] leading-6 text-muted">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-border bg-paper" id="not-claimed" aria-labelledby="not-claimed-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">04 / Not claimed</p>
            <h2 id="not-claimed-heading" className="h2 mt-4 max-w-[14ch]">
              What this page will not say.
            </h2>
          </div>
          <ul className="border-t border-border-strong">
            {NOT_CLAIMED.map((item, index) => (
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

      <section className="section border-b border-border" id="gaps" aria-labelledby="gaps-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">05 / Known gaps</p>
            <h2 id="gaps-heading" className="h2 mt-4 max-w-[15ch]">
              What is still missing.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              These are recorded as production blockers. A missing item is not a hidden item; it is
              listed here until it exists.
            </p>
          </div>
          <div className="border-t border-border-strong">
            {GAPS.map((gap, index) => (
              <div key={gap.title} className="grid grid-cols-[36px_1fr] gap-4 border-b border-border py-5">
                <span className="mono pt-1 text-[9px] tracking-[0.1em] text-warning">
                  G.{String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-[15px] font-medium leading-6">{gap.title}</h3>
                  <p className="mt-1.5 max-w-xl text-[13px] leading-6 text-muted">{gap.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="history-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">06 / Change history</p>
            <h2 id="history-heading" className="h2 mt-4">
              What changed, and when.
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-[14px] leading-7 text-muted">
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
