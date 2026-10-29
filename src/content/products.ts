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

export interface DesignDecision {
  title: string;
  detail: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
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
  forLine: string;
  problem: string;
  workflow: WorkflowStep[];
  workflowCaption: string;
  scopeNote: string;
  features: ScopeFeature[];
  releaseCriteria: string[];
  designDecisions: DesignDecision[];
  openQuestions: string[];
  faq: ProductFaq[];
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
  'private-preview':
    'Core acceptance passed. Open through a reviewed intake; accounts are activated by hand.',
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
      'In development: authenticated API routing to one allow-listed upstream, with per-caller scopes, a request quota, a spend ceiling and metadata-only logs. Running; not open to customers.',
    stage: 'in-development',
    metaDescription:
      'Caurium Gate routes authenticated requests to one allow-listed upstream, with per-caller scopes, quotas, a spend ceiling and metadata-only logs. In development.',
    audience:
      'Small engineering teams that call third-party APIs from more than one service, and need to know which caller did what.',
    forLine: 'Teams calling one third-party API from several services.',
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
      'Gate runs and is exercised end to end, but it is not open to customers. Each item below is labelled verified or not yet built; nothing here is offered for sale.',
    features: [
      {
        id: 'upstream',
        label: 'One upstream, fixed endpoints',
        detail:
          'Verified: one https upstream, path-only addressing; redirects are not followed.',
        stage: 'implemented',
      },
      {
        id: 'credentials',
        label: 'Per-caller credentials',
        detail:
          'Verified: only a SHA-256 verifier is stored, and the presented key is never logged.',
        stage: 'implemented',
      },
      {
        id: 'secrets',
        label: 'Server-side upstream secrets',
        detail:
          'Verified: the upstream secret is a Worker secret and never returns to a caller.',
        stage: 'implemented',
      },
      {
        id: 'limits',
        label: 'Durable limits',
        detail:
          'Verified in D1: a 24-hour request quota and an estimated spend ceiling per key.',
        stage: 'implemented',
      },
      {
        id: 'errors',
        label: 'Typed errors',
        detail:
          'Verified: 401, 403, 413, 429, 502 and 507, each with a stable error field.',
        stage: 'implemented',
      },
      {
        id: 'logs',
        label: 'Metadata-only logs',
        detail:
          'Verified: path, status, latency and outcome per request; no request or response bodies.',
        stage: 'implemented',
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
    designDecisions: [
      {
        title: 'Why one upstream',
        detail:
          'An open proxy is a security and billing liability. One allow-listed upstream makes the contract testable end to end.',
      },
      {
        title: 'Why per-caller keys',
        detail:
          'Revocation has to be local. Rotating a shared key breaks every caller at once.',
      },
      {
        title: 'Why metadata-only logs',
        detail:
          'Request bodies create retention and leakage risk without improving routing. The log answers “who called what”, not “what did they say”.',
      },
    ],
    openQuestions: [
      'Which upstream ships first, and who authorizes it?',
      'Is streaming supported on the target runtime, or does the first release buffer?',
      'What is the default metadata retention: 7, 14 or 30 days?',
      'Which region, if any, will the first deployment run in?',
    ],
    faq: [
      {
        question: 'Can I call Gate today?',
        answer: 'No. Gate is Planned. There is no endpoint, key or console.',
      },
      {
        question: 'What happens when quota is exhausted?',
        answer:
          'The intended behavior is a 429 before the request reaches the upstream.',
      },
      {
        question: 'Are request bodies logged?',
        answer:
          'Not by default. The intended record is metadata only: request ID, endpoint, status, latency and usage.',
      },
      {
        question: 'Is Gate an open proxy?',
        answer:
          'No. Callers cannot supply a destination URL; one allow-listed upstream is configured per deployment.',
      },
      {
        question: 'Is streaming supported?',
        answer:
          'Not claimed. It must be tested on the target runtime before it is offered.',
      },
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
      'Private preview: scheduled HTTP checks, a three-failure incident rule, one webhook, and a sanitized status page. Accounts are activated by hand.',
    stage: 'private-preview',
    metaDescription:
      'Probe checks owner-authorized endpoints every 60 seconds, opens one incident after three failures, alerts a webhook and publishes a sanitized status page. Free private preview, opened by application.',
    audience:
      'Small teams that own public HTTP endpoints and want a status page and a webhook alert without operating the checker themselves.',
    forLine: 'Teams responsible for public endpoints they own or are authorized to monitor.',
    problem:
      'A deploy breaks the checkout endpoint at night. The first report is a customer message, and the status page is a green page nobody remembered to update.',
    workflow: [
      {
        title: 'Send the endpoints you own',
        detail:
          'Apply with the URLs and aliases you want checked. We confirm ownership, agree the interval and activate the account by hand before monitoring starts.',
      },
      {
        title: 'Checks run on a fixed schedule',
        detail:
          'Probe requests each target on its interval, records the status code and latency, follows at most three redirects and re-validates every hop. Response bodies are discarded.',
      },
      {
        title: 'Three failures open an incident',
        detail:
          'The status page turns Outage and the account webhook receives one message. The first successful check closes the incident and sends one recovery message.',
      },
    ],
    workflowCaption:
      'You send a fixed target list; Probe checks it, reduces it to state, and alerts one webhook on change.',
    scopeNote:
      'Probe is running in private preview. Every account is reviewed and activated by hand. There is no self-serve console, and no endpoint is checked until ownership is confirmed.',
    features: [
      {
        id: 'checks',
        label: 'HTTP status and latency',
        detail:
          'Expected status, actual status and time to response, recorded with the check time. Response bodies and headers are not stored.',
        stage: 'implemented',
      },
      {
        id: 'fixed-targets',
        label: 'Fixed, owner-authorized targets',
        detail:
          'Only endpoints you own or are authorized to monitor. There is no anonymous URL scanner.',
        stage: 'implemented',
      },
      {
        id: 'cadence',
        label: '60–3600 second cadence',
        detail:
          'Each target is checked once per minute, with a 10 second timeout. The scheduler runs every minute, so 60 seconds is the shortest interval the service can honour.',
        stage: 'implemented',
      },
      {
        id: 'incidents',
        label: 'Three-failure incident rule',
        detail:
          'Three consecutive failures open one incident. One success closes it. Duplicate open or recovery messages are suppressed.',
        stage: 'implemented',
      },
      {
        id: 'alerts',
        label: 'One HTTPS webhook per account',
        detail:
          'Incident opened and recovered messages post to a Slack-compatible or custom HTTPS endpoint. Email alerts are not available.',
        stage: 'implemented',
      },
      {
        id: 'public-status',
        label: 'Sanitized public status',
        detail:
          'A JSON feed and an HTML page show alias, state, check time and latency. Origin URLs and raw errors are never published.',
        stage: 'implemented',
      },
      {
        id: 'ssrf',
        label: 'Private-network rejection',
        detail:
          'Localhost, private IPv4 literals, metadata hostnames, .local and .internal names are rejected before a request is made. Every redirect hop is checked again.',
        stage: 'implemented',
      },
      {
        id: 'staleness',
        label: 'Unknown when a check is stale',
        detail:
          'A missing or out-of-date check renders Unknown. The threshold is three missed slots plus a minute, with at least three minutes of slack.',
        stage: 'implemented',
      },
      {
        id: 'tls',
        label: 'TLS expiry checks',
        detail:
          'Certificate expiry is not read yet. It stays out of the offer until it is implemented and verified.',
        stage: 'planned',
      },
      {
        id: 'separation',
        label: 'Separate collector and publisher',
        detail:
          'The status endpoint currently shares a Worker with collection. Splitting them is required before a stronger compromise boundary is claimed.',
        stage: 'planned',
      },
    ],
    releaseCriteria: [
      'Normal, timeout, error-code and redirect results are recorded correctly.',
      'Three consecutive failures open one incident; recovery closes it; duplicate alerts are suppressed.',
      'Missing or stale data renders Unknown instead of carrying forward a previous green state.',
      'Private IP literals, localhost, metadata hosts and unsafe redirect hops are rejected.',
      'A customer status page exposes no origin URL, internal hostname or raw error.',
      'Payment, activation and cancellation complete end to end for a paying account.',
    ],
    designDecisions: [
      {
        title: 'Why fixed targets',
        detail:
          'An anonymous URL scanner invites abuse and SSRF. A fixed target list makes every check accountable to an owner.',
      },
      {
        title: 'Why three failures',
        detail:
          'One missed request is noise. Three consecutive failures are a state change worth waking someone for.',
      },
      {
        title: 'Why a sanitized publisher',
        detail:
          'The public status path must not expose origin addresses, internal hostnames or raw errors, even to the account owner’s visitors.',
      },
    ],
    openQuestions: [
      'Should TLS expiry ship before public beta, or stay a later release?',
      'Will checks ever run from more than one measured region, and what claim would that support?',
      'When does the collector split from the status publisher into a separate deployment?',
      'Which alert channels follow the first HTTPS webhook?',
      'What is the right refund window for a monthly account?',
    ],
    faq: [
      {
        question: 'Can I use Probe today?',
        answer:
          'Yes, in private preview. Send the endpoints you own; we confirm ownership, agree the interval and activate the account by hand. There is no self-serve signup.',
      },
      {
        question: 'What does Probe cost?',
        answer:
          'Free during the private preview. A size sets the endpoint count and the check-history retention; the access page lists the exact limits.',
      },
      {
        question: 'Can I monitor any URL?',
        answer:
          'No. Only endpoints you own or are authorized to monitor are eligible. We confirm ownership before activation.',
      },
      {
        question: 'How do alerts work?',
        answer:
          'One HTTPS webhook per account receives a message when an incident opens and another when it recovers. Email alerts are not available yet.',
      },
      {
        question: 'Is there a public status page?',
        answer:
          'Yes. Each account gets a sanitized status page and a JSON feed at a stable address on the Probe host.',
      },
      {
        question: 'What happens when checks stop?',
        answer:
          'The component renders Unknown, not green. Missing or stale data is never carried forward as success.',
      },
      {
        question: 'Do you store response bodies?',
        answer:
          'No. Probe records status code, latency, check time and a short error class. Bodies and response headers are discarded.',
      },
    ],
    notThis: [
      'An anonymous URL scanner.',
      'A replacement for application tracing or log aggregation.',
      'An uptime guarantee or a promise that a third party will stay online.',
    ],
    boundaries: [
      {
        label: 'Targets',
        value: 'Only owner-authorized public endpoints. No anonymous scanning.',
      },
      {
        label: 'Checks',
        value: 'HTTP status and latency. Bodies are not stored. TLS expiry is not checked yet.',
      },
      {
        label: 'Alerts',
        value: 'One HTTPS webhook per account. No email, SMS or pager integration.',
      },
      {
        label: 'Public data',
        value: 'Alias, state, check time and latency. No origin URL, internal hostname or raw error.',
      },
      {
        label: 'Retention',
        value: 'Check history: 7 days on Starter, 30 on Team, 90 on Business.',
      },
      {
        label: 'Regions',
        value:
          "Checks run from Cloudflare's network. No selectable region, residency commitment or region label is published.",
      },
      {
        label: 'Certification',
        value:
          "No SOC 2, ISO 27001, HIPAA or equivalent. Cloudflare's compliance does not certify this service.",
      },
      {
        label: 'Availability',
        value: 'Free private preview, opened by application. No SLA and no uptime percentage is published.',
      },
      {
        label: 'Cost',
        value: 'Free during the preview, opened by application. Leave by email at any time.',
      },
    ],
    boundaryTarget: 'Owner-authorized endpoints',
    example: {
      title: 'Live status contract',
      language: 'json',
      code: `{
  "schemaVersion": 1,
  "customer": { "slug": "acme", "name": "Acme" },
  "generatedAt": "2026-10-28T09:00:00.000Z",
  "components": [
    {
      "id": "COMPONENT_ID",
      "alias": "Checkout API",
      "state": "operational",
      "checkedAt": "2026-10-28T08:59:40.000Z",
      "latencyMs": 88,
      "statusCode": 200,
      "error": null
    }
  ]
}`,
      note: 'This is the deployed schema. IDs, customer names and timestamps are illustrative placeholders, not a live account.',
    },
    nextStep: {
      label: 'Apply for access',
      href: '/access/',
      detail:
        'Three fixed sizes, a 60-second cadence, free during the preview and opened by application.',
    },
    cta: { label: 'Request access', href: '/access/' },
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
    forLine: 'Operators who need a restore they can prove.',
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
    designDecisions: [
      {
        title: 'Why restore drills',
        detail:
          'An untested backup is a hypothesis. The restore record is the evidence, including the duration and any data gap.',
      },
      {
        title: 'Why manual runbooks first',
        detail:
          'Automatic failover without a proven recovery path creates a second failure mode.',
      },
      {
        title: 'Why separate recovery keys',
        detail:
          'A stolen backup should not also contain the key that decrypts it.',
      },
    ],
    openQuestions: [
      'Which asset classes are in the first release?',
      'What restore duration counts as acceptable?',
      'Where are recovery keys held, and who can use them?',
      'Which failures justify automatic action rather than a page?',
    ],
    faq: [
      {
        question: 'Is Guard a backup product I can buy?',
        answer:
          'No. Guard is Planned and starts as an internal operational capability.',
      },
      {
        question: 'Does Guard guarantee a recovery time?',
        answer:
          'No. Recovery duration is recorded per restore test, not promised in advance.',
      },
      {
        question: 'Are backups encrypted?',
        answer:
          'The intended design encrypts before transfer. No backup has been produced.',
      },
      {
        question: 'Is Guard a compliance certification?',
        answer: 'No. It is an operational capability, not an audit or a certificate.',
      },
      {
        question: 'Can I access a Guard console?',
        answer: 'No. No public Guard API or console exists.',
      },
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
    forLine: 'Invited projects that need a bounded development environment.',
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
    designDecisions: [
      {
        title: 'Why invitation only',
        detail:
          'Anonymous code execution changes the threat model. Manual review keeps the trust boundary explicit.',
      },
      {
        title: 'Why isolation is stated plainly',
        detail:
          'Shared-kernel containers are not microVMs. The page should not imply an isolation property it does not have.',
      },
      {
        title: 'Why per-instance credentials',
        detail:
          'Reclaiming one project must not require rotating every other project.',
      },
    ],
    openQuestions: [
      'What is the first supported runtime and image format?',
      'Which egress destinations are allowed by default?',
      'How long can an instance live before review?',
      'What does export look like at the end of a project?',
    ],
    faq: [
      {
        question: 'Can I sign up for Box?',
        answer: 'No. Box is invitation-only and not open.',
      },
      {
        question: 'Is Box a public code sandbox?',
        answer: 'No. It does not accept anonymous or unknown workloads.',
      },
      {
        question: 'Is Box a microVM?',
        answer:
          'No. Environments are container-based and share a kernel. They are not VM-level isolation.',
      },
      {
        question: 'Can Box reach other Caurium networks?',
        answer:
          'No. Egress is defined per instance, and Box is not a route to other networks.',
      },
      {
        question: 'Is there a Box console?',
        answer: 'No. No public console exists.',
      },
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
