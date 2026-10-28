export type ProductStage =
  | 'planned'
  | 'in-development'
  | 'internal'
  | 'private-preview'
  | 'public-beta'
  | 'available';

export type FeatureStage = 'planned' | 'implemented' | 'verified';

export interface ScopeFeature {
  id: string;
  label: string;
  detail: string;
  stage: FeatureStage;
}

export interface Boundary {
  label: string;
  value: string;
}

export interface WorkflowStep {
  title: string;
  detail: string;
}

export interface ProductExample {
  title: string;
  language: string;
  code: string;
  note: string;
}

export interface ProductRecord {
  id: 'gate' | 'probe' | 'guard' | 'box';
  slug: string;
  name: string;
  role: string;
  title: string;
  summary: string;
  stage: ProductStage;
  metaDescription: string;
  audience: string;
  problem: string;
  workflow: WorkflowStep[];
  workflowCaption: string;
  scopeNote: string;
  features: ScopeFeature[];
  releaseCriteria: string[];
  notThis: string[];
  boundaries: Boundary[];
  boundaryTarget: string;
  example: ProductExample;
  nextStep: { label: string; href: string; detail: string };
  cta: { label: string; href: string };
  reviewedAt: string;
}

export const STAGE_LABELS: Record<ProductStage, string> = {
  planned: 'Planned',
  'in-development': 'In development',
  internal: 'Internal use',
  'private-preview': 'Private preview',
  'public-beta': 'Public beta',
  available: 'Available',
};

export const STAGE_DESCRIPTIONS: Record<ProductStage, string> = {
  planned: 'A specification or design exists. Availability has not been verified.',
  'in-development': 'An implementation can be inspected, but it is not available to external users.',
  internal: 'Running internally, with a known scope and evidence.',
  'private-preview': 'Core acceptance passed. Open only to invited users through a real intake process.',
  'public-beta': 'Open intake, limits, support and monitoring are in place.',
  available: 'Stable within the documented scope after a formal release review.',
};

export const STAGE_CTA_ALLOWED: Record<ProductStage, string> = {
  planned: 'View roadmap / Read the plan',
  'in-development': 'Read development notes',
  internal: 'View scope',
  'private-preview': 'Request access, only when a real channel exists',
  'public-beta': 'Get started, only to a real flow',
  available: 'Get started / Open console, only if it exists',
};

const REVIEWED_AT = '2026-10-28';

