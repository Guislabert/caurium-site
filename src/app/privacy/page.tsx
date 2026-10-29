import type { Metadata } from 'next';
import Link from 'next/link';
import { Callout } from '@/components/Callout';
import { LegalShell } from '@/components/LegalShell';
import { CONTACT } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy',
  description:
    'How Caurium handles application details, Probe account data and check metadata. No analytics, advertising cookies or tracking.',
  path: '/privacy/',
  ogImage: '/og/legal.png',
  ogAlt: 'Caurium privacy notice.',
});

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy"
      description="This notice covers the Caurium website and the Probe private preview. It describes the application form, account records, check metadata and public status pages. It does not describe Gate, Guard or Box, which are not offered."
      toc={[
        { id: 'controller', label: 'Who is responsible' },
        { id: 'collected', label: 'What is collected' },
        { id: 'why', label: 'Why, and on what basis' },
        { id: 'public', label: 'Public status data' },
        { id: 'processors', label: 'Processors' },
        { id: 'retention', label: 'Retention' },
        { id: 'cookies', label: 'Cookies and tracking' },
        { id: 'rights', label: 'Your rights' },
        { id: 'security', label: 'Security' },
        { id: 'changes', label: 'Changes' },
      ]}
    >
      <h2 id="controller">Who is responsible</h2>
      <p>
        Caurium is the name this project publishes under. It is not a registered company name, and
        no legal entity, registered address or governing law is published yet. Because of that,
        nothing on this site is sold: the private preview is free and no payment is requested.
      </p>
      <p>
        For any question about this notice or your data, write to{' '}
        <a href={`mailto:${CONTACT.privacy}`} className="underline decoration-border-strong">
          {CONTACT.privacy}
        </a>
        . Include “Privacy request” in the subject and do not send credentials or endpoint details
        you would not publish.
      </p>

      <h2 id="collected">What is collected</h2>
      <p>When you submit the application form, the Probe service stores:</p>
      <ul>
        <li>your name, email address and optional company or project name;</li>
        <li>the plan you selected, the endpoint URLs and aliases you send, and your message;</li>
        <li>the time the application was received and its internal status.</li>
      </ul>
      <p>For an activated account, Probe also stores:</p>
      <ul>
        <li>the account name, contact email, plan, status and webhook URL;</li>
        <li>the target URL, public alias, expected status, interval and timeout;</li>
        <li>check records: time, success flag, HTTP status, latency and a short error class;</li>
        <li>incident records: open time, close time and the last error class.</li>
      </ul>
      <p>
        Response bodies, response headers, API keys and passwords are not collected. Do not put
        credentials or sensitive material in the application form.
      </p>
      <p>
        Cloudflare, as the hosting provider, processes technical request data such as IP address,
        user agent, requested URL and timestamp to deliver the site and protect it from abuse. That
        processing is governed by Cloudflare’s own terms and privacy documentation.
      </p>

      <h2 id="why">Why, and on what basis</h2>
      <ul>
        <li>
          <strong>To review an application and reply:</strong> steps taken at your request before a
          contract, and our legitimate interest in operating the intake process.
        </li>
        <li>
          <strong>To provide a Probe account:</strong> performance of the service contract,
          including checks, incidents, status pages and alerts.
        </li>
        <li>
          <strong>To prevent abuse and secure the service:</strong> our legitimate interest in
          rejecting unauthorized targets, limiting access and investigating misuse.
        </li>
        <li>
          <strong>To meet legal obligations:</strong> invoices, tax records and responses to lawful
          requests, where applicable.
        </li>
      </ul>
      <p>We do not sell personal data or use it for advertising.</p>

      <h2 id="public">Public status data</h2>
      <p>
        A Probe status page is public to anyone who has its address. It shows the component alias,
        state, check time and latency. It does not show the target URL, origin address, customer
        email or raw error. Choose an alias that is safe to publish.
      </p>
      <p>
        The JSON feed exposes the same fields as the HTML page. Search engines are asked not to
        index customer status pages, but the address itself is not a secret and should be treated
        as public.
      </p>

      <h2 id="processors">Processors and recipients</h2>
      <ul>
        <li>
          <strong>Cloudflare</strong> hosts the website, the Probe Worker, the D1 database and
          operational logs. Data is processed in Cloudflare’s network, including the region where
          the D1 database is provisioned.
        </li>
        <li>
          <strong>Stripe</strong> will process payment details if and when paid activation opens.
          Card details are never entered on this site or stored by Probe.
        </li>
        <li>
          <strong>Email delivery</strong> is handled by the operator’s mail provider when replying
          to an application. The provider is not published yet.
        </li>
        <li>
          <strong>Webhook delivery</strong> sends incident messages to the HTTPS endpoint you
          configure. That endpoint may be operated by a third party such as Slack, and its own
          privacy terms apply.
        </li>
      </ul>
      <p>
        These providers may process data outside your country. Where required, transfers rely on
        the providers’ contractual safeguards.
      </p>

      <h2 id="retention">Retention</h2>
      <ul>
        <li>Applications that do not become accounts are deleted after 12 months.</li>
        <li>
          Check history is kept for 7, 30 or 90 days depending on the plan, then deleted by a daily
          job.
        </li>
        <li>
          Account details, targets, incidents and webhook settings are kept while the account is
          active. After cancellation they are deleted within 90 days unless a legal obligation
          requires longer retention.
        </li>
        <li>Hosting logs are retained according to the Cloudflare configuration.</li>
      </ul>

      <h2 id="cookies">Cookies and tracking</h2>
      <p>
        The site sets no first-party analytics, advertising or personalization cookies, and includes
        no advertising pixels or cross-site tracking. The application form does not use cookies to
        remember what you typed.
      </p>

      <h2 id="rights">Your rights</h2>
      <p>
        Depending on your jurisdiction, you may request access to your personal data, correction,
        deletion, restriction, portability or objection to processing. You may also withdraw
        consent where processing relies on it, without affecting processing that already took place.
      </p>
      <p>
        Write to the privacy address above. You also have the right to complain to a data
        protection authority in your country. The operator’s legal identity will be published
        before anything is charged.
      </p>
      <Callout title="What is still missing, and why it is safe to use the site" tone="warning">
        A published privacy address exists, but the legal identity of the operator does not. That is
        why no payment is accepted. Do not send identity documents, credentials or other sensitive
        personal data through any public channel — including email.
      </Callout>

      <h2 id="security">Security</h2>
      <p>
        Access to the Probe database and administration endpoints requires a secret held by the
        operator. Public status output is limited to the fields described above. Targets are
        restricted to public HTTP endpoints, and private hosts and unsafe redirects are rejected.
      </p>

      <h2 id="changes">Changes</h2>
      <p>
        Material changes will update the date above and be recorded in the build log. Because there
        is no newsletter, the page itself is the notice.
      </p>

      <p>
        See also <Link href="/terms/">Terms</Link>,{' '}
        <Link href="/products/probe/">Probe boundaries</Link> and{' '}
        <Link href="/trust/">Trust &amp; claims</Link>.
      </p>
    </LegalShell>
  );
}
