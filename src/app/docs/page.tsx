import type { Metadata } from 'next';
import Link from 'next/link';
import { Callout } from '@/components/Callout';
import { DocsShell } from '@/components/DocsShell';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Documentation',
  description:
    'Caurium documentation: system concepts, the stage dictionary that governs every product page, security boundaries and what is available today.',
  path: '/docs/',
  ogImage: '/og/docs.png',
  ogAlt: 'Caurium documentation — concepts, stages and security boundaries.',
});

const DOCS = [
  {
    href: '/docs/overview/',
    title: 'System overview',
    detail: 'Concepts, the four modules, service domains and what is outside the public site.',
  },
  {
    href: '/docs/product-stages/',
    title: 'Product stages',
    detail: 'The stage dictionary, current status of each module, and how a stage changes.',
  },
  {
    href: '/docs/security/',
    title: 'Security boundaries',
    detail: 'Public, product and management separation, credentials, logging and reporting.',
  },
  {
    href: '/docs/faq/',
    title: 'FAQ',
    detail: 'Availability, prices, regions, status data, examples and reporting.',
  },
  {
    href: '/docs/glossary/',
    title: 'Glossary',
    detail: 'Module, stage, health, sanitized status, evidence and the other terms used here.',
  },
] as const;

export default function DocsPage() {
  return (
    <DocsShell
      current="/docs/"
      title="Understand the system before you use it."
      description="These documents describe what Caurium runs today, what is planned, and where the boundaries are. They are written to stay useful when part of the system is still planned."
      toc={[
        { id: 'documents', label: 'Documents' },
        { id: 'reading-paths', label: 'Reading paths' },
        { id: 'current-state', label: 'Current state' },
        { id: 'not-contained', label: 'What is not here' },
        { id: 'next', label: 'Where to go next' },
      ]}
    >
      <p>
        Caurium is a small set of infrastructure modules: Gate for controlled API access, Probe for
        endpoint monitoring, Guard for operational safeguards, and Box for invitation-only
        development environments. Probe is in <strong>private preview</strong> with manual
        activation. Gate, Guard and Box are <strong>Planned</strong>. The public website and the
        Probe service exist as running builds.
      </p>

      <Callout title="There is no public quickstart." tone="warning">
        Probe accounts are activated by hand. There is no self-serve console or public API key
        issuance. The documents below explain the live status contract, scope and boundaries; the{' '}
        <Link href="/start/">application form</Link> is the only intake path.
      </Callout>

      <h2 id="documents">Documents</h2>
      <div>
        {DOCS.map((doc, index) => (
          <Link
            key={doc.href}
            href={doc.href}
            className="doc-row group flex items-start justify-between gap-6 border-b border-border py-4 first:border-t first:border-border-strong"
          >
            <span className="grid flex-1 gap-1 sm:grid-cols-[32px_1fr] sm:gap-4">
              <span className="mono pt-0.5 text-[11px] tracking-[0.06em] text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="doc-row-title block text-[16px] font-medium text-foreground">
                  {doc.title}
                </span>
                <span className="mt-1 block text-[13.5px] leading-6 text-muted">{doc.detail}</span>
              </span>
            </span>
            <span aria-hidden="true" className="pt-1 text-muted transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        ))}
      </div>

      <h2 id="reading-paths">Reading paths</h2>
      <div className="grid gap-px overflow-hidden rounded-[10px] border border-border bg-border sm:grid-cols-3">
        {[
          {
            title: 'Evaluating Caurium',
            detail: 'Overview → Product stages → Security boundaries → FAQ',
            href: '/docs/overview/',
          },
          {
            title: 'Designing against a contract',
            detail: 'Product page → Example → Limits → Open questions',
            href: '/products/',
          },
          {
            title: 'Checking a claim',
            detail: 'Claims register → Build log → Status',
            href: '/trust/',
          },
        ].map((path) => (
          <Link
            key={path.title}
            href={path.href}
            className="group bg-background p-5 transition-colors hover:bg-paper"
          >
            <p className="text-[15px] font-medium leading-5">{path.title}</p>
            <p className="mt-2 text-[12.5px] leading-5 text-muted">{path.detail}</p>
            <span className="mono mt-4 inline-block text-[11px] uppercase tracking-[0.06em] text-accent-ink">
              Start →
            </span>
          </Link>
        ))}
      </div>

      <h2 id="current-state">Current state</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Part</th>
              <th scope="col">State</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Public website</th>
              <td>Static site</td>
              <td>Brand, roadmap, documentation, legal pages and status page.</td>
            </tr>
            <tr>
              <th scope="row">Probe</th>
              <td>Private preview</td>
              <td>Activation by application and live customer status pages.</td>
            </tr>
            <tr>
              <th scope="row">Gate, Guard, Box</th>
              <td>Planned</td>
              <td>Not for sale. No deployment exists.</td>
            </tr>
            <tr>
              <th scope="row">Caurium site-wide feed</th>
              <td>Not connected</td>
              <td>No Caurium uptime history is published.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="not-contained">What these documents will not contain</h2>
      <ul>
        <li>Hostnames, addresses, ports or credentials for internal or separately operated services.</li>
        <li>A registration flow, API key generation or console instructions for a product that is not available.</li>
        <li>Uptime percentages, performance numbers or customer evidence that has not been measured.</li>
        <li>Release dates that have not been committed by the operator.</li>
      </ul>

      <h2 id="next">Where to go next</h2>
      <p>
        Start with the <Link href="/docs/overview/">system overview</Link>, then read the{' '}
        <Link href="/docs/product-stages/">stage dictionary</Link> before interpreting any product
        label. The <Link href="/docs/security/">security boundaries</Link> page explains how
        public, product and management access are separated. For short answers, read the{' '}
        <Link href="/docs/faq/">FAQ</Link>; for the status of each public claim, read the{' '}
        <Link href="/trust/">claims register</Link>.
      </p>
    </DocsShell>
  );
}
