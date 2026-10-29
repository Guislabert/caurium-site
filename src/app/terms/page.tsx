import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalShell } from '@/components/LegalShell';
import { CONTACT } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms',
  description:
    'Terms for the Caurium website and the free Probe private preview: service scope, the planned prices, acceptable use, data and liability.',
  path: '/terms/',
  ogImage: '/og/legal.png',
  ogAlt: 'Caurium website and Probe service terms.',
});

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms"
      description="These terms cover the Caurium website and the Probe private preview. Gate, Guard and Box are planned and are not offered. Paid activation is not open until the operating entity, governing law and a support channel are published."
      toc={[
        { id: 'scope', label: 'Scope' },
        { id: 'service', label: 'The Probe service' },
        { id: 'accounts', label: 'Accounts and activation' },
        { id: 'fees', label: 'Fees and cancellation' },
        { id: 'use', label: 'Acceptable use' },
        { id: 'data', label: 'Data and public status' },
        { id: 'availability', label: 'Preview availability' },
        { id: 'liability', label: 'Liability' },
        { id: 'ip', label: 'Intellectual property' },
        { id: 'identity', label: 'Identity and law' },
        { id: 'changes', label: 'Changes' },
      ]}
    >
      <h2 id="scope">Scope</h2>
      <p>
        These terms apply to this website and to Probe, the only Caurium product currently offered,
        in private preview. Gate, Guard and Box are described for planning only. Nothing on their
        pages is an offer, a commitment to deliver, or a statement that they are available.
      </p>
      <p>
        By submitting an application you confirm that the information is accurate and that you are
        authorized to act for the organization you name.
      </p>

      <h2 id="service">The Probe service</h2>
      <p>Probe performs scheduled HTTP requests against a fixed list of endpoints and records:</p>
      <ul>
        <li>the HTTP status code returned and the time taken to receive it;</li>
        <li>the time of the check and a short error class when the request fails;</li>
        <li>whether the last three checks failed consecutively.</li>
      </ul>
      <p>
        Probe does not read or store response bodies. It does not check TLS certificate expiry,
        page content, application traces, logs or metrics. A successful HTTP status is not proof
        that an application works correctly.
      </p>
      <p>
        You choose the expected status for each endpoint. Probe compares the actual status with
        that value. You are responsible for choosing targets and expectations that reflect what you
        actually need to know.
      </p>

      <h2 id="accounts">Accounts and activation</h2>
      <ul>
        <li>There is no self-serve signup, console or automatic activation.</li>
        <li>
          We confirm that you own or are authorized to monitor each endpoint before adding it. We
          may ask for a verification file, DNS record or another reasonable proof.
        </li>
        <li>We may refuse an application, or remove a target, if ownership cannot be shown.</li>
        <li>
          One webhook and one public status page are configured per account during the private
          preview. Changes are made by hand.
        </li>
        <li>
          The public status page address is not a secret. Treat its state as public information.
        </li>
      </ul>

      <h2 id="fees">Fees and cancellation</h2>
      <ul>
        <li>
          <strong>The private preview is free.</strong> No payment is requested, no card is taken
          and no invoice is issued.
        </li>
        <li>
          The figures on the pricing page — €19, €49 or €99 per month — are the planned prices. They
          are not a charge in force. Paid activation will open only after the operating entity,
          governing law and a billing contact are published.
        </li>
        <li>
          When paid activation opens, plans are monthly and in advance, exclusive of VAT where
          applicable, and no plan renews automatically: a payment request is issued before each
          month. Existing accounts will be told before anything is charged.
        </li>
        <li>
          You may stop using the service at any time by emailing the support address. Because
          nothing is charged during the preview, cancelling costs nothing.
        </li>
        <li>
          If an account exceeds its plan limits, it is not charged for the excess. We raise it and
          you choose whether to move up or remove targets.
        </li>
      </ul>

      <h2 id="use">Acceptable use</h2>
      <p>You must not use Probe to:</p>
      <ul>
        <li>monitor endpoints you do not own or have written authorization to test;</li>
        <li>scan, probe or load-test third-party systems, or search for vulnerabilities;</li>
        <li>send requests that are unlawful, abusive or intended to disrupt a target;</li>
        <li>evade plan limits, ownership checks or the private-network boundary;</li>
        <li>resell access without a separate written agreement.</li>
      </ul>
      <p>
        Probe rejects localhost, private IPv4 literals, cloud metadata hosts, .local and .internal
        names, and re-validates every redirect hop. Attempting to reach a private network through
        redirects, DNS or another technique is a breach of these terms and may lead to suspension.
      </p>

      <h2 id="data">Data and public status</h2>
      <p>
        The public status page and JSON feed expose the component alias, state, check time and
        latency. They do not expose the target URL, origin address or raw error. Anyone with the
        page address can read that information.
      </p>
      <p>
        Check history is kept for 7, 30 or 90 days depending on the plan. Application details are
        described in the <Link href="/privacy/">privacy notice</Link>.
      </p>

      <h2 id="availability">Preview availability</h2>
      <ul>
        <li>Probe is a private preview, not a stable production service.</li>
        <li>
          No SLA, uptime percentage, response-time guarantee or recovery-time commitment applies.
        </li>
        <li>
          We may change limits, the status contract or the check schedule, or suspend the service
          for maintenance. Material changes are recorded in the build log.
        </li>
        <li>
          A component marked Unknown means data is missing or stale. It never means the endpoint is
          healthy.
        </li>
        <li>
          Alerts are best-effort. Webhook delivery can fail, be delayed or be blocked by the
          receiving service. Do not rely on Probe as the only safeguard for a critical system.
        </li>
      </ul>

      <h2 id="liability">Liability</h2>
      <p>
        To the extent permitted by applicable law, Probe is provided “as is” and without warranties
        beyond those that cannot be excluded. We are not liable for indirect or consequential loss,
        lost profits, lost data or business interruption arising from missed, delayed or incorrect
        checks or alerts.
      </p>
      <p>
        Where liability cannot be excluded, it is limited to the fees paid for Probe in the month in
        which the event occurred. Nothing in these terms limits liability that cannot lawfully be
        limited.
      </p>

      <h2 id="ip">Intellectual property</h2>
      <p>
        The Caurium name, wordmark, original diagrams, site copy and Probe implementation are part
        of this project. Third-party names remain the property of their owners and are used only for
        identification where applicable. No third-party logo, customer mark or proprietary
        illustration is reproduced on this site.
      </p>

      <h2 id="identity">Identity and law</h2>
      <p>
        Caurium is the name this project publishes under. It is not a registered company name. The
        operator’s legal name, registered address and governing law are not published yet, and they
        must be published before paid activation opens. Until then no payment is requested or
        accepted, and these terms describe a free preview rather than a contract of sale.
      </p>
      <p>
        Questions about these terms go to{' '}
        <a href={`mailto:${CONTACT.support}`} className="underline decoration-border-strong">
          {CONTACT.support}
        </a>
        . Security reports go to{' '}
        <a href={`mailto:${CONTACT.security}`} className="underline decoration-border-strong">
          {CONTACT.security}
        </a>
        .
      </p>

      <h2 id="changes">Changes</h2>
      <p>
        These terms may change as the service or the operator details are finalised. Material
        changes are recorded in the build log and apply from the next monthly period. If a change
        is not acceptable, you may cancel before the next payment.
      </p>

      <p>
        See also <Link href="/privacy/">Privacy</Link>,{' '}
        <Link href="/products/probe/">Probe boundaries</Link> and{' '}
        <Link href="/trust/">Trust &amp; claims</Link>.
      </p>
    </LegalShell>
  );
}
