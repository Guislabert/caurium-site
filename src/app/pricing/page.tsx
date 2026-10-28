import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { PLANS, PLAN_FAQ, PLAN_INCLUDES, PLAN_INTERVAL_LABEL } from '@/content/plans';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Probe pricing',
  description:
    'Probe is €19, €49 or €99 per month. HTTP checks, three-failure incidents, webhook alerts and a sanitized status page. Private preview with manual activation.',
  path: '/pricing/',
  ogImage: '/og/home.png',
  ogAlt: 'Caurium Probe pricing — €19, €49 and €99 per month.',
});

const STEPS = [
  {
    step: '01',
    title: 'Send the endpoints you own',
    detail:
      'Use the application form. Include the URLs, the aliases you want on the status page and the plan you are considering.',
  },
  {
    step: '02',
    title: 'We confirm ownership and send a payment link',
    detail:
      'We check that you control the endpoints, agree the interval and send a Stripe payment link. No card details are entered on this site.',
  },
  {
    step: '03',
    title: 'Monitoring starts after payment',
    detail:
      'We create the account, add the targets and send the status page address and webhook test. Changes are made by hand during the preview.',
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Pricing' }]}
        eyebrow="Pricing"
        title="One product, three monthly plans."
        description={
          <>
            Probe is the first Caurium product in private preview. Prices are monthly and include
            manual activation. Gate, Guard and Box are planned and are not for sale.
          </>
        }
        meta={
          <>
            <span className="badge-stage" data-stage="private-preview">
              <span className="badge-dot" aria-hidden="true" />
              Private preview
            </span>
            <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
              Manual activation · No SLA
            </span>
          </>
        }
      />

      <section className="section border-b border-border" aria-labelledby="plans-heading">
        <div className="container-page">
          <SectionHeading
            index="01 / Plans"
            id="plans-heading"
            title="Pay for endpoints and history, nothing else."
            intro="Every plan includes the same checks, incident rule, webhook and status page. The differences are how many endpoints you can add, how often they are checked and how long check history is kept."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-[18px] border p-6 md:p-7 ${
                  plan.recommended
                    ? 'border-ink bg-paper shadow-[0_18px_48px_-32px_rgba(11,27,63,0.45)]'
                    : 'border-border bg-paper/60'
                }`}
              >
                {plan.recommended ? (
                  <span className="mono absolute right-5 top-5 rounded-full bg-ink px-2.5 py-1 text-[8.5px] uppercase tracking-[0.12em] text-paper">
                    Most common
                  </span>
                ) : null}

                <p className="mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  Probe · {plan.name}
                </p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-[46px] font-medium leading-none tracking-[-0.04em]">
                    €{plan.price}
                  </span>
                  <span className="text-[12px] text-muted">{plan.cadence}</span>
                </div>
                <p className="mt-3 text-[15px] font-medium leading-6">{plan.summary}</p>
                <p className="mt-2 text-[13px] leading-6 text-muted">{plan.detail}</p>

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
                      <dt className="text-[12.5px] text-muted">{label}</dt>
                      <dd className="text-right text-[12.5px] font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex-1" />
                <Link
                  href={`/start/?plan=${plan.id}`}
                  className={`btn ${plan.recommended ? 'btn-primary' : 'btn-secondary'} w-full`}
                >
                  Apply for {plan.name}
                  <span aria-hidden="true">→</span>
                </Link>
                <p className="mt-3 text-center text-[11px] leading-5 text-muted">
                  Payment link sent after ownership is confirmed.
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-xs leading-5 text-muted">
            Prices are in euro and exclude VAT where applicable. No plan renews automatically: we
            send a payment link each month. No free trial is offered during the private preview.
          </p>
        </div>
      </section>

      <section className="section section-paper border-b border-border" aria-labelledby="included-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="section-index">02 / Included</p>
            <h2 id="included-heading" className="h2 mt-4 max-w-[15ch]">
              The same product on every plan.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              Limits change with the plan. The boundary model does not: Probe checks endpoints you
              own, stores no response bodies and publishes no origin addresses.
            </p>
          </div>

          <ul className="border-t border-border-strong">
            {PLAN_INCLUDES.map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[36px_1fr] gap-4 border-b border-border py-4"
              >
                <span className="mono text-[9px] tracking-[0.1em] text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[13.5px] leading-6 text-ink-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="compare-heading">
        <div className="container-page">
          <SectionHeading
            index="03 / Compare"
            id="compare-heading"
            title="The differences, in one table."
            intro="These are enforced limits, not marketing tiers. There is no enterprise plan and no hidden overage charge."
          />

          <div className="doc-prose mt-10 max-w-none">
            <div className="table-scroll">
              <table className="w-full">
                <thead>
                  <tr>
                    <th scope="col">Limit</th>
                    {PLANS.map((plan) => (
                      <th key={plan.id} scope="col">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Price</th>
                    {PLANS.map((plan) => (
                      <td key={plan.id}>€{plan.price} / month</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Endpoints</th>
                    {PLANS.map((plan) => (
                      <td key={plan.id}>{plan.endpoints}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Shortest interval</th>
                    {PLANS.map((plan) => (
                      <td key={plan.id}>{plan.minIntervalSeconds} seconds</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Check history</th>
                    {PLANS.map((plan) => (
                      <td key={plan.id}>{plan.retentionDays} days</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Webhook endpoints</th>
                    {PLANS.map((plan) => (
                      <td key={plan.id}>1</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Status pages</th>
                    {PLANS.map((plan) => (
                      <td key={plan.id}>1 account page</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-lav border-b border-border" aria-labelledby="steps-heading">
        <div className="container-page">
          <SectionHeading
            index="04 / Activation"
            id="steps-heading"
            title="Manual on purpose."
            intro="During the private preview, every account is reviewed before it is created. That keeps ownership checks and limit changes honest while the product is small."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {STEPS.map((item) => (
              <div key={item.step} className="border-t border-ink pt-5">
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-[11px] text-paper">
                  {item.step}
                </span>
                <h3 className="h3 mt-1">{item.title}</h3>
                <p className="mt-2 max-w-sm text-[13.5px] leading-6 text-ink-2">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/start/" className="btn btn-primary">
              Apply for Probe
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/products/probe/" className="btn btn-secondary">
              Read the Probe boundary
            </Link>
          </div>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="faq-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-20">
          <div>
            <p className="section-index">05 / Questions</p>
            <h2 id="faq-heading" className="h2 mt-4">
              Before you apply.
            </h2>
          </div>
          <dl className="border-t border-border-strong">
            {PLAN_FAQ.map((item) => (
              <div key={item.question} className="border-b border-border py-5">
                <dt className="text-[15px] font-medium leading-6">{item.question}</dt>
                <dd className="mt-2 max-w-2xl text-[13.5px] leading-6 text-muted">
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
            <p className="section-index">06 / Boundary</p>
            <h2 id="boundary-heading" className="h2 mt-4 max-w-[22ch]">
              What the price does not buy.
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
