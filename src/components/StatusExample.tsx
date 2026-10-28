const SAMPLE = [
  { name: 'Caurium website', detail: 'HTTPS · expected 200' },
  { name: 'Documentation', detail: 'HTTPS · expected 200' },
  { name: 'Probe API', detail: 'Health endpoint · expected 200' },
] as const;

/**
 * A drawing of the connected feed, not a feed. It exists so the status page
 * shows the shape of the panel instead of an empty box, and it is labelled
 * twice so no reader can mistake it for a recorded check.
 */
export function StatusExample() {
  return (
    <div
      className="status-panel mt-4"
      aria-label="Example status rendering. Sample data, not live checks."
    >
      <div className="status-panel__head">
        <p className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
          Example status · Schema v1
        </p>
        <span className="mono text-[8.5px] uppercase tracking-[0.1em] text-warning">
          Sample · not live
        </span>
      </div>
      <div className="status-panel__body">
        <p className="text-[13px] font-medium leading-5">What a connected feed looks like.</p>
        <p className="mt-1 max-w-lg text-[11.5px] leading-5 text-muted">
          Layout example only. These rows are drawn from no check; the states are part of the
          drawing and were not measured.
        </p>

        <ul className="mt-3 divide-y divide-border border-t border-border">
          {SAMPLE.map((item) => (
            <li
              key={item.name}
              className="grid gap-1 py-2.5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4"
            >
              <div>
                <p className="text-[12.5px] font-medium">{item.name}</p>
                <p className="mt-0.5 text-[10px] leading-4 text-muted">{item.detail}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                  Operational
                </span>
                <span className="mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
                  sample
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border px-4 py-3 md:px-5">
        <p className="text-[10.5px] leading-5 text-muted">
          Sample data for layout only. The live feed is not connected; these states are not a claim
          about any component.
        </p>
      </div>
    </div>
  );
}
