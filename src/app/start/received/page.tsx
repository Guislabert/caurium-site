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
            It is stored by the Probe service and reviewed by hand. If the endpoints and plan fit,
            we send a Stripe payment link and the activation steps. If something is missing, we
            reply with the exact question.
          </>
        }
        meta={
          <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
            Manual review · No SLA
          </span>
        }
      />

      <section className="section border-b border-border">
        <div className="container-page max-w-2xl">
          <p className="text-sm leading-7 text-ink-2">
            Nothing is monitored and no payment is taken until you confirm the payment link.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/pricing/" className="btn btn-secondary">
              Back to pricing
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
