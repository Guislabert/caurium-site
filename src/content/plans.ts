export type PlanId = 'starter' | 'team' | 'business';

export interface Plan {
  id: PlanId;
  name: string;
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
    minIntervalSeconds: 30,
    retentionDays: 30,
    summary: 'Several services and a shorter interval.',
    detail:
      'For teams running more than one service. Checks can run every 30 seconds; check history is kept for 30 days.',
    recommended: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 99,
    cadence: 'per month',
    endpoints: 200,
    minIntervalSeconds: 30,
    retentionDays: 90,
    summary: 'A larger surface with longer history.',
    detail:
      'For a broader endpoint list. Checks can run every 30 seconds; check history is kept for 90 days.',
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
      'Apply first. We confirm that you own the endpoints, then send a Stripe payment link for the plan you chose. Monitoring starts when the payment completes. Each month is paid separately; no card is stored on this site.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'No. Private-preview accounts are activated by hand and paid monthly from the first month.',
  },
  {
    question: 'What happens if I go over the endpoint limit?',
    answer:
      'We do not add endpoints or charge overages automatically. You choose whether to upgrade or disable the extra targets.',
  },
  {
    question: 'Can I cancel?',
    answer:
      'Yes. Cancel before the next monthly payment. Monitoring continues until the end of the paid month and then stops.',
  },
  {
    question: 'Is there an SLA or uptime guarantee?',
    answer:
      'No. Probe is in private preview and publishes no uptime percentage or response-time commitment. The status page states what is known and marks stale data Unknown.',
  },
] as const;

export const PLAN_INTERVAL_LABEL = (seconds: number) => `Every ${seconds}s`;

export function getPlan(id: string | null | undefined): Plan | undefined {
  return PLANS.find((plan) => plan.id === id);
}
