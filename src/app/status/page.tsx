import type { Metadata } from 'next';
import Link from 'next/link';
import { Callout } from '@/components/Callout';
import { CodeBlock } from '@/components/CodeBlock';
import { PageHero } from '@/components/PageHero';
import { StatusSummary } from '@/components/StatusSummary';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Service status',
  description:
    'Current Caurium public status. Monitoring is not connected yet; no live status or uptime history is available.',
  path: '/status/',
  ogImage: '/og/status.png',
  ogAlt: 'Caurium service status — monitoring not connected.',
});

const COVERAGE = [
  {
    component: 'Website',
    check: 'HTTPS reachability and a stable content marker, every 60 seconds.',
    coverage: 'Not connected. No history published.',
  },
  {
    component: 'Gate, Probe, Guard, Box',
    check: 'Only components the operator has verified and chosen to publish.',
    coverage: 'Not connected. Products are Planned.',
  },
] as const;

const RULES = [
  'More than 180 seconds without a fresh check renders the component Unknown, even if the HTTP request succeeds.',
  'A missing, invalid or future-dated timestamp renders Unknown. Updating generatedAt does not refresh an old checkedAt.',
  'A failed publisher cannot reuse a previous green state.',
  'An availability percentage is shown only for a labelled window with complete, valid samples. Missing time is reported as coverage, not as success.',
  'No incident history means no incidents have been published — not that none occurred.',
] as const;

const CONTRACT = `{
  "schemaVersion": 1,
  "generatedAt": "2026-10-28T09:00:00Z",
  "components": [
    {
      "alias": "public-site",
      "region": "global",
      "state": "operational",
      "checkedAt": "2026-10-28T08:59:40Z"
    }
  ]
}`;

export default function StatusPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Status' }]}
        eyebrow="Status"
        title="Service status"
        description="Public status is published only from sanitized checks with a recorded collection time. When there is no valid data, the page says so instead of showing green."
        meta={
          <span className="mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
            Feed · Not connected
          </span>
        }
      />

      <section className="section border-b border-border bg-paper" aria-labelledby="current-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">01 / Current</p>
            <h2 id="current-heading" className="h2 mt-4 max-w-[14ch]">
              What the feed reports.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              The public status feed is optional. It is not connected to an internal monitoring
              dashboard, and it does not forward raw monitoring data.
            </p>
          </div>
          <StatusSummary endpoint={process.env.NEXT_PUBLIC_STATUS_URL || undefined} />
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="coverage-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-index">02 / Coverage</p>
              <h2 id="coverage-heading" className="h2 mt-4 max-w-[20ch]">
                What would be published, and from where.
              </h2>
            </div>
            <p className="mono max-w-xs text-[9.5px] uppercase tracking-[0.1em] text-muted">
              0 components · 0 samples · 0 history
            </p>
          </div>

          <div className="doc-prose mt-10 max-w-none">
            <div className="table-scroll">
              <table className="w-full">
              <thead>
                <tr>
                  <th scope="col">Component</th>
                  <th scope="col">What is checked</th>
                  <th scope="col">Coverage</th>
                </tr>
              </thead>
              <tbody>
                {COVERAGE.map((row) => (
                  <tr key={row.component}>
                    <th scope="row">{row.component}</th>
                    <td>{row.check}</td>
                    <td>{row.coverage}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-border bg-paper" aria-labelledby="rules-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">03 / Rules</p>
            <h2 id="rules-heading" className="h2 mt-4">
              How a state is decided.
            </h2>
          </div>
          <ol className="border-t border-border-strong">
            {RULES.map((rule, index) => (
              <li key={rule} className="grid grid-cols-[36px_1fr] gap-4 border-b border-border py-4">
                <span className="mono text-[9px] tracking-[0.1em] text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[13.5px] leading-6 text-ink-2">{rule}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="contract-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">04 / Contract</p>
            <h2 id="contract-heading" className="h2 mt-4">
              The published shape.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              If a feed is connected, the site validates it before display. A response that does not
              match this schema is treated as unavailable.
            </p>
          </div>
          <div className="min-w-0">
            <CodeBlock
              code={CONTRACT}
              language="json"
              title="public-status.json"
              note="Illustrative example — not a live service."
            />
            <p className="mt-4 text-xs leading-5 text-muted">
              Schema version 1. Required fields: <code className="mono">schemaVersion</code>,{' '}
              <code className="mono">generatedAt</code>, <code className="mono">components</code> with
              alias, region, state and checkedAt. Unknown fields are ignored; unknown states render as
              Unknown.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="not-shown-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">05 / Not shown</p>
            <h2 id="not-shown-heading" className="h2 mt-4">
              What status never exposes.
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-[13.5px] leading-6 text-ink-2">
              Origin addresses, internal hostnames, full check URLs, raw error stacks, probe
              addresses and management credentials. The status endpoint accepts no arbitrary target
              parameters; it publishes a fixed, sanitized component list.
            </p>
            <Callout title="Absence of incidents is not evidence of health." tone="note">
              Before a feed exists, this page reports Unknown. It does not infer uptime from the fact
              that the site is reachable.
            </Callout>
            <p className="text-[13px] leading-6 text-muted">
              See the <Link href="/docs/security/" className="text-link">security boundaries</Link>{' '}
              for the wider model.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
