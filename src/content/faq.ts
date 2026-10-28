export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: 'Is Caurium available today?',
    answer:
      'No. Gate, Probe, Guard and Box are all Planned. There is no callable endpoint, console, account or API key.',
  },
  {
    question: 'Can I create an account, key or paid plan?',
    answer:
      'No. The public site has no sign-up, login, payment flow or key generation. No price is published.',
  },
  {
    question: 'What does “Planned” mean?',
    answer:
      'A specification or design exists, but availability has not been verified. A stage changes only after its release criteria are met and recorded.',
  },
  {
    question: 'Why are there no prices?',
    answer:
      'No plan is sold. A price without a service would be a claim the project cannot support.',
  },
  {
    question: 'Do you publish regions, SLAs or uptime?',
    answer:
      'No. A region label appears only after a deployment exists and a check has run there. An SLA requires a measured service. No uptime history is published.',
  },
  {
    question: 'Is there a status page?',
    answer:
      'Yes. It reports that monitoring is not connected. Until a sanitized feed exists, every component is Unknown by design.',
  },
  {
    question: 'How do I report a security issue?',
    answer:
      'There is no public reporting channel yet. Do not send credentials, tokens, private addresses or other sensitive material through any public channel. This gap is a release blocker.',
  },
  {
    question: 'Can I build against the API from the documentation?',
    answer:
      'No. The examples are proposed contracts, not callable endpoints. There is no quickstart because there is no service to start.',
  },
  {
    question: 'Why four modules instead of one platform?',
    answer:
      'Each module has one job, one boundary and its own acceptance criteria. A release in one does not promote another.',
  },
  {
    question: 'Who is Caurium for?',
    answer:
      'Small engineering teams that need scoped API access, endpoint checks, and recovery they can prove — once those modules exist.',
  },
];
