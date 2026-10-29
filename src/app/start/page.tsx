import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { StartForm } from '@/components/StartForm';
import { PLANS } from '@/content/plans';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Apply for Probe',
  description:
    'Apply for a free Probe private-preview account. Send the endpoints you own, choose a plan, and we confirm ownership before activation. Nothing is charged.',
  path: '/start/',
  ogImage: '/og/start.png',
  ogAlt: 'Apply for a Caurium Probe account.',
});

const PROBE_ENDPOINT =
  process.env.NEXT_PUBLIC_PROBE_URL || 'https://caurium-probe.caurium.workers.dev';

const CHECKS = [
  'You own the endpoints, or are authorized to monitor them.',
  'The URLs are public HTTP or HTTPS targets — no localhost, private ranges or credentials.',
  'You can receive a webhook on an HTTPS endpoint.',
  'The plan limit covers the number of endpoints you send.',
] as const;

export default function StartPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Access', href: '/access/' }, { label: 'Apply' }]}
        title="Send the endpoints. We check ownership."
        description={
          <>
            Probe is in private preview. Applications are reviewed by hand, so every account has a
            named owner and an agreed endpoint list before monitoring starts. No payment is taken
            through this form.
          </>
        }
        meta={
          <>
            <span className="badge-stage" data-stage="private-preview">
              <span className="badge-dot" aria-hidden="true" />
              Private preview
            </span>
            <span className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
              Reviewed by hand · No SLA
            </span>
          </>
        }
      />

      <section className="section border-b border-border" aria-labelledby="apply-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[1.32fr_0.68fr] lg:gap-16">
          <div>
            <h2 id="apply-heading" className="h2 max-w-[24ch]">
              What we need to review the application.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
              The form sends your details to the Probe service. We use them to confirm ownership,
              choose the plan limits and reply. Do not include API keys, passwords or private
              hostnames.
            </p>

            <div className="mt-8">
              <StartForm endpoint={PROBE_ENDPOINT} />
            </div>
          </div>

          <aside className="lg:pt-2">
            <div className="rounded-[10px] border border-border bg-paper p-5">
              <p className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
                Plans
              </p>
              <ul className="mt-4 border-t border-border">
                {PLANS.map((plan) => (
                  <li
                    key={plan.id}
                    className="flex items-baseline justify-between gap-4 border-b border-border py-3"
                  >
                    <span>
                      <span className="block text-[14px] font-medium">{plan.name}</span>
                      <span className="mt-0.5 block text-[12px] text-muted">
                        {plan.endpoints} endpoints · {plan.minIntervalSeconds}s
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="block text-[13.5px] font-medium">Free</span>
                      <span className="mono block text-[11px] uppercase tracking-[0.06em] text-muted">
                        by application
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mono mt-3 text-[11px] uppercase tracking-[0.06em] text-olive">
                Preview is free · no card taken
              </p>
              <Link href="/access/" className="link-arrow mt-4">
                Compare the limits
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="mt-6 rounded-[10px] border border-border bg-background p-5">
              <p className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
                Before activation
              </p>
              <ul className="mt-4 space-y-3">
                {CHECKS.map((item) => (
                  <li key={item} className="flex gap-3 text-[13px] leading-5 text-ink-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-olive"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-[12px] leading-5 text-muted">
              Applying does not create an account, reserve capacity or start a subscription.
            </p>
          </aside>
        </div>
      </section>

      <section className="section section-paper" aria-labelledby="after-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
          <div>
            <p className="section-index">After the form</p>
            <h2 id="after-heading" className="h2 mt-4 max-w-[16ch]">
              What happens next.
            </h2>
          </div>
          <ol className="border-t border-border-strong">
            {[
              [
                'Ownership check',
                'We fetch the endpoints and look for a verification file or DNS record you control. If neither is practical, we ask for another proof rather than guessing.',
              ],
              [
                'Size and activation',
                'We confirm the endpoint count and interval. Nothing is charged; monitoring starts once the account is activated by hand.',
              ],
              [
                'Activation',
                'We add the targets, send the status page address and post a test alert to your webhook. Future changes go through the same manual process during the preview.',
              ],
            ].map(([title, detail], index) => (
              <li
                key={title}
                className="grid grid-cols-[36px_1fr] gap-4 border-b border-border py-5"
              >
                <span className="mono text-[11px] tracking-[0.06em] text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block text-[15.5px] font-medium">{title}</span>
                  <span className="mt-1 block max-w-xl text-[13.5px] leading-6 text-muted">
                    {detail}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
