export type ClaimStage = 'fact' | 'planned' | 'intent' | 'gap';

export interface ClaimRecord {
  claim: string;
  page: string;
  href: string;
  stage: ClaimStage;
  evidence: string;
}

export const CLAIM_STAGE_LABELS: Record<ClaimStage, string> = {
  fact: 'Fact',
  planned: 'Planned',
  intent: 'Intended design',
  gap: 'Known gap',
};

export const CLAIMS: ClaimRecord[] = [
  {
    claim: 'Caurium has four modules: Gate, Probe, Guard and Box.',
    page: 'Products',
    href: '/products/',
    stage: 'fact',
    evidence: 'Four product records in src/content/products.ts.',
  },
  {
    claim: 'Probe is in private preview; Gate and Guard are in development; Box is planned.',
    page: 'Product stages',
    href: '/docs/product-stages/',
    stage: 'fact',
    evidence:
      'Probe worker deployed on 28 Oct 2026; the other three have no deployment and are not for sale.',
  },
  {
    claim: 'Probe runs as a Cloudflare Worker with a D1 database and a one-minute scheduler.',
    page: 'Probe',
    href: '/products/probe/',
    stage: 'fact',
    evidence:
      'wrangler.jsonc, schema.sql and the deployed worker at caurium-probe.caurium.workers.dev.',
  },
  {
    claim: 'Probe checks only owner-authorized endpoints and rejects private hosts.',
    page: 'Probe',
    href: '/products/probe/',
    stage: 'fact',
    evidence:
      'Target validation rejects localhost, private IPv4 literals, metadata hosts, .local and .internal; every redirect hop is re-validated. Accounts are reviewed by hand.',
  },
  {
    claim: 'Three consecutive failures open one incident; the first success closes it.',
    page: 'Probe',
    href: '/products/probe/',
    stage: 'fact',
    evidence: 'Incident logic and smoke test recorded in the Probe repository; duplicate alerts are suppressed.',
  },
  {
    claim: 'Probe publishes a sanitized HTML status page and JSON feed per account.',
    page: 'Probe',
    href: '/products/probe/',
    stage: 'fact',
    evidence: 'GET /status/:slug and GET /api/status/:slug return alias, state, check time and latency only.',
  },
  {
    claim: 'Probe runs as a free private preview, opened by application. No price is charged.',
    page: 'Access',
    href: '/access/',
    stage: 'fact',
    evidence: 'Plan limits are enforced during manual activation; nothing is charged during the preview.',
  },
  {
    claim: 'Probe has no self-serve signup, console or automatic activation.',
    page: 'Access',
    href: '/access/',
    stage: 'fact',
    evidence: 'Activation is a manual checklist; there is no account UI or public API key issuance.',
  },
  {
    claim: 'Probe alerts one HTTPS webhook per account. Email and SMS are not supported.',
    page: 'Probe',
    href: '/products/probe/',
    stage: 'fact',
    evidence: 'customers.alert_webhook is a single field; the worker posts incident and recovery messages only.',
  },
  {
    claim: 'TLS certificate expiry is not checked yet.',
    page: 'Probe',
    href: '/products/probe/',
    stage: 'planned',
    evidence: 'Feature is marked planned. The worker reads HTTP status and latency only.',
  },
  {
    claim: 'The public site is a static export on Cloudflare Workers Static Assets.',
    page: 'Architecture',
    href: '/architecture/',
    stage: 'fact',
    evidence: 'wrangler.jsonc serves ./dist as static assets.',
  },
  {
    claim: 'The site sets no first-party analytics, advertising cookies or tracking.',
    page: 'Privacy',
    href: '/privacy/',
    stage: 'fact',
    evidence: 'No analytics or advertising script is included in the build.',
  },
  {
    claim: 'The site-wide Caurium status feed is not connected.',
    page: 'Status',
    href: '/status/',
    stage: 'fact',
    evidence: 'PUBLIC_STATUS_URL is unset; the status validator defaults to Unknown.',
  },
  {
    claim: 'No customer, logo or testimonial is published.',
    page: 'Trust & claims',
    href: '/trust/',
    stage: 'fact',
    evidence: 'No customer consent or verifiable reference is held.',
  },
  {
    claim: 'No uptime percentage, SLA or certification is published.',
    page: 'Trust & claims',
    href: '/trust/',
    stage: 'fact',
    evidence: 'No measured history, support commitment or audit report exists.',
  },
  {
    claim: 'Gate forwards only to one allow-listed upstream.',
    page: 'Gate',
    href: '/products/gate/',
    stage: 'planned',
    evidence: 'Design and release criteria. No deployment exists.',
  },
  {
    claim: 'Guard recovery is claimed only after a restore is tested and recorded.',
    page: 'Guard',
    href: '/products/guard/',
    stage: 'planned',
    evidence: 'Design and release criteria. No restore has been run.',
  },
  {
    claim: 'Box environments are container-based and share a kernel.',
    page: 'Box',
    href: '/products/box/',
    stage: 'planned',
    evidence: 'Isolation boundary. No Box instance exists.',
  },
  {
    claim: 'The legal entity and governing law are not published.',
    page: 'Terms',
    href: '/terms/',
    stage: 'gap',
    evidence: 'Recorded as a production blocker. No entity is named.',
  },
  {
    claim: 'No public security reporting channel exists yet.',
    page: 'Trust & claims',
    href: '/trust/',
    stage: 'gap',
    evidence: 'Recorded as a production blocker. No verified mailbox or intake process.',
  },
  {
    claim: 'No dedicated support mailbox is published yet.',
    page: 'Trust & claims',
    href: '/trust/',
    stage: 'gap',
    evidence: 'Applications are answered by email; the support, security and privacy addresses are published in the footer.',
  },
];
