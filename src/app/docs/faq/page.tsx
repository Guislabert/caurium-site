import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsShell } from '@/components/DocsShell';
import { FAQ } from '@/content/faq';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'FAQ',
  description:
    'Answers about Caurium availability, prices, regions, status data and how to report a security concern.',
  path: '/docs/faq/',
  ogImage: '/og/docs.png',
  ogAlt: 'Caurium frequently asked questions.',
});

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <DocsShell
        current="/docs/faq/"
        title="Frequently asked questions"
        description="Short answers about what exists, what does not, and what Caurium will not claim. Every answer describes the current public state or an intended design."
      >
        <p>
          These are the questions a reader should ask before relying on a page. If an answer is not
          here, the <Link href="/trust/">claims register</Link> records what is verified and what is
          still a gap.
        </p>

        <div className="mt-8 border-t border-border-strong">
          {FAQ.map((item, index) => (
            <details key={item.question} className="group border-b border-border py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[14.5px] font-medium leading-6 text-ink [&::-webkit-details-marker]:hidden">
                <span className="grid flex-1 grid-cols-[28px_1fr] gap-2">
                  <span className="mono pt-0.5 text-[9px] tracking-[0.1em] text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="mono pt-0.5 text-[13px] text-muted transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 pl-9 text-[13.5px] leading-6 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>

        <h2 id="next">Where to go next</h2>
        <p>
          Read the <Link href="/docs/product-stages/">stage dictionary</Link> before interpreting any
          product label. The <Link href="/docs/security/">security boundaries</Link> page describes
          the access, credential and logging model. The <Link href="/trust/">claims register</Link>{' '}
          lists every public claim with its evidence status.
        </p>
      </DocsShell>
    </>
  );
}
