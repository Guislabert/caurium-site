import type { Boundary } from '@/content/products';

export function BoundaryTable({
  boundaries,
  productName,
}: {
  boundaries: Boundary[];
  productName: string;
}) {
  return (
    <dl className="border-t border-border-strong" aria-label={`${productName} limits and boundaries`}>
      {boundaries.map((boundary) => (
        <div
          key={boundary.label}
          className="grid gap-1.5 border-b border-border py-4 md:grid-cols-[170px_1fr] md:gap-8"
        >
          <dt className="mono text-[11px] uppercase tracking-[0.06em] text-muted md:pt-1">
            {boundary.label}
          </dt>
          <dd className="text-[14px] leading-6 text-ink-2">{boundary.value}</dd>
        </div>
      ))}
    </dl>
  );
}
