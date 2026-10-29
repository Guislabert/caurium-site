import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsShell } from '@/components/DocsShell';
import { GLOSSARY } from '@/content/glossary';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Glossary',
  description:
    'Definitions for the terms used across Caurium: module, stage, health, sanitized status, allow-listed upstream and evidence.',
  path: '/docs/glossary/',
  ogImage: '/og/docs.png',
  ogAlt: 'Caurium glossary.',
});

export default function GlossaryPage() {
  return (
    <DocsShell
      current="/docs/glossary/"
      title="Glossary"
      description="The terms this site uses, defined once. Where a term has a stricter meaning in a product page, the product page wins."
    >
      <dl className="border-t border-border-strong">
        {GLOSSARY.map((entry) => (
          <div
            key={entry.term}
            className="grid gap-2 border-b border-border py-5 sm:grid-cols-[180px_1fr] sm:gap-6"
          >
            <dt className="text-[15.5px] font-medium text-ink">{entry.term}</dt>
            <dd className="note text-[14px] leading-6 text-muted">
              {entry.definition}
              {entry.href && entry.linkLabel ? (
                <>
                  {' '}
                  <Link href={entry.href} className="text-link">
                    {entry.linkLabel}
                  </Link>
                </>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>

      <h2 id="usage">How to read a product page</h2>
      <p>
        A product page states its stage, the problem it addresses, the intended workflow, its
        boundaries, release criteria and open questions. A capability marked <strong>Planned</strong>{' '}
        has not been verified. An example marked <strong>Proposed</strong> is not callable.
      </p>
      <p>
        The <Link href="/docs/product-stages/">stage dictionary</Link> defines every label and the
        evidence required to change it.
      </p>
    </DocsShell>
  );
}
