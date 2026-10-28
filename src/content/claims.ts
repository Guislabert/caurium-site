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
    claim: 'Caurium is building four modules: Gate, Probe, Guard and Box.',
    page: 'Products',
    href: '/products/',
    stage: 'fact',
    evidence: 'Four product records in src/content/products.ts.',
  },
  {
    claim: 'All four modules are Planned.',
    page: 'Product stages',
    href: '/docs/product-stages/',
    stage: 'fact',
    evidence: 'Stage dictionary; no deployment or promotion record exists.',
  },
  {
    claim: 'No account, console, API key, payment flow or contact form exists.',
    page: 'Architecture',
    href: '/architecture/',
    stage: 'fact',
    evidence: 'Static export; no authentication, payment or form code in the build.',
  },
  {
    claim: 'The public site is a static export on Cloudflare Workers Static Assets.',
    page: 'Architecture',
    href: '/architecture/',
    stage: 'fact',
    evidence: 'wrangler.jsonc serves ./out as static assets.',
  },
  {
    claim: 'The site sets no first-party analytics, advertising cookies or tracking.',
    page: 'Privacy',
    href: '/privacy/',
    stage: 'fact',
    evidence: 'No analytics or advertising script is included in the build.',
  },
  {
    claim: 'Monitoring is not connected and the status page reports Unknown.',
    page: 'Status',
    href: '/status/',
    stage: 'fact',
    evidence: 'NEXT_PUBLIC_STATUS_URL is unset; the status validator defaults to Unknown.',
  },
  {
    claim: 'Gate forwards only to one allow-listed upstream.',
    page: 'Gate',
    href: '/products/gate/',
    stage: 'planned',
    evidence: 'Design and release criteria. No deployment exists.',
  },
  {
    claim: 'Probe checks only authorized endpoints and blocks private network ranges.',
    page: 'Probe',
    href: '/products/probe/',
    stage: 'planned',
    evidence: 'Design and release criteria. No probe is running.',
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
    claim: 'No region, price, SLA or certification is published.',
    page: 'Trust & claims',
    href: '/trust/',
    stage: 'fact',
    evidence: 'No measured deployment, price list, support commitment or audit report exists.',
  },
  {
    claim: 'No customers, logos or testimonials are published.',
    page: 'Trust & claims',
    href: '/trust/',
    stage: 'fact',
    evidence: 'No customer consent or verifiable reference is held.',
  },
  {
    claim: 'Product examples are proposed contracts, not callable endpoints.',
    page: 'Product pages',
    href: '/products/gate/',
    stage: 'intent',
    evidence: 'Every example carries a proposed/illustrative note; no endpoint exists.',
  },
  {
    claim: 'Public status would be published only from sanitized checks.',
    page: 'Status',
    href: '/status/',
    stage: 'intent',
    evidence: 'Status schema and validation rules. No feed is connected.',
  },
  {
    claim: 'No public security reporting channel exists yet.',
    page: 'Trust & claims',
    href: '/trust/',
    stage: 'gap',
    evidence: 'Recorded as a production blocker. No verified mailbox or intake process.',
  },
  {
    claim: 'The legal entity and governing law are not published.',
    page: 'Terms',
    href: '/terms/',
    stage: 'gap',
    evidence: 'Recorded as a production blocker. No entity is named.',
  },
];
