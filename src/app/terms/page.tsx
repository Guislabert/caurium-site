import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalShell } from '@/components/LegalShell';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms',
  description: 'Terms for the Caurium public website. Planned features are not offers or available services.',
  path: '/terms/',
  ogImage: '/og/docs.png',
  ogAlt: 'Caurium website terms.',
});

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms"
      description="These terms apply to the public Caurium website. They do not create a contract for any product. Gate, Probe, Guard and Box are Planned, and no product service is offered through this site."
      toc={[
        { id: 'informational', label: 'Informational use' },
        { id: 'no-service', label: 'No service, no account' },
        { id: 'acceptable-use', label: 'Acceptable use' },
        { id: 'ip', label: 'Intellectual property' },
        { id: 'disclaimer', label: 'Disclaimer' },
        { id: 'identity', label: 'Changes and identity' },
      ]}
    >
      <h2 id="informational">Informational use</h2>
      <p>
        The site describes an intended roadmap. Product pages, diagrams, workflows, example code
        and status text are informational. They are not an offer, a commitment to deliver a
        feature, or a statement that a service is available.
      </p>

      <h2 id="no-service">No service, no account</h2>
      <ul>
        <li>No account, console, API key, subscription or paid plan exists.</li>
        <li>No endpoint shown on this site is callable. Example hosts and keys are placeholders.</li>
        <li>No support or response-time commitment is made.</li>
        <li>No availability, uptime or performance guarantee is made.</li>
      </ul>

      <h2 id="acceptable-use">Acceptable use</h2>
      <p>
        Do not attempt to gain unauthorized access to the site, its hosting, its deployment
        pipeline or any system described here. Do not use the site to distribute malware, conduct
        fraud, or interfere with other users. The site has no public submission channel, so this is
        primarily a boundary statement rather than a content policy for user-generated data.
      </p>

      <h2 id="ip">Intellectual property</h2>
      <p>
        The Caurium name, wordmark, original diagrams and site copy are part of this project.
        Third-party names and links remain the property of their owners and are used only for
        identification where applicable. No third-party logo, customer mark or proprietary
        illustration is reproduced on this site.
      </p>

      <h2 id="disclaimer">Disclaimer</h2>
      <p>
        The site is provided “as is” for information. To the extent permitted by applicable law, no
        warranty is made about completeness, accuracy or fitness for a particular purpose. The
        content may change as the roadmap is reviewed.
      </p>

      <h2 id="identity">Changes and identity</h2>
      <p>
        The roadmap and these terms may change. The contracting entity, governing law and a contact
        channel will be published before any paid service or account-based product is offered.
        Until then, this site is an informational project site.
      </p>

      <p>
        See also <Link href="/privacy/">Privacy</Link> and <Link href="/docs/product-stages/">Product stages</Link>.
      </p>
    </LegalShell>
  );
}
