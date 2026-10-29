import type { ProductRecord } from '@/content/products';
import { ProductGlyph } from '@/components/ProductGlyph';
import { ProductStageBadge } from '@/components/ProductStageBadge';
import { STAGE_LABELS } from '@/content/products';

function reviewedDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function ProductSpecPanel({
  product,
  figureNumber,
}: {
  product: ProductRecord;
  figureNumber: number;
}) {
  return (
    <aside className="figure corner-marks">
      <div className="figure__head">
        <p className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
          Fig. {String(figureNumber).padStart(2, '0')} — Module record
        </p>
        <ProductStageBadge stage={product.stage} />
      </div>

      <div className="figure__body">
        <div className="flex items-start justify-between gap-4">
          <ProductGlyph id={product.id} className="h-14 w-14 text-foreground" />
          <span className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
            {product.role}
          </span>
        </div>

        <dl className="mt-6 border-t border-border">
          <div className="flex items-center justify-between gap-4 border-b border-border py-2.5">
            <dt className="mono text-[11px] uppercase tracking-[0.06em] text-muted">Stage</dt>
            <dd className="text-[12px]">{STAGE_LABELS[product.stage]}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-border py-2.5">
            <dt className="mono text-[11px] uppercase tracking-[0.06em] text-muted">Surface</dt>
            <dd className="text-[12px] text-muted">None</dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-border py-2.5">
            <dt className="mono text-[11px] uppercase tracking-[0.06em] text-muted">Reviewed</dt>
            <dd className="text-[12px] text-muted">
              <time dateTime={product.reviewedAt}>{reviewedDate(product.reviewedAt)}</time>
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <p className="mono text-[11px] uppercase tracking-[0.06em] text-muted">Intended flow</p>
          <ol className="mt-3 border-l border-border-strong pl-4">
            {product.workflow.map((step, index) => (
              <li key={step.title} className="relative pb-3 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[21px] top-1.5 h-[7px] w-[7px] rounded-full border border-border-strong bg-paper"
                />
                <p className="mono text-[10.5px] uppercase tracking-[0.06em] text-muted">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-0.5 text-[12px] leading-4">{step.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="figure__foot">
        <p className="text-[11.5px] leading-5 text-muted">
          Illustrative record — not a live service.
        </p>
      </div>
    </aside>
  );
}
