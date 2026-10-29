import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { BUILD_LOG } from '@/content/build-log';
import { SITE } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Build log',
    description:
      'A dated record of what changed on the Caurium public site, what was corrected, what was removed and what is still missing, with an RSS feed.',
    path: '/build-log/',
    ogImage: '/og/build-log.png',
    ogAlt: 'Caurium build log.',
  }),
  alternates: {
    canonical: `${SITE.url.replace(/\/$/, '')}/build-log/`,
    types: { 'application/rss+xml': '/build-log/feed.xml' },
  },
};

const TYPE_LABELS = {
  content: 'Content',
  docs: 'Documentation',
  design: 'Design',
  release: 'Release',
} as const;

export default function BuildLogPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Build log' }]}
        title="A dated record of what changed."
        description="Every entry states what changed, where to check it, and whether it affected a public claim. This is the follow surface for the project; there is no newsletter."
        meta={
          <a href="/build-log/feed.xml" className="link-arrow">
            RSS feed
            <span aria-hidden="true">→</span>
          </a>
        }
      />

      <section className="section border-b border-border" aria-labelledby="entries-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="entries-heading" className="h2 mt-4 max-w-[14ch]">
              Newest first.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              A build log is not a release announcement. An entry can record a correction, a
              removal, or a gap that is still open.
            </p>
          </div>

          <ol className="border-t border-border-strong">
            {BUILD_LOG.map((entry) => (
              <li key={`${entry.date}-${entry.title}`} className="border-b border-border py-6">
                <div className="flex flex-wrap items-center gap-3">
                  <time
                    dateTime={entry.date}
                    className="mono text-[11px] uppercase tracking-[0.06em] text-muted"
                  >
                    {entry.date}
                  </time>
                  <span className="badge-stage" data-stage="planned">
                    <span className="badge-dot" aria-hidden="true" />
                    {TYPE_LABELS[entry.type]}
                  </span>
                </div>
                <h3 className="mt-3 text-[16px] font-medium leading-6">{entry.title}</h3>
                <p className="note mt-1.5 text-[14px] leading-6 text-muted">{entry.detail}</p>
                {entry.href && entry.linkLabel ? (
                  <Link href={entry.href} className="link-arrow mt-4">
                    {entry.linkLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="not-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <div>
            <h2 id="not-heading" className="h2 mt-4 max-w-[14ch]">
              Not a roadmap with dates.
            </h2>
          </div>
          <div className="space-y-5 text-[14px] leading-7 text-muted">
            <p>
              The log records changes that already happened. It does not promise a release date, and
              an entry is not evidence that a product is available.
            </p>
            <p>
              Product stages live in the <Link href="/docs/product-stages/" className="text-link">stage dictionary</Link>.
              Claims and their evidence live in the <Link href="/trust/" className="text-link">claims register</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
