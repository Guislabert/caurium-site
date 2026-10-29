export type PlanId = 'starter' | 'team' | 'business';

export interface Plan {
  id: PlanId;
  name: string;
  /** Planned price. Nothing is charged during the private preview. */
  price: number;
  cadence: string;
  endpoints: number;
  minIntervalSeconds: number;
  retentionDays: number;
  summary: string;
  detail: string;
  recommended?: boolean;
}

/**
 * Every number here is enforced by the Probe worker or by the manual
 * activation checklist. If a limit changes in the worker, change it here in
 * the same commit.
 *
 * `price` is the planned monthly price. The private preview is free: no payment
 * is requested and no billing entity is published, so every surface must present
 * these figures as planned rather than as a charge in force.
 */
export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    cadence: 'per month',
    endpoints: 10,
    minIntervalSeconds: 60,
    retentionDays: 7,
    summary: 'One small service, one status page.',
    detail:
      'For a single product or a handful of endpoints. Checks run every 60 seconds; check history is kept for 7 days.',
  },
  {
    id: 'team',
    name: 'Team',
    price: 49,
    cadence: 'per month',
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
    price: 99,
    cadence: 'per month',
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
  'Manual activation and ownership confirmation',
  'No response bodies, origin addresses or raw errors published',
] as const;

export const PLAN_FAQ = [
  {
    question: 'What counts as an endpoint?',
    answer:
      'One URL, one expected HTTP status and one interval. If two paths need separate states, they are two endpoints.',
  },
  {
    question: 'How does payment work?',
    answer:
      'It does not, yet. The private preview is free: no payment is requested, no card is taken and no billing entity is published. The figures on this page are the planned monthly prices. Paid activation will open only after the operating entity, governing law and a billing contact are published, and existing accounts will be told before anything is charged.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'The whole private preview is free. There is no trial period, because there is nothing to buy: accounts are activated by hand and cost nothing while the preview runs.',
  },
  {
    question: 'What happens if I go over the endpoint limit?',
    answer:
      'Nothing is charged for it. We tell you the target count exceeds the plan and you choose whether to move up or remove targets.',
  },
  {
    question: 'Can I cancel?',
    answer:
      'Yes. Ask by email and the account stops at the end of the month you are in. Nothing is charged during the preview, so cancelling costs nothing.',
  },
  {
    question: 'Is there an SLA or uptime guarantee?',
    answer:
      'No. Probe is in private preview and publishes no uptime percentage or response-time commitment. The status page states what is known and marks stale data Unknown.',
  },
] as const;

export const PLAN_INTERVAL_LABEL = (seconds: number) => `Every ${seconds}s`;

/** Set on every surface that shows a figure from PLANS. */
export const PRICE_QUALIFIER = 'Planned price · preview is free';

export function getPlan(id: string | null | undefined): Plan | undefined {
  return PLANS.find((plan) => plan.id === id);
}
