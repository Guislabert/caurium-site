import type { Metadata } from 'next';
import Link from 'next/link';
import { Callout } from '@/components/Callout';
import { LegalShell } from '@/components/LegalShell';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy',
  description: 'How the Caurium public website handles data. No accounts, forms, first-party cookies or tracking.',
  path: '/privacy/',
  ogImage: '/og/docs.png',
  ogAlt: 'Caurium privacy notice.',
});

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy"
      description="This notice describes the public Caurium website. It does not describe a product that has not launched: Gate, Probe, Guard and Box are Planned, and no account, API key or customer data can be created through this site."
      toc={[
        { id: 'not-done', label: 'What this site does not do' },
        { id: 'hosting', label: 'Hosting data' },
        { id: 'stored', label: 'What is stored' },
        { id: 'products', label: 'Future products' },
        { id: 'rights', label: 'Contact and rights' },
        { id: 'changes', label: 'Changes' },
      ]}
    >
      <h2 id="not-done">What this site does not do</h2>
      <ul>
        <li>No account registration, login or user profile.</li>
        <li>No contact form, newsletter signup or file upload.</li>
        <li>No first-party analytics, advertising pixels or cross-site tracking.</li>
        <li>No first-party cookies for analytics, advertising or personalization.</li>
        <li>No payment processing, because no paid service is offered.</li>
      </ul>

      <h2 id="hosting">Technical data processed by hosting</h2>
      <p>
        The site is served by Cloudflare Pages. Like any web host, Cloudflare may process technical
        request data such as the IP address, user agent, requested URL, referrer, timestamp and
        approximate country to deliver the site, protect it from abuse and produce aggregate
        operational logs.
      </p>
      <p>
        That processing is governed by Cloudflare’s own terms and privacy documentation and by the
        configuration of the Cloudflare account. Caurium does not combine those logs with other
        sources, build advertising profiles or sell them. Retention is controlled by the hosting
        configuration rather than by a first-party database.
      </p>

      <h2 id="stored">What is stored by Caurium</h2>
      <p>
        The public site has no application database. Build and deployment metadata exists in the
        hosting and source-control providers used to publish the site. It is used to operate and
        roll back deployments, not to profile visitors.
      </p>

      <h2 id="products">Future products</h2>
      <p>
        If a product begins collecting account, billing or usage data, this page will be replaced
        before that collection starts, with the actual categories, purposes, retention and deletion
        method. A planned product must not inherit this page’s description.
      </p>

      <h2 id="rights">Contact and rights</h2>
      <Callout title="No contact channel is published yet." tone="warning">
        The operating entity and a working privacy contact will be published before the site
        accepts personal data through a form or account. Until then, do not send personal or
        sensitive data through any public channel.
      </Callout>

      <h2 id="changes">Changes</h2>
      <p>
        Material changes will update the date above. Because there are no accounts, there is no
        email list to notify; the page itself is the notice.
      </p>

      <p>
        See also <Link href="/terms/">Terms</Link> and <Link href="/docs/security/">Security boundaries</Link>.
      </p>
    </LegalShell>
  );
}
