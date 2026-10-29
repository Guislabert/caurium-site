import type { Metadata } from 'next';
import Link from 'next/link';
import { Callout } from '@/components/Callout';
import { DocsShell } from '@/components/DocsShell';
import {
  PRODUCTS,
  STAGE_CTA_ALLOWED,
  STAGE_DESCRIPTIONS,
  STAGE_LABELS,
  type ProductStage,
} from '@/content/products';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Product stages',
  description:
    'Definitions for Caurium’s product lifecycle stages, current status of each module, and the evidence required to change a stage.',
  path: '/docs/product-stages/',
  ogImage: '/og/docs.png',
  ogAlt: 'Caurium product stages documentation.',
});

const STAGES = Object.keys(STAGE_LABELS) as ProductStage[];

export default function ProductStagesPage() {
  return (
    <DocsShell
      current="/docs/product-stages/"
      title="Product stages"
      description="A stage label is a claim about evidence. This page defines each label, the call to action it permits, and what must be recorded before a module moves forward."
      toc={[
        { id: 'lifecycle', label: 'Lifecycle stages' },
        { id: 'status', label: 'Current status' },
        { id: 'not-health', label: 'Stage is not health' },
        { id: 'change', label: 'How a stage changes' },
        { id: 'strict', label: 'Why the labels are strict' },
        { id: 'conclusion', label: 'Current conclusion' },
      ]}
    >
      <h2 id="lifecycle">Lifecycle stages</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Stage</th>
              <th scope="col">Meaning</th>
              <th scope="col">Permitted CTA</th>
            </tr>
          </thead>
          <tbody>
            {STAGES.map((stage) => (
              <tr key={stage}>
                <th scope="row" className="whitespace-nowrap">{STAGE_LABELS[stage]}</th>
                <td>{STAGE_DESCRIPTIONS[stage]}</td>
                <td>{STAGE_CTA_ALLOWED[stage]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="status">Current product status</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Module</th>
              <th scope="col">Stage</th>
              <th scope="col">Reviewed</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((product) => (
              <tr key={product.id}>
                <th scope="row">
                  <Link href={`/products/${product.slug}/`}>{product.name}</Link>
                </th>
                <td>{STAGE_LABELS[product.stage]}</td>
                <td>
                  <time dateTime={product.reviewedAt}>{product.reviewedAt}</time>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="not-health">Stage is not health</h2>
      <Callout title="Lifecycle and runtime state are separate." tone="note">
        A module can be Available and currently Degraded, or Planned with no health state at all.
        The public status page reports runtime health only when a real, sanitized feed exists.
        Planned modules do not display a green dot.
      </Callout>

      <h2 id="change">How a stage changes</h2>
      <p>
        Every promotion is recorded with the module, version, environment, verification date, the
        checks that ran, their results and the responsible person. The evidence stays internal; the
        public page publishes only the resulting scope.
      </p>
      <ul>
        <li>A feature that ships does not automatically promote the module or its sibling features.</li>
        <li>A passing build is not acceptance evidence.</li>
        <li>A stage cannot move because a target date arrived.</li>
        <li>If evidence is missing, the previous stage remains in place.</li>
      </ul>

      <h2 id="strict">Why the labels are strict</h2>
      <p>
        Infrastructure pages are read by people deciding whether to route real traffic or data
        through a service. An optimistic label creates operational risk even when no price is
        charged. The stricter label is the honest one until external use has been verified.
      </p>
      <p>
        This is also a business decision: the first paid or invited users should arrive after the
        boundary is real, not before. Trust built on an accurate label is cheaper to keep than trust
        repaired after an outage.
      </p>

      <h2 id="conclusion">Current conclusion</h2>
      <p>
        Probe is in <strong>private preview</strong>: manual activation, monthly plans and live
        customer status pages. Gate, Guard and Box are <strong>Planned</strong>. There is no
        self-serve sign-up, console or public API key issuance. The next step is to read the{' '}
        <Link href="/products/probe/">Probe page</Link>, its{' '}
        <Link href="/access/">access</Link>, and the{' '}
        <Link href="/docs/security/">security boundaries</Link>.
      </p>
    </DocsShell>
  );
}
