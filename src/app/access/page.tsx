import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import {
  FREE_NOTICE,
  OFFERED_PLANS,
  PLAN_FAQ,
  PLAN_INCLUDES,
  PLAN_INTERVAL_LABEL,
  PRICING_NOTE,
} from '@/content/plans';
import { CONTACT } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Probe access',
  description:
    'Probe is a free private preview opened by ticket. Send the endpoints you own; every application is reviewed by hand, so intake is limited by operator time. Nothing is charged.',
  path: '/access/',
  ogImage: '/og/access.png',
  ogAlt: 'Caurium Probe access — free private preview, opened by application.',
});

const STEPS = [
  {
    step: '01',
    title: 'Open a ticket',
    detail:
      'Use the application form. Include the URLs you own and the size you need. One ticket is enough; there is no queue number and no account to create first.',
  },
  {
    step: '02',
    title: 'We confirm ownership',
    detail:
      'We check that you control the endpoints. A request can be declined, most often because the endpoints cannot be verified. Because each check is manual, only a few accounts are activated per week.',
  },
  {
    step: '03',
    title: 'Monitoring starts after activation',
    detail:
      'We create the account, add the targets and send the status page address and webhook test. Changes are made by hand during the preview.',
  },
] as const;

export default function AccessPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Access' }]}
        title="Two sizes. Free, by application."
        description={
          <>
            Probe runs as a free private preview. Accounts are reviewed and activated by hand, which
            is the whole reason intake is limited: there is no queue, there is one operator. A size
            sets how many endpoints you can add and how long check history is kept. Nothing is
            charged, and no card is taken anywhere on this site.
          </>
        }
        meta={
          <>
            <span className="badge-stage" data-stage="private-preview">
              <span className="badge-dot" aria-hidden="true" />
              Private preview
            </span>
            <span className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
              {FREE_NOTICE} · No SLA
            </span>
          </>
        }
      />

      <section className="section border-b border-border" aria-labelledby="sizes-heading">
        <div className="container-page">
          <SectionHeading
            id="sizes-heading"
            title="Pick the size that fits the endpoints you have."
            intro="Every size includes the same checks at the same one-minute interval, the incident rule, the webhook and the status page. The differences are how many endpoints you can add and how long check history is kept."
          />

          <div
            className={`mt-12 grid gap-4 lg:gap-5 ${
              OFFERED_PLANS.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
            }`}
          >
            {OFFERED_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-[12px] border p-6 md:p-7 ${
                  plan.recommended
                    ? 'border-ink bg-paper'
                    : 'border-border bg-paper/60'
                }`}
              >
                {plan.recommended ? (
                  <p className="mono absolute right-5 top-5 text-[11px] uppercase tracking-[0.06em] text-olive">
                    Suggested
                  </p>
                ) : null}

                <p className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
                  Probe · {plan.name}
                </p>
                <p className="mt-5 flex items-baseline gap-2">
                  <span className="text-[36px] font-medium leading-none tracking-[-0.03em]">
                    &#8364;{plan.price}
                  </span>
                  <span className="text-[12.5px] font-normal text-muted">per month, later</span>
                </p>
                <p className="mono mt-2 text-[11px] uppercase tracking-[0.06em] text-olive">
                  {FREE_NOTICE}
                </p>
                <p className="mt-3 text-[13px] leading-6 text-muted">
                  Now: up to {plan.endpoints} endpoints, free.
                </p>
                <p className="mt-3 text-[15.5px] font-medium leading-6">{plan.summary}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-muted">{plan.detail}</p>

                <dl className="mt-6 border-t border-border">
                  {[
                    ['Endpoints', String(plan.endpoints)],
                    ['Check interval', PLAN_INTERVAL_LABEL(plan.minIntervalSeconds)],
                    ['Check history', `${plan.retentionDays} days`],
                    ['Webhook', 'One HTTPS endpoint'],
                    ['Status page', 'HTML + JSON'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-4 border-b border-border py-2.5"
                    >
                      <dt className="text-[13px] text-muted">{label}</dt>
                      <dd className="text-right text-[13px] font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex-1" />
                <Link
                  href={`/start/?plan=${plan.id}`}
                  className={`btn ${plan.recommended ? 'btn-primary' : 'btn-secondary'} w-full`}
                >
                  Open a ticket for {plan.name}
                  <span aria-hidden="true">→</span>
                </Link>
                <p className="mt-3 text-center text-[12px] leading-5 text-muted">
                  Reviewed by hand. Nothing is charged.
                </p>
              </div>
            ))}
          </div>

          <p className="note mt-6 text-[13px] leading-5 text-muted">
            {PRICING_NOTE} There is no checkout and no invoice. When paid activation opens it will be
            announced in the build log, and no existing account will be charged without notice.
            Questions about access go to{' '}
            <a href={`mailto:${CONTACT.support}`} className="underline decoration-border-strong">
              {CONTACT.support}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section section-paper border-b border-border" aria-labelledby="included-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <h2 id="included-heading" className="h2 mt-4 max-w-[15ch]">
              The same product on every size.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              Limits change with the size. The boundary model does not: Probe checks endpoints you
              own, stores no response bodies and publishes no origin addresses.
            </p>
          </div>

          <ul className="border-t border-border-strong">
            {PLAN_INCLUDES.map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[36px_1fr] gap-4 border-b border-border py-4"
              >
                <span className="mono text-[11px] tracking-[0.06em] text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[14px] leading-6 text-ink-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="steps-heading">
        <div className="container-page">
          <SectionHeading
            id="steps-heading"
            title="Open a ticket, verify, activate."
            intro="There is no sign-up and no self-service console during the preview. Ownership checks and activation are done by hand, so intake is limited by operator time rather than by demand. That is why a ticket is the only way in — and it is also why most requests are answered in order, not instantly."
          />

          <ol className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {STEPS.map((item) => (
              <li key={item.step} className="rounded-[10px] border border-border bg-paper p-6">
                <p className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
                  {item.step}
                </p>
                <p className="mt-3 text-[15.5px] font-medium">{item.title}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-muted">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="compare-heading">
        <div className="container-page">
          <SectionHeading
            id="compare-heading"
            title="Both sizes side by side."
          />

          <div
            className="table-scroll table-scroll--hint mt-10"
            tabIndex={0}
            role="region"
            aria-label="Plan limits compared"
          >
            <table className="w-full min-w-[620px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border-strong">
                  <th scope="col" className="py-3 pr-4 text-[11px] uppercase tracking-[0.06em] text-muted">
                    Limit
                  </th>
                  {OFFERED_PLANS.map((plan) => (
                    <th key={plan.id} scope="col" className="py-3 pr-4 text-[13.5px] font-medium">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="border-b border-border py-3 pr-4 text-[13px] font-normal text-muted">
                    Now
                  </th>
                  {OFFERED_PLANS.map((plan) => (
                    <td key={plan.id} className="border-b border-border py-3 pr-4 text-[13px]">
                      Free
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="border-b border-border py-3 pr-4 text-[13px] font-normal text-muted">
                    Per month, later
                  </th>
                  {OFFERED_PLANS.map((plan) => (
                    <td key={plan.id} className="border-b border-border py-3 pr-4 text-[13px]">
                      &#8364;{plan.price}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="border-b border-border py-3 pr-4 text-[13px] font-normal text-muted">
                    Endpoints
                  </th>
                  {OFFERED_PLANS.map((plan) => (
                    <td key={plan.id} className="border-b border-border py-3 pr-4 text-[13px]">
                      {plan.endpoints}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="border-b border-border py-3 pr-4 text-[13px] font-normal text-muted">
                    Shortest interval
                  </th>
                  {OFFERED_PLANS.map((plan) => (
                    <td key={plan.id} className="border-b border-border py-3 pr-4 text-[13px]">
                      {plan.minIntervalSeconds} seconds
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="border-b border-border py-3 pr-4 text-[13px] font-normal text-muted">
                    Check history
                  </th>
                  {OFFERED_PLANS.map((plan) => (
                    <td key={plan.id} className="border-b border-border py-3 pr-4 text-[13px]">
                      {plan.retentionDays} days
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="border-b border-border py-3 pr-4 text-[13px] font-normal text-muted">
                    Webhook endpoints
                  </th>
                  {OFFERED_PLANS.map((plan) => (
                    <td key={plan.id} className="border-b border-border py-3 pr-4 text-[13px]">
                      1
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="border-b border-border py-3 pr-4 text-[13px] font-normal text-muted">
                    Status pages
                  </th>
                  {OFFERED_PLANS.map((plan) => (
                    <td key={plan.id} className="border-b border-border py-3 pr-4 text-[13px]">
                      1 account page
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="faq-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <h2 id="faq-heading" className="h2 mt-4 max-w-[14ch]">
              What access does and does not include.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              Short answers. The{' '}
              <Link href="/docs/faq/" className="underline decoration-border-strong">
                documentation FAQ
              </Link>{' '}
              covers the rest.
            </p>
          </div>

          <dl className="border-t border-border-strong">
            {PLAN_FAQ.map((item) => (
              <div key={item.question} className="border-b border-border py-5">
                <dt className="text-[15px] font-medium">{item.question}</dt>
                <dd className="mt-2 max-w-[34rem] text-[14px] leading-6 text-muted">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section-paper" aria-labelledby="boundary-heading">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 id="boundary-heading" className="h2 mt-4 max-w-[22ch]">
              What access does not buy.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              No uptime percentage, no response-time guarantee and no coverage claim. Probe reports
              what it measured, from where it ran, and marks everything else Unknown.
            </p>
          </div>
          <Link href="/trust/" className="link-arrow shrink-0">
            Read trust &amp; claims
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
