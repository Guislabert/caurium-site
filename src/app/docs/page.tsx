import type { Metadata } from 'next';
import Link from 'next/link';
import { Callout } from '@/components/Callout';
import { DocsShell } from '@/components/DocsShell';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Documentation',
  description:
    'Caurium documentation: system concepts, product stages, security boundaries and current availability.',
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
] as const;

export default function DocsPage() {
  return (
    <DocsShell
      current="/docs/"
      title="Understand the system before you use it."
      description="These documents describe what Caurium is building, what exists today, and where the boundaries are. They are written to stay useful when a product is still Planned."
      toc={[
        { id: 'documents', label: 'Documents' },
        { id: 'current-state', label: 'Current state' },
        { id: 'not-contained', label: 'What is not here' },
        { id: 'next', label: 'Where to go next' },
      ]}
    >
      <p>
        Caurium is a small set of infrastructure modules: Gate for controlled API access, Probe for
        service monitoring, Guard for operational safeguards, and Box for invitation-only
        development environments. At the time of writing, all four are <strong>Planned</strong>.
        The public website is the only part that exists as a running build.
      </p>

      <Callout title="There is no quickstart." tone="warning">
        There is no callable API, console, account or API key. A quickstart would imply a service
        that does not exist. The documents below explain concepts, scope and boundaries instead.
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
              <span className="mono pt-0.5 text-[9px] tracking-[0.1em] text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="doc-row-title block text-[15.5px] font-medium text-foreground">
                  {doc.title}
                </span>
                <span className="mt-1 block text-[13px] leading-6 text-muted">{doc.detail}</span>
              </span>
            </span>
            <span aria-hidden="true" className="pt-1 text-muted transition-transform group-hover:translate-x-1">
              →
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
              <th scope="row">Gate, Probe, Guard, Box</th>
              <td>Planned</td>
              <td>No module is available for use.</td>
            </tr>
            <tr>
              <th scope="row">Public monitoring</th>
              <td>Not connected</td>
              <td>No live service status or uptime history is published.</td>
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
        public, product and management access are separated.
      </p>
    </DocsShell>
  );
}
