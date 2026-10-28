function Node({
  title,
  detail,
  state = 'planned',
  accent = false,
}: {
  title: string;
  detail?: string;
  state?: 'current' | 'planned';
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-full border bg-background px-3 py-2.5 ${
        state === 'current'
          ? 'border-border-strong'
          : 'border-dashed border-border-strong'
      }`}
    >
      <p className="flex items-center gap-2 text-[12px] font-medium leading-4">
        {accent ? (
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        ) : null}
        {title}
      </p>
      {detail ? (
        <p className="mt-1 text-[10px] leading-4 text-muted">{detail}</p>
      ) : null}
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center py-1 text-border-strong" aria-hidden="true">
      <span className="h-4 w-px bg-border-strong" />
      <span className="-ml-px border-x-[3px] border-t-[5px] border-x-transparent border-t-border-strong" />
    </div>
  );
}

function DomainHeader({
  title,
  state,
  id,
}: {
  title: string;
  state: 'Current' | 'Planned';
  id: string;
}) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-border pb-3">
      <h3 id={id} className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
        {title}
      </h3>
      <span className="mono text-[8.5px] uppercase tracking-[0.1em] text-muted">{state}</span>
    </header>
  );
}

export function ArchitectureMap() {
  return (
    <figure>
      <div className="figure">
        <div className="figure__head">
          <p className="mono text-[9.5px] uppercase tracking-[0.12em] text-muted">
            Fig. 06 — Service boundaries
          </p>
          <div className="flex items-center gap-4 text-[10px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-[2px] border border-border-strong bg-background"
                aria-hidden="true"
              />
              Current
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-[2px] border border-dashed border-border-strong bg-background"
                aria-hidden="true"
              />
              Planned
            </span>
          </div>
        </div>

        <div className="figure__body grid-paper">
          <div className="grid gap-4 lg:grid-cols-3">
            <section
              aria-labelledby="arch-public"
              className="rounded-[16px] border border-border-strong bg-background p-4"
            >
              <DomainHeader id="arch-public" title="Public website domain" state="Current" />
              <div className="mt-4">
                <Node title="Visitors" state="current" />
                <Arrow />
                <Node
                  title="Caurium website"
                  detail="Cloudflare Pages, static HTML"
                  state="current"
                />
                <Arrow />
                <div className="grid grid-cols-2 gap-2">
                  <Node title="Docs & roadmap" detail="Static pages" state="current" />
                  <Node title="Sanitized status" detail="Read-only, optional" />
                </div>
              </div>
              <p className="mt-4 border-t border-border pt-3 text-[10.5px] leading-5 text-muted">
                No login, console, database or management route.
              </p>
            </section>

            <section
              aria-labelledby="arch-product"
              className="rounded-[16px] border border-dashed border-border-strong bg-background p-4"
            >
              <DomainHeader id="arch-product" title="Product domain" state="Planned" />
              <div className="mt-4">
                <Node title="Authorized callers" detail="Per-caller credentials" />
                <Arrow />
                <Node title="Gate" detail="Allow-listed upstream only" accent />
                <Arrow />
                <Node title="Allowed upstream" detail="Authorized by the operator" />
                <div className="my-4 border-t border-dashed border-border" />
                <Node title="Fixed endpoints" detail="Probe, operator-authorized only" accent />
                <Arrow />
                <Node title="Sanitized publisher" detail="No scan capability" />
                <div className="my-4 border-t border-dashed border-border" />
                <div className="grid grid-cols-2 gap-2">
                  <Node title="Guard" detail="Internal operations" accent />
                  <Node title="Box" detail="Invited instances" accent />
                </div>
              </div>
            </section>

            <section
              aria-labelledby="arch-management"
              className="rounded-[16px] border border-dashed border-border-strong bg-background p-4"
            >
              <DomainHeader id="arch-management" title="Management domain" state="Planned" />
              <div className="mt-4">
                <Node title="Administrators" detail="MFA, separated roles" />
                <Arrow />
                <Node title="Identity & access" detail="Independent session" />
                <Arrow />
                <Node title="Management panel" detail="Not on the public site" accent />
                <Arrow />
                <Node title="Internal assets" detail="No public route" />
              </div>
              <p className="mt-4 border-t border-border pt-3 text-[10.5px] leading-5 text-muted">
                The public website has no call path into this domain.
              </p>
            </section>
          </div>

          <div className="mt-4 flex flex-col gap-2 rounded-[16px] border border-dashed border-border-strong bg-background/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10.5px] leading-5 text-muted">
              <span className="mono uppercase tracking-[0.1em]">Outside this diagram:</span>{' '}
              separately operated networks. No topology, addresses, ports or credentials are
              published.
            </p>
            <p className="mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
              Public status is the only planned cross-domain output
            </p>
          </div>
        </div>

        <div className="figure__foot">
          <p className="text-[10.5px] leading-5 text-muted">
            Planned architecture — illustrative, not a deployed system. Solid boxes are current;
            dashed boxes are planned.
          </p>
        </div>
      </div>
      <figcaption className="figure-caption">
        Diagram of service boundaries. The public site explains the system; it does not operate it.
      </figcaption>
    </figure>
  );
}
