'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { validatePublicStatus, type Health, type PublicStatus } from '@/lib/status';

type State =
  | { kind: 'not-connected' }
  | { kind: 'loading' }
  | { kind: 'ready'; status: PublicStatus }
  | { kind: 'unavailable'; reason: string };

const HEALTH_LABEL: Record<Health, string> = {
  operational: 'Operational',
  degraded: 'Degraded',
  outage: 'Outage',
  maintenance: 'Maintenance',
  unknown: 'Unknown',
};

const HEALTH_CLASS: Record<Health, string> = {
  operational: 'text-success',
  degraded: 'text-warning',
  outage: 'text-danger',
  maintenance: 'text-warning',
  unknown: 'text-muted',
};

function Panel({
  stateLabel,
  children,
  footer,
  tone = 'neutral',
}: {
  stateLabel: string;
  children: ReactNode;
  footer?: ReactNode;
  tone?: 'neutral' | 'warning';
}) {
  return (
    <div className="status-panel" role="status">
      <div className="status-panel__head">
        <p className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
          Public status · Schema v1
        </p>
        <span
          className={`mono text-[8.5px] uppercase tracking-[0.1em] ${
            tone === 'warning' ? 'text-warning' : 'text-muted'
          }`}
        >
          {stateLabel}
        </span>
      </div>
      <div className="status-panel__body">{children}</div>
      {footer ? (
        <div className="border-t border-border px-4 py-3 md:px-5">{footer}</div>
      ) : null}
    </div>
  );
}

export function StatusSummary({
  endpoint,
  compact = false,
}: {
  endpoint?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<State>(
    endpoint ? { kind: 'loading' } : { kind: 'not-connected' },
  );

  useEffect(() => {
    if (!endpoint) return;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    fetch(endpoint, { signal: controller.signal, cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((payload: unknown) => {
        const result = validatePublicStatus(payload, Date.now());
        if (result.ok) {
          setState({ kind: 'ready', status: result.status });
        } else {
          setState({ kind: 'unavailable', reason: result.reason });
        }
      })
      .catch((error: unknown) => {
        setState({
          kind: 'unavailable',
          reason:
            error instanceof Error ? error.message : 'The status endpoint could not be read.',
        });
      })
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [endpoint]);

  if (state.kind === 'not-connected') {
    return (
      <Panel
        stateLabel="Not connected"
        footer={
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
              Data source: none
            </span>
            <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
              Last check: none
            </span>
          </div>
        }
      >
        <p className="text-[15px] font-medium leading-6">Monitoring is not connected yet.</p>
        <p className="mt-1.5 max-w-lg text-[13.5px] leading-6 text-muted">
          No live service status or uptime history is available on this page.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full border border-border-strong" aria-hidden="true" />
          <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
            No component is reported as operational
          </span>
        </div>
      </Panel>
    );
  }

  if (state.kind === 'loading') {
    return (
      <Panel stateLabel="Checking">
        <p className="text-[15px] font-medium leading-6">Reading status data…</p>
        <p className="mt-1.5 text-[13.5px] leading-6 text-muted">
          Until a valid response arrives, no component is reported as operational.
        </p>
      </Panel>
    );
  }

  if (state.kind === 'unavailable') {
    return (
      <Panel stateLabel="Data unavailable" tone="warning">
        <p className="text-[15px] font-medium leading-6">Status data is unavailable.</p>
        <p className="mt-1.5 text-[13.5px] leading-6 text-muted">
          No service is reported as operational. Last attempt: {state.reason}
        </p>
      </Panel>
    );
  }

  const { status } = state;

  if (status.components.length === 0) {
    return (
      <Panel stateLabel="No components">
        <p className="text-[15px] font-medium leading-6">No public components are published yet.</p>
        <p className="mt-1.5 text-[13.5px] leading-6 text-muted">
          The status endpoint is reachable, but it contains no component records.
        </p>
      </Panel>
    );
  }

  return (
    <Panel
      stateLabel="Connected"
      footer={
        !compact ? (
          <p className="text-[10.5px] leading-5 text-muted">
            A component marked Unknown has missing, stale or invalid data. It is not treated as
            operational. Availability percentages are not shown unless a complete, labelled window
            is published.
          </p>
        ) : undefined
      }
    >
      {!compact ? (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[13px] font-medium">Published components</p>
          <p className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
            Generated {formatTime(status.generatedAt)}
          </p>
        </div>
      ) : null}

      <ul className={`divide-y divide-border ${compact ? '' : 'mt-3 border-t border-border'}`}>
        {status.components.map((component) => (
          <li
            key={component.id}
            className="grid gap-1 py-3 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4"
          >
            <div>
              <p className="text-[13px] font-medium capitalize">{component.id}</p>
              <p className="mt-0.5 text-[10.5px] leading-5 text-muted">{component.coverageNote}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${HEALTH_CLASS[component.health]}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                {HEALTH_LABEL[component.health]}
              </span>
              <span className="mono text-[9px] text-muted">
                {component.checkedAt
                  ? `Checked ${formatTime(component.checkedAt)}`
                  : 'No check time'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function formatTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'invalid time'
    : `${date.toISOString().replace('T', ' ').slice(0, 19)} UTC`;
}
