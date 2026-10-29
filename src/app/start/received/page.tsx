import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Application received',
    description:
      'Your Probe application reached the Caurium service. We review applications by hand and reply to the email you gave.',
    path: '/start/received/',
    ogImage: '/og/start.png',
    ogAlt: 'Caurium Probe application received.',
  }),
  robots: { index: false, follow: false },
};

export default function ApplicationReceivedPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Apply', href: '/start/' }, { label: 'Received' }]}
        eyebrow="Probe · Application"
        title="Your application reached the service."
        description={
          <>
            It is stored by the Probe service and reviewed by hand. If the endpoints can be
            verified, we activate the account and send the status page address and a webhook test.
            If something is missing, we reply with the exact question.
          </>
        }
        meta={
          <span className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
            Manual review · No SLA
          </span>
        }
      />

      <section className="section border-b border-border">
        <div className="container-page max-w-2xl">
          <p className="text-sm leading-7 text-ink-2">
            Nothing is monitored until activation, and nothing is charged during the preview.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/access/" className="btn btn-secondary">
              Back to access
            </Link>
            <Link href="/products/probe/" className="btn btn-secondary">
              How Probe works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
