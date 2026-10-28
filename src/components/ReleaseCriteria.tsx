export function ReleaseCriteria({
  criteria,
  productName,
}: {
  criteria: string[];
  productName: string;
}) {
  return (
    <div>
      <ul className="border-t border-border-strong" aria-label={`${productName} release criteria`}>
        {criteria.map((criterion, index) => (
          <li
            key={criterion}
            className="grid grid-cols-[28px_1fr] gap-3 border-b border-border py-3.5"
          >
            <span
              aria-hidden="true"
              className="mt-1 h-3.5 w-3.5 border border-border-strong bg-background"
            />
            <span className="text-[13.5px] leading-6 text-ink-2">
              <span className="mono mr-2 text-[9px] text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              {criterion}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-5 text-muted">
        These are conditions to meet before the stage changes, not a schedule or a completed
        checklist. Each item requires recorded evidence.
      </p>
    </div>
  );
}
