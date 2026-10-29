export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: 'Is Caurium available today?',
    answer:
      'Probe is available in private preview with manual activation. Gate and Guard are in development; Box is planned and are not for sale.',
  },
  {
    question: 'Can I create an account, key or paid plan?',
    answer:
      'You can apply for Probe. There is no self-serve signup, console or API key issuance: we confirm endpoint ownership, send a payment request and activate the account by hand. Gate, Guard and Box have no accounts or prices.',
  },
  {
    question: 'What does “Planned” mean?',
    answer:
      'A specification or design exists, but availability has not been verified. A stage changes only after its release criteria are met and recorded.',
  },
  {
    question: 'What does Probe cost?',
    answer:
      'Nothing. The private preview is free: no payment is requested, no card is taken and no invoice is issued. A size sets how many endpoints you can add and how long check history is kept. Every size checks at 60 seconds. Gate, Guard and Box are not offered.'
  },
  {
    question: 'Do you publish regions, SLAs or uptime?',
    answer:
      'No, and each absence is deliberate. Checks run from Cloudflare\'s network rather than a region you can select, and no region label, residency commitment or failover promise is published. Probe is a private preview with no SLA, availability target, service credit or response-time commitment. No uptime percentage is published for this site or for customer accounts; status pages show current state and check time, not a historical percentage.',
  },
  {
    question: 'Are you certified?',
    answer:
      'No. Caurium holds no SOC 2, ISO 27001, HIPAA or equivalent certification and has not been audited. It runs on Cloudflare, whose own compliance covers Cloudflare\'s platform, not the service built on top of it. A hosting provider\'s certificate is not a certificate for this service.',
  },
  {
    question: 'Is there a status page?',
    answer:
      'Yes, two different things. Activated Probe accounts get a live status page and JSON feed built from their own checks. The Caurium site-wide feed is not connected, so that page reports Unknown rather than a green summary.',
  },
  {
    question: 'How do I report a security issue?',
    answer:
      'There is no public reporting channel yet. Do not send credentials, tokens, private addresses or other sensitive material through any public channel. This gap is a release blocker.',
  },
  {
    question: 'Can I build against the API from the documentation?',
    answer:
      'Only the Probe status feed is callable, and only for an activated account. The Gate, Guard and Box examples are proposed contracts. There is no public quickstart for those products.',
  },
  {
    question: 'Why four modules instead of one platform?',
    answer:
      'Each module has one job, one boundary and its own acceptance criteria. A release in one does not promote another.',
  },
  {
    question: 'Who is Caurium for?',
    answer:
      'Small teams that own public endpoints and want a status page and a webhook alert without running the checker — and, later, teams that need scoped API access and recovery they can prove.',
  },
  {
    question: 'How do I cancel a Probe account?',
    answer:
      'Tell us before the next monthly payment. Monitoring continues until the end of the paid month and then stops. There is no automatic renewal or stored card on this site.',
  },
  {
    question: 'What happens when Probe cannot run a check?',
    answer:
      'The component is marked Unknown, not healthy. Probe never carries a previous green state forward when data is missing or stale.',
  },
];
