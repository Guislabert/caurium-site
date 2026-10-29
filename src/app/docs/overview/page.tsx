import type { Metadata } from 'next';
import Link from 'next/link';
import { Callout } from '@/components/Callout';
import { DocsShell } from '@/components/DocsShell';
import { PRODUCTS, STAGE_LABELS } from '@/content/products';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'System overview',
  description:
    'Caurium system concepts: the four modules, how the public site, Probe and management access are separated, what is available today and what is not.',
  path: '/docs/overview/',
  ogImage: '/og/docs.png',
  ogAlt: 'Caurium system overview documentation.',
});

export default function OverviewPage() {
  return (
    <DocsShell
      current="/docs/overview/"
      title="System overview"
      description="A map of the four modules, the domains they live in, and the parts of the system that are deliberately outside the public website."
      toc={[
        { id: 'purpose', label: 'Purpose' },
        { id: 'modules', label: 'The four modules' },
        { id: 'domains', label: 'Service domains' },
        { id: 'relation', label: 'How modules relate' },
        { id: 'availability', label: 'Current availability' },
        { id: 'terminology', label: 'Terminology' },
        { id: 'not-covered', label: 'Out of scope' },
      ]}
    >
      <h2 id="purpose">Purpose</h2>
      <p>
        Caurium is being built as a set of narrow infrastructure modules rather than one large
        platform. Each module has a single job, a documented boundary and its own acceptance
        criteria. The public website explains those decisions; it does not expose the systems behind
        them.
      </p>
      <p>
        This is a deliberate business constraint as well as an engineering one. A module becomes
        visible only when its scope can be described, tested and operated. Until then, the page says
        so.
      </p>

      <h2 id="modules">The four modules</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Module</th>
              <th scope="col">Job</th>
              <th scope="col">Stage</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((product) => (
              <tr key={product.id}>
                <th scope="row">
                  <Link href={`/products/${product.slug}/`}>{product.name}</Link>
                </th>
                <td>{product.title}</td>
                <td>{STAGE_LABELS[product.stage]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="domains">Service domains</h2>
      <p>
        The architecture separates four kinds of responsibility. They may share a brand and some DNS
        management, but they do not share runtime credentials or default network access.
      </p>
      <ul>
        <li>
          <strong>Public website domain.</strong> The static site on Cloudflare Workers Static Assets: brand,
          roadmap, documentation, legal pages and a status view. No login, no console and no
          management API.
        </li>
        <li>
          <strong>Product domain (planned).</strong> Gate, Probe and other callable services, each
          with its own credentials, limits and failure handling.
        </li>
        <li>
          <strong>Management domain (planned).</strong> A separate application with independent
          identity, sessions and permissions. It is not reachable from the public site.
        </li>
        <li>
          <strong>Separately operated services.</strong> These are outside the public architecture.
          The site does not describe their topology, publish their addresses or hold their
          credentials.
        </li>
      </ul>

      <Callout title="The public site has no path into management." tone="note">
        Publishing this page does not create a management route, a database connection or a
        credential. The website build does not require any product or management secret.
      </Callout>

      <h2 id="relation">How the modules relate</h2>
      <p>
        The intended workflow is Connect, Observe, Operate. Gate handles scoped access to an
        allow-listed upstream. Probe checks endpoints the operator owns or is authorized to monitor
        and publishes sanitized state. Guard keeps backups, recovery procedures and access records
        repeatable. Box provides invitation-only development instances for known users.
      </p>
      <p>
        These are separate modules, not stages of one pipeline. A failure or release in one module
        does not change the stage of another.
      </p>

      <h2 id="availability">Current availability</h2>
      <p>
        Probe is in <strong>private preview</strong>. Accounts are reviewed and activated by hand,
        paid monthly, and get a live status page and JSON feed. There is no self-serve console or
        public API key issuance. Gate and Guard are <strong>in development</strong>; Box is <strong>Planned</strong> and are not for
        sale. The Caurium site-wide monitoring feed is not connected, so that page says so instead
        of showing a green state.
      </p>
      <p>
        Read the <Link href="/docs/product-stages/">stage dictionary</Link> for the exact meaning of
        each label and the evidence required to change it.
      </p>

      <h2 id="terminology">Terminology</h2>
      <ul>
        <li><strong>Module.</strong> One of Gate, Probe, Guard or Box.</li>
        <li><strong>Stage.</strong> A lifecycle label backed by evidence, not a marketing tier.</li>
        <li><strong>Health.</strong> A runtime state such as Operational or Unknown, separate from the lifecycle stage.</li>
        <li><strong>Sanitized status.</strong> A public record with an alias, state, check time and latency only — no origin URL or raw error.</li>
        <li><strong>Allow-listed upstream.</strong> A specific API destination the operator has authorized Gate to reach.</li>
      </ul>

      <h2 id="not-covered">What this overview does not cover</h2>
      <p>
        It does not provide setup instructions, endpoint addresses, credentials or a deployment guide
        for a product that is not available. Those belong to the product’s own documentation after
        its release criteria are met.
      </p>
    </DocsShell>
  );
}