export const PRODUCTS: ProductRecord[] = [
  {
    id: 'gate',
    slug: 'gate',
    name: 'Gate',
    role: 'Access',
    title: 'Controlled access to the APIs you use.',
    summary:
      'Planned: authenticated API routing with scoped access, request limits, and clear operational logs.',
    stage: 'planned',
    metaDescription:
      'Learn about the planned scope, access controls, and release criteria for Caurium Gate.',
    audience:
      'Small engineering teams that call third-party APIs from more than one service, and need to know which caller did what.',
    problem:
      'API keys spread across services. Nobody can revoke one caller without breaking the others, and a spent quota is discovered only after the bill arrives.',
    workflow: [
      {
        title: 'Present a credential',
        detail:
          'A service sends a Caurium-issued credential to a fixed Gate endpoint. Callers cannot supply an arbitrary destination URL.',
      },
      {
        title: 'Check identity, scope and budget',
        detail:
          'Gate verifies the caller, the permitted endpoint, request size, timeout and remaining quota before forwarding to an allow-listed upstream.',
      },
      {
        title: 'Return a response or a typed error',
        detail:
          'The caller receives the upstream response, or an error that separates authentication, permission, quota and upstream failure.',
      },
    ],
    workflowCaption: 'A caller crosses one boundary, is checked, and reaches one allow-listed upstream.',
    scopeNote:
      'No Gate capability is verified yet. The list below is the intended first release, not a description of a running service.',
    features: [
      {
        id: 'upstream',
        label: 'One upstream, fixed endpoints',
        detail:
          'The first release documents one supported upstream and the exact request and response shapes it forwards.',
        stage: 'planned',
      },
      {
        id: 'credentials',
        label: 'Per-caller credentials',
        detail:
          'Each caller receives a high-entropy key shown once at creation. The verifier stores only an irreversible value.',
        stage: 'planned',
      },
      {
        id: 'secrets',
        label: 'Server-side upstream secrets',
        detail:
          'Upstream keys live in server-side secret storage. The public website cannot read, issue or manage them.',
        stage: 'planned',
      },
      {
        id: 'limits',
        label: 'Durable limits',
        detail:
          'Per-identity request, body-size, timeout and spend limits are enforced in durable storage, not a single process.',
        stage: 'planned',
      },
      {
        id: 'errors',
        label: 'Typed errors',
        detail:
          'Missing or invalid credentials return 401, insufficient scope 403, exhausted quota 429, and upstream failure has its own class.',
        stage: 'planned',
      },
      {
        id: 'logs',
        label: 'Metadata-only logs',
        detail:
          'Request ID, endpoint, status, latency and usage. Prompt and response bodies are not logged by default.',
        stage: 'planned',
      },
      {
        id: 'streaming',
        label: 'Streaming only after verification',
        detail:
          'Chunked transfer, cancellation and timeouts must be tested on the actual runtime before streaming is offered.',
        stage: 'planned',
      },
    ],
    releaseCriteria: [
      'A valid credential completes an allow-listed request end to end.',
      'Missing credentials return 401, insufficient scope 403 and exhausted quota 429.',
      'Revocation takes effect without breaking other callers.',
      'Upstream failures are traceable without exposing upstream secrets.',
      'Spend protection triggers before the configured ceiling.',
      'The published contract is reproducible from documentation alone.',
    ],
    notThis: [
      'An open proxy for arbitrary URLs.',
      'A model or API reseller.',
      'A key-management console exposed on the public site.',
    ],
    boundaries: [
      { label: 'Upstream', value: 'One authorized API per deployment. Gate is not an open proxy.' },
      { label: 'Credentials', value: 'Per-caller keys, revocable without rotating other callers.' },
      { label: 'Regions', value: 'No region claim until a deployment exists and is measured.' },
      { label: 'Retention', value: 'Request metadata 7 days by default (proposed). No prompt or body retention.' },
      { label: 'Availability', value: 'Planned. Not accepting sign-ups or API calls.' },
      { label: 'Billing', value: 'No price or paid plan is published.' },
    ],
    boundaryTarget: 'Allow-listed upstream',
    example: {
      title: 'Proposed request contract',
      language: 'bash',
      code: `curl https://api.example.com/v1/forward \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"endpoint":"messages","input":"..."}'`,
      note: 'Proposed API — subject to change. api.example.com and YOUR_API_KEY are placeholders; no Caurium endpoint exists.',
    },
    nextStep: {
      label: 'Read the system overview',
      href: '/docs/overview/',
      detail:
        'The overview explains how the public site, product APIs and management systems are separated.',
    },
    cta: { label: 'View the roadmap', href: '/products/' },
    reviewedAt: REVIEWED_AT,
  },
  {
    id: 'probe',
    slug: 'probe',
    name: 'Probe',
    role: 'Observe',
    title: 'Know when your services need attention.',
    summary:
      'Planned: scheduled availability and TLS checks for endpoints you own or are authorized to monitor.',
    stage: 'planned',
    metaDescription:
      'Explore the planned availability and TLS monitoring workflow, data boundaries, and release criteria for Caurium Probe.',
    audience:
      'Teams responsible for endpoints they own or are explicitly authorized to monitor.',
    problem:
      'A service is slow from only one region, or a certificate expires on a Sunday, and the first report comes from a customer.',
    workflow: [
      {
        title: 'Check on a schedule',
        detail:
          'A probe requests a fixed endpoint and records HTTP status, time to response headers, TLS certificate validity and the time of the check.',
      },
      {
        title: 'Evaluate a short window',
        detail:
          'Three consecutive failures open an event. A recovery closes it. Missing or stale data is shown as Unknown, never as success.',
      },
      {
        title: 'Publish a sanitized state',
        detail:
          'A separate publisher exposes only an alias, coarse region, state and timestamps. It has no scanning capability or management credentials.',
      },
    ],
    workflowCaption: 'A fixed target is measured, evaluated over a window, and reduced to sanitized state.',
    scopeNote:
      'No Probe capability is verified yet. The first release is limited to a fixed endpoint list and does not accept anonymous arbitrary URLs.',
    features: [
      {
        id: 'checks',
        label: 'HTTP(S) and TLS checks',
        detail:
          'Status code, response time and certificate expiry, each recorded with its collection time.',
        stage: 'planned',
      },
      {
        id: 'fixed-targets',
        label: 'Fixed endpoint list',
        detail:
          'Only endpoints you own or are authorized to monitor. No public URL scanner.',
        stage: 'planned',
      },
      {
        id: 'cadence',
        label: 'Explicit initial cadence',
        detail:
          'Every 60 seconds, 10 second total timeout, event after three consecutive failures. These are initial values, not an SLA.',
        stage: 'planned',
      },
      {
        id: 'public-status',
        label: 'Sanitized public status',
        detail:
          'Public data excludes origin IPs, internal hostnames, full check URLs and raw error stacks.',
        stage: 'planned',
      },
      {
        id: 'ssrf',
        label: 'SSRF boundaries',
        detail:
          'DNS resolution, redirects and connect boundaries block localhost, private ranges, link-local addresses and cloud metadata endpoints.',
        stage: 'planned',
      },
      {
        id: 'separation',
        label: 'Collector and publisher separated',
        detail:
          'The publishing side has no ability to scan and no management credentials.',
        stage: 'planned',
      },
      {
        id: 'staleness',
        label: 'Unknown when data is stale',
        detail:
          'More than 180 seconds without a successful update shows Unknown, including when the publisher itself fails.',
        stage: 'planned',
      },
    ],
    releaseCriteria: [
      'A test endpoint returns normal, timeout, error-code and TLS-warning results correctly.',
      'Three consecutive failures open one event; recovery closes it; duplicate alerts are suppressed.',
      'Missing or stale data renders Unknown instead of carrying forward a previous green state.',
      'SSRF boundaries block localhost, private ranges, link-local and metadata endpoints.',
      'One probe runs in a real region before any single-region claim; two before any multi-region claim.',
      'The public publisher is verified to have no scan capability or management credentials.',
    ],
    notThis: [
      'An anonymous URL scanner.',
      'A replacement for internal application tracing.',
      'A guarantee that a third-party service will stay online.',
    ],
    boundaries: [
      {
        label: 'Regions',
        value: 'A region label appears only after a probe actually runs there and the result is reviewed.',
      },
      {
        label: 'Public data',
        value: 'Component alias, coarse region, state and timestamps. No origin IP, internal hostname, full URL or raw error.',
      },
      { label: 'Retention', value: 'Raw checks 30 days, redacted events 90 days (proposed).' },
      { label: 'Targets', value: 'Only endpoints you own or are authorized to monitor.' },
      { label: 'Availability', value: 'Planned. No monitoring is connected on this site.' },
      { label: 'Uptime', value: 'No verified uptime history exists yet, so no percentage is published.' },
    ],
    boundaryTarget: 'Authorized endpoints',
    example: {
      title: 'Proposed public status shape',
      language: 'ts',
      code: `interface PublicStatus {
  schemaVersion: 1;
  generatedAt: string;
  components: {
    id: string;
    health: 'operational' | 'degraded' | 'outage'
          | 'maintenance' | 'unknown';
    checkedAt: string | null;
    publishedAt: string;
    sourceRegion: string | null;
    coverageNote: string;
  }[];
}`,
      note: 'Proposed schema — subject to change. The live status page currently reports that monitoring is not connected.',
    },
    nextStep: {
      label: 'Read the status page',
      href: '/status/',
      detail:
        'The status page states exactly what is and is not connected today.',
    },
    cta: { label: 'View the roadmap', href: '/products/' },
    reviewedAt: REVIEWED_AT,
  },
  {
    id: 'guard',
    slug: 'guard',
    name: 'Guard',
    role: 'Operate',
    title: 'Make operational safeguards repeatable.',
    summary:
      'Planned: configuration backups, recovery procedures, and access records for Caurium operations.',
    stage: 'planned',
    metaDescription:
      'Learn about Caurium’s planned approach to configuration backups, recovery procedures, and operational access records.',
    audience:
      'Caurium operators first. External teams only after a real permission boundary, interface and support path exist.',
    problem:
      'Configuration, credentials and recovery steps live in different places. Nobody knows whether the last backup can actually be restored until it is needed.',
    workflow: [
      {
        title: 'Inventory the moving parts',
        detail:
          'Assets, owners and configuration changes are recorded in one place, with secrets referenced rather than copied.',
      },
      {
        title: 'Back up encrypted and off-site',
        detail:
          'Daily configuration and database backups are encrypted before they leave the source environment. Recovery keys are stored separately.',
      },
      {
        title: 'Restore before claiming safety',
        detail:
          'A clean test environment is restored at least once. The scope, duration and any data gaps are written down.',
      },
    ],
    workflowCaption: 'An asset is inventoried, encrypted off-site, and proven through a restore — not a green checkmark.',
    scopeNote:
      'Guard starts as an internal operational capability. It is not a public secrets API, customer KMS or compliance certification.',
    features: [
      {
        id: 'inventory',
        label: 'Asset and change inventory',
        detail:
          'A maintained list of what exists, who owns it and when it last changed.',
        stage: 'planned',
      },
      {
        id: 'backups',
        label: 'Encrypted off-site backups',
        detail:
          'Daily configuration and database backups, with encryption applied before transfer.',
        stage: 'planned',
      },
      {
        id: 'retention',
        label: 'Documented retention',
        detail:
          'Seven daily and four weekly versions initially, with the actual retention recorded for each asset class.',
        stage: 'planned',
      },
      {
        id: 'restore',
        label: 'Restore drills with evidence',
        detail:
          'At least one restore in a clean environment, recording scope, elapsed time and any data gap.',
        stage: 'planned',
      },
      {
        id: 'access',
        label: 'Separated admin access',
        detail:
          'Owner, operator and read-only roles, MFA for administrators, and no shared administrator accounts.',
        stage: 'planned',
      },
      {
        id: 'keys',
        label: 'Recovery keys kept apart',
        detail:
          'Encryption and recovery credentials are stored separately from the backups they protect.',
        stage: 'planned',
      },
      {
        id: 'runbooks',
        label: 'Manual runbooks first',
        detail:
          'Detection, alerting and a written recovery procedure precede any automatic failover.',
        stage: 'planned',
      },
    ],
    releaseCriteria: [
      'At least one restore completes in a clean environment with scope, duration and data gaps recorded.',
      'Daily backups are encrypted before transfer and recovery keys are stored separately.',
      'Administrator roles are separated and MFA is enforced.',
      'Detection, alerting and a manual runbook exist before any failover claim.',
      'The management panel is outside the connection path of separately operated services.',
      'Public status remains limited to components the operator has verified and chosen to publish.',
    ],
    notThis: [
      'A public secrets API or customer KMS.',
      'A compliance certification.',
      'An automatic failover product.',
    ],
    boundaries: [
      { label: 'Scope', value: 'Internal operations. This is not a public secrets API or customer KMS.' },
      { label: 'Failover', value: 'Detection, alerting and manual runbooks first. Automatic failover is later.' },
      {
        label: 'Isolation',
        value: 'The management panel does not sit in the connection path of any separately operated network service.',
      },
      { label: 'Availability', value: 'Planned. Internal use precedes any public description.' },
      { label: 'Certification', value: 'No compliance certification is claimed.' },
      { label: 'Public API', value: 'No public Guard API or console exists.' },
    ],
    boundaryTarget: 'Caurium operations',
    example: {
      title: 'Proposed backup manifest',
      language: 'json',
      code: `{
  "schemaVersion": 1,
  "asset": "config-store",
  "capturedAt": "2026-10-28T00:00:00Z",
  "encryption": "age-recipient:OPERATOR_KEY",
  "retention": { "daily": 7, "weekly": 4 },
  "restoreTest": {
    "lastVerifiedAt": null,
    "scope": "not yet verified"
  }
}`,
      note: 'Proposed manifest — subject to change. The null restore record is deliberate: no recovery has been verified yet.',
    },
    nextStep: {
      label: 'Read the security boundaries',
      href: '/docs/security/',
      detail:
        'The security page describes public boundaries and how management access is kept separate.',
    },
    cta: { label: 'View the roadmap', href: '/products/' },
    reviewedAt: REVIEWED_AT,
  },
  {
    id: 'box',
    slug: 'box',
    name: 'Box',
    role: 'Build',
    title: 'A private place to build and run.',
    summary:
      'Planned: invitation-only development environments with documented resource limits and access controls.',
    stage: 'planned',
    metaDescription:
      'Review the planned scope, access model, and resource boundaries for invitation-only Caurium Box environments.',
    audience:
      'Known users and trusted projects, admitted by invitation rather than anonymous sign-up.',
    problem:
      'A shared development server blurs ownership, spreads credentials and cannot be reclaimed cleanly when a project ends.',
    workflow: [
      {
        title: 'Request an environment',
        detail:
          'A person describes the project, the trust boundary and the expected lifetime. Capacity is reviewed manually.',
      },
      {
        title: 'Receive a dedicated instance',
        detail:
          'CPU, memory, disk, region, egress policy, ownership and lifecycle are documented before handover.',
      },
      {
        title: 'Revoke and reclaim',
        detail:
          'Each instance gets its own credential. Removing access and deleting the instance are tested, not assumed.',
      },
    ],
    workflowCaption: 'An invited project receives one bounded instance, then returns it cleanly.',
    scopeNote:
      'Box is invitation-only. It does not run anonymous code and is not a public multi-tenant sandbox.',
    features: [
      {
        id: 'invite',
        label: 'Manual review',
        detail:
          'No anonymous sign-up and no automated acceptance. The intended use is checked before capacity is assigned.',
        stage: 'planned',
      },
      {
        id: 'limits',
        label: 'Documented limits',
        detail:
          'CPU, RAM, disk, region, egress and instance lifetime are written down per environment.',
        stage: 'planned',
      },
      {
        id: 'credentials',
        label: 'Per-instance credentials',
        detail:
          'Each environment receives its own credential, revocable without affecting other instances.',
        stage: 'planned',
      },
      {
        id: 'lifecycle',
        label: 'Deletion and return',
        detail:
          'A defined export window, deletion step and confirmation are part of handover and teardown.',
        stage: 'planned',
      },
      {
        id: 'no-anonymous-code',
        label: 'No anonymous code execution',
        detail:
          'Box is not a public arbitrary-code sandbox and does not accept unknown workloads.',
        stage: 'planned',
      },
      {
        id: 'isolation',
        label: 'Honest isolation label',
        detail:
          'Environments are container-based and share a kernel. They are not described as microVMs or VM-level isolation.',
        stage: 'planned',
      },
      {
        id: 'separation',
        label: 'Separate from other networks',
        detail:
          'Box instances are not created by converting nodes that carry separately operated network services.',
        stage: 'planned',
      },
    ],
    releaseCriteria: [
      'A dedicated test instance is delivered with CPU, RAM, disk, region, egress and lifetime documented.',
      'Per-instance credentials can be issued and revoked without affecting other instances.',
      'User permissions, ports, egress and resource limits are verified.',
      'Export, deletion and reclaim steps are tested and recorded.',
      'Isolation is described as container-based shared kernel, never as a microVM.',
      'The instance has no route into management systems or separately operated networks.',
    ],
    notThis: [
      'A public arbitrary-code sandbox.',
      'A microVM or VM-level isolation platform.',
      'A route into other Caurium or private networks.',
    ],
    boundaries: [
      { label: 'Isolation', value: 'Container-based, shared kernel. Not a microVM and not VM-level isolation.' },
      { label: 'Tenancy', value: 'Single user or single trust domain. No multi-tenant public sandbox.' },
      { label: 'Network', value: 'Egress policy is defined per instance. Box is not a route to other networks.' },
      { label: 'Availability', value: 'Private preview only after acceptance. No self-serve purchase.' },
      { label: 'Performance', value: 'No startup-time or elasticity claim until measured and reviewed.' },
      { label: 'Data', value: 'No anonymous uploads and no promise of confidentiality beyond the documented review.' },
    ],
    boundaryTarget: 'Invited projects',
    example: {
      title: 'Proposed instance specification',
      language: 'json',
      code: `{
  "schemaVersion": 1,
  "instance": "box-example",
  "region": "REGION_PLACEHOLDER",
  "resources": { "cpu": 2, "memoryGb": 4, "diskGb": 40 },
  "egress": "restricted",
  "owner": "invited-project",
  "lifetime": "30d",
  "credentials": "per-instance, revocable"
}`,
      note: 'Proposed spec — subject to change. Values are placeholders, not a service offer or capacity commitment.',
    },
    nextStep: {
      label: 'Read the security boundaries',
      href: '/docs/security/',
      detail:
        'The security page explains isolation, access and what Box does not provide.',
    },
    cta: { label: 'View the roadmap', href: '/products/' },
    reviewedAt: REVIEWED_AT,
  },
];

export function getProduct(id: string): ProductRecord | undefined {
  return PRODUCTS.find((product) => product.id === id);
}
