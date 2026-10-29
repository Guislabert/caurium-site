import type { Metadata } from 'next';
import Link from 'next/link';
import { ArchitectureMap } from '@/components/ArchitectureMap';
import { Callout } from '@/components/Callout';
import { PageHero } from '@/components/PageHero';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Architecture — clear service boundaries',
  description:
    'How the static Caurium website, the deployed Probe service, the three planned modules and a separate management application are kept apart, and why the boundary exists.',
  path: '/architecture/',
  ogImage: '/og/architecture.png',
  ogAlt: 'Caurium architecture — public, product and management domains separated.',
});

const FACTS = [
  { value: '01', label: 'Static public site', detail: 'Cloudflare Workers static assets' },
  { value: '01', label: 'Live product', detail: 'Probe, private preview' },
  { value: '03', label: 'Planned modules', detail: 'Gate, Guard, Box' },
  { value: '01', label: 'Live status path', detail: 'Per-account Probe pages' },
] as const;

const WHY = [
  {
    title: 'The public site cannot reach product credentials.',
    detail:
      'A static build needs no product, management or network secret. Publishing a page does not create a connection to what it describes.',
  },
  {
    title: 'The public status output cannot reveal a target.',
    detail:
      'The status response contains an alias, state, check time and latency only. Origin URLs and raw errors never leave the service. Collection and publication still share one Worker.',
  },
  {
    title: 'A management session is not on the public site.',
    detail:
      'Management is a separate application with its own identity. It is not a hidden path and not protected by an unguessable URL.',
  },
] as const;

const INVARIANTS = [
  {
    title: 'Independent deployment',
    detail:
      'The public website is a static build on Cloudflare Workers Static Assets. Probe is a separate Worker with its own D1 database and secret. Future product APIs and the management panel are separate deployments with their own credentials and failure domains.',
  },
  {
    title: 'Authorized management',
    detail:
      'Management access uses an independent identity and permission boundary. It is not reached from the public site and is not protected by a hidden link.',
  },
  {
    title: 'Sanitized public status',
    detail:
      'Probe status responses contain only an alias, state, check time and latency. Origin URLs, internal hostnames and raw errors are excluded.',
  },
  {
    title: 'No shared runtime credentials',
    detail:
      'The website build needs no product, management or separately operated network credentials. Publishing a page does not create a connection to the systems it describes.',
  },
] as const;

const NOT_SHOWN = [
  'Hostnames, IP addresses, ports or full URLs of internal or separately operated services.',
  'Management hosts, session endpoints or access instructions.',
  'Credentials, tokens, secrets or configuration exports.',
  'A complete internal asset inventory or connection graph.',
] as const;

export default function ArchitecturePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Architecture' }]}
        eyebrow="Architecture"
        title="Designed around clear service boundaries."
        description="The public site explains the system; it does not operate it. Product APIs, management access and public status are separate services with separate credentials and separate failure modes."
        meta={
          <>
            <span className="badge-stage" data-stage="private-preview">
              <span className="badge-dot" aria-hidden="true" />
              Probe live · three planned
            </span>
            <span className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
              Public site · Current
            </span>
          </>
        }
      />

      <section className="section border-b border-border" aria-labelledby="why-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-index">01 / Why it matters</p>
              <h2 id="why-heading" className="h2 mt-4 max-w-[18ch]">
                Three consequences of the separation.
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-5 text-muted">
              These combine deployed boundaries with intended design. They are not claims of a
              completed security certification.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[12px] border border-border bg-border md:grid-cols-3">
            {WHY.map((item, index) => (
              <div key={item.title} className="bg-paper p-6">
                <p className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
                  W.{String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-[15.5px] font-medium leading-6">{item.title}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-border bg-paper" aria-labelledby="diagram-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-index">02 / Diagram</p>
              <h2 id="diagram-heading" className="h2 mt-4">
                Four responsibilities, three visible domains.
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-5 text-muted">
              Separately operated networks are intentionally outside this diagram. They are not
              described, addressed or linked from the public site.
            </p>
          </div>

          <div className="mt-10">
            <ArchitectureMap />
          </div>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="current-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">03 / Current</p>
            <h2 id="current-heading" className="h2 mt-4">
              What exists today.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              The public website is a static export deployed to Cloudflare Workers Static Assets. It contains the
              brand, product roadmap, documentation, legal pages and this architecture page.
            </p>
          </div>

          <div>
            <dl className="grid gap-px overflow-hidden rounded-[10px] border border-border bg-border sm:grid-cols-2">
              {FACTS.map((fact) => (
                <div key={fact.label} className="bg-background p-5">
                  <dt className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mono mt-2 text-3xl leading-none tracking-[-0.03em]">{fact.value}</dd>
                  <dd className="mt-2 text-[12px] leading-5 text-muted">{fact.detail}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 space-y-4 text-[14px] leading-7 text-muted">
              <p>
                There is no login, console, API key, payment flow or contact form. The status page
                reports that monitoring is not connected. No product module is available.
              </p>
              <p>
                Separately operated network services are outside this public architecture. This
                site does not link to them, describe their topology or hold their credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-border bg-paper" aria-labelledby="planned-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">04 / Live and planned</p>
            <h2 id="planned-heading" className="h2 mt-4">
              What runs, and what is designed.
            </h2>
          </div>
          <div className="space-y-6">
            <Callout title="Probe is deployed; Gate, Guard and Box are not." tone="note">
              Probe runs as its own Cloudflare Worker with a D1 database and a one-minute scheduler.
              The management domain and the other product boxes in the diagram are designs.
            </Callout>
            <p className="text-[14px] leading-7 text-muted">
              Probe checks a fixed list of owner-authorized endpoints, opens one incident after
              three consecutive failures, posts to one HTTPS webhook and publishes sanitized state.
              Gate would accept a caller credential, enforce scope and limits, and forward only to
              an allow-listed upstream. Guard would keep backups, recovery procedures and access
              records for Caurium operations. Box would provide invitation-only development
              instances with documented limits.
            </p>
            <p className="text-[14px] leading-7 text-muted">
              Each module has its own release criteria. Passing one criterion does not promote the
              others, and a planned capability is never described as available because a related
              feature shipped.
            </p>
          </div>
        </div>
      </section>

      <section className="section border-b border-border" aria-labelledby="invariants-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-index">05 / Invariants</p>
              <h2 id="invariants-heading" className="h2 mt-4 max-w-[18ch]">
                Separation that can be checked.
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-5 text-muted">
              These are architectural constraints, not claims of completed security certification.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-border bg-border md:grid-cols-2">
            {INVARIANTS.map((item, index) => (
              <div key={item.title} className="bg-background p-6">
                <p className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
                  I.{String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-[15.5px] font-medium">{item.title}</h3>
                <p className="mt-2 max-w-md text-[13.5px] leading-6 text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="not-public-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="section-index">06 / Not public</p>
            <h2 id="not-public-heading" className="h2 mt-4">
              What this page will not show.
            </h2>
          </div>
          <div>
            <ul className="border-t border-border-strong">
              {NOT_SHOWN.map((item, index) => (
                <li key={item} className="grid grid-cols-[36px_1fr] gap-4 border-b border-border py-4">
                  <span className="mono text-[11px] tracking-[0.06em] text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] leading-6 text-ink-2">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-lg text-[13.5px] leading-6 text-muted">
              Public documentation can explain a boundary without exposing what sits behind it. Read
              the <Link href="/docs/security/" className="text-link">security boundaries</Link> for
              the access, credential and logging model.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
