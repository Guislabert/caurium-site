export type PlanId = 'starter' | 'team' | 'business';

export interface Plan {
  id: PlanId;
  name: string;
  endpoints: number;
  minIntervalSeconds: number;
  retentionDays: number;
  summary: string;
  detail: string;
  recommended?: boolean;
}

/**
 * The preview is free and admission is by application, so there are no prices
 * here. A plan selects the endpoint count and the check-history retention; it is
 * a size, not a purchase. Every number is enforced by the Probe worker or by the
 * manual activation checklist, so change it in the same commit as the worker.
 */
export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    endpoints: 10,
    minIntervalSeconds: 60,
    retentionDays: 7,
    summary: 'One small service, one status page.',
    detail:
      'For a single product or a handful of endpoints. Up to 10 endpoints, each checked every 60 seconds; check history is kept for 7 days.',
  },
  {
    id: 'team',
    name: 'Team',
    endpoints: 50,
    minIntervalSeconds: 60,
    retentionDays: 30,
    summary: 'Several services and a month of history.',
    detail:
      'For teams running more than one service. Up to 50 endpoints, each checked every 60 seconds; check history is kept for 30 days.',
    recommended: true,
  },
  {
    id: 'business',
    name: 'Business',
    endpoints: 200,
    minIntervalSeconds: 60,
    retentionDays: 90,
    summary: 'A larger surface with longer history.',
    detail:
      'For a broader endpoint list. Up to 200 endpoints, each checked every 60 seconds; check history is kept for 90 days.',
  },
];

export const PLAN_INCLUDES = [
  'HTTP status and latency checks on a fixed schedule',
  'Three consecutive failures open one incident; the first success closes it',
  'One HTTPS webhook for incident opened and recovered messages',
  'A sanitized HTML status page and JSON feed for your account',
  'Activation by hand after an ownership check',
  'No response bodies, origin addresses or raw errors published',
] as const;

export const PLAN_FAQ = [
  {
    question: 'What counts as an endpoint?',
    answer:
      'One URL, one expected HTTP status and one interval. If two paths need separate states, they are two endpoints.',
  },
  {
    question: 'How do I get an account?',
    answer:
      'Open a ticket from the application form with the endpoints you own. Admission is by ticket during the preview, and we answer to the email you give. Accounts are activated by hand after an ownership check.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Nothing. The private preview is free: no payment is requested, no card is taken and no invoice is issued. A plan only selects how many endpoints you can add and how long check history is kept.',
  },
  {
    question: 'What happens if I go over the endpoint limit?',
    answer:
      'Nothing is charged, because nothing is charged at all. We tell you the target count exceeds the plan and you choose whether to move up or remove targets.',
  },
  {
    question: 'Can I leave?',
    answer:
      'Yes. Ask by email and the account and its targets are removed. Nothing is charged during the preview, so leaving costs nothing.',
  },
  {
    question: 'Is there an SLA or uptime guarantee?',
    answer:
      'No. Probe is in private preview and publishes no uptime percentage or response-time commitment. The status page states what is known and marks stale data Unknown.',
  },
] as const;

export const PLAN_INTERVAL_LABEL = (seconds: number) => `Every ${seconds}s`;

/** Stated wherever a plan is offered, because no plan is sold. */
export const FREE_NOTICE = 'Free during the private preview';

export function getPlan(id: string | null | undefined): Plan | undefined {
  return PLANS.find((plan) => plan.id === id);
}
