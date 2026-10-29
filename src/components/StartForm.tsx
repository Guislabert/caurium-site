'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { OFFERED_PLANS, getPlan } from '@/content/plans';

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'error'; message: string };

/* Square like every other control, with a boundary that reaches 3:1 on paper. */
const FIELD =
  'mt-1.5 w-full rounded-none border border-control-border bg-paper px-3 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent-ink focus:ring-2 focus:ring-accent-ink/25';

const LABEL = 'mono text-[11px] uppercase tracking-[0.06em] text-muted';

/* Five fields are required; say so once instead of repeating it per label. */
function Required() {
  return (
    <span className="text-accent-ink" aria-hidden="true">
      {' '}
      *
    </span>
  );
}

export function StartForm({ endpoint }: { endpoint: string }) {
  const planSelect = useRef<HTMLSelectElement>(null);
  const [state, setState] = useState<SubmitState>({ kind: 'idle' });

  // The access page links here with ?plan=. Reading the query string during render
  // would force the form behind a Suspense boundary and drop it from the static
  // export, so the select starts empty and is corrected after mount. Only sizes
  // that are still offered can be preselected; a retired one leaves the empty
  // "choose a size" option so the reader makes the choice themselves.
  useEffect(() => {
    const requested = getPlan(new URLSearchParams(window.location.search).get('plan'));
    const offered = requested && OFFERED_PLANS.some((plan) => plan.id === requested.id);
    if (offered && planSelect.current) planSelect.current.value = requested.id;
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState({ kind: 'sending' });

    try {
      const response = await fetch(`${endpoint.replace(/\/$/, '')}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          company: data.get('company'),
          plan: data.get('plan'),
          endpoints: data.get('endpoints'),
          message: data.get('message'),
          website: data.get('website'),
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        setState({
          kind: 'error',
          message:
            result?.error ??
            'The request could not be sent. Please try again in a moment.',
        });
        return;
      }

      form.reset();
      setState({ kind: 'sent' });
    } catch {
      setState({
        kind: 'error',
        message:
          'The request could not reach the Probe service. Check your connection and try again.',
      });
    }
  }

  if (state.kind === 'sent') {
    return (
      <div className="card p-6 md:p-8" role="status">
        <p className="mono text-[11px] uppercase tracking-[0.06em] text-olive">Request received</p>
        <h2 className="h3 mt-3">We will check ownership and reply by email.</h2>
        <p className="mt-3 max-w-xl text-[14px] leading-6 text-muted">
          Your application is stored by the Probe service. If the endpoints can be verified, we
          activate the account and send the status page address and a webhook test. If something is
          missing, we reply with the exact question.
        </p>
        <p className="mt-4 max-w-xl text-[13px] leading-5 text-muted">
          Nothing is monitored until activation, and nothing is charged at any point during the
          preview.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/access/" className="btn btn-secondary">
            Back to access
          </Link>
          <Link href="/products/probe/" className="btn btn-secondary">
            How Probe works
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      method="post"
      action={`${endpoint.replace(/\/$/, '')}/api/leads`}
      onSubmit={handleSubmit}
      className="card p-6 md:p-8"
      noValidate={false}
    >
      <p className="note mb-5 text-[12px] leading-5 text-muted">
        Fields marked <span className="text-accent-ink">*</span> are required. Everything else is
        optional.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="name">
            Your name
            <Required />
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            className={FIELD}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">
            Work email
            <Required />
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={FIELD}
            placeholder="you@company.example"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="company">
            Company or project
          </label>
          <input
            id="company"
            name="company"
            type="text"
            maxLength={160}
            autoComplete="organization"
            className={FIELD}
            placeholder="Optional"
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="plan">
            Plan
            <Required />
          </label>
          {/* No preselected size: before hydration a `?plan=` link would otherwise
              submit the default for the wrong size. An empty first option makes
              the choice explicit and the select fails validation instead. */}
          <select
            ref={planSelect}
            id="plan"
            name="plan"
            required
            defaultValue=""
            className={FIELD}
          >
            <option value="" disabled>
              Choose a size
            </option>
            {OFFERED_PLANS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} — {item.endpoints} endpoints · free
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className={LABEL} htmlFor="endpoints">
          Endpoints you own
          <Required />
        </label>
        <textarea
          id="endpoints"
          name="endpoints"
          required
          rows={5}
          maxLength={4000}
          className={FIELD}
          placeholder={'https://example.com/health — Checkout API — expect 200\nhttps://example.com/status — Public site — expect 200'}
        />
        <p className="mt-1.5 text-[12px] leading-5 text-muted">
          One per line. Include the public URL, the alias for the status page and the expected HTTP
          status. Private hosts and credentials will be rejected.
        </p>
      </div>

      <div className="mt-5">
        <label className={LABEL} htmlFor="message">
          Anything else
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={2000}
          className={FIELD}
          placeholder="Optional: alert webhook, maintenance window, or a question about the limits."
        />
      </div>

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-6 flex items-start gap-3 text-[12.5px] leading-5 text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-strong accent-accent"
        />
        <span>
          I have read the <Link href="/privacy/" className="underline decoration-border-strong">privacy notice</Link>{' '}
          and understand that these details are used to review the application and contact me.
        </span>
      </label>

      {state.kind === 'error' ? (
        <p
          role="alert"
          className="mt-5 rounded-[10px] border border-danger/30 bg-danger/5 px-3 py-2 text-[13px] leading-5 text-danger"
        >
          {state.message}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col items-start gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[12px] leading-5 text-muted">
          No payment is taken now. We reply to the email you provide.
        </p>
        <button
          type="submit"
          disabled={state.kind === 'sending'}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.kind === 'sending' ? 'Sending…' : 'Send application'}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
