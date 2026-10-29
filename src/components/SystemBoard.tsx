import { CauriumMark } from '@/components/Logo';
import { ProductGlyph } from '@/components/ProductGlyph';
import { ProductStageBadge } from '@/components/ProductStageBadge';
import { PRODUCTS } from '@/content/products';

const DESTINATIONS: Record<string, string> = {
  gate: 'Allow-listed upstream',
  probe: 'Authorized endpoints',
  guard: 'Caurium operations',
  box: 'Invited projects',
};

export function SystemBoard() {
  return (
    <figure className="figure">
      <div className="figure__head">
        <p className="mono text-[11.5px] uppercase tracking-[0.06em] text-muted">
          Fig. 01 — Module map
        </p>
        <ProductStageBadge stage="private-preview" />
      </div>

      <div className="figure__body grid-paper">
        <div className="relative">
          <div className="flex items-center justify-between gap-4 pb-3">
            <span className="mono text-[11.5px] uppercase tracking-[0.06em] text-muted">
              Caurium modules
            </span>
            <span className="mono text-[11.5px] uppercase tracking-[0.06em] text-muted">
              Service boundary
            </span>
          </div>

          <div className="border-t border-border-strong">
            {PRODUCTS.map((product, index) => (
              <div
                key={product.id}
                className={`grid grid-cols-[104px_minmax(24px,1fr)_112px] items-center gap-2 py-3.5 sm:grid-cols-[122px_minmax(32px,1fr)_132px] sm:gap-3 ${
                  index < PRODUCTS.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ProductGlyph id={product.id} className="h-7 w-7 shrink-0" />
                  <div>
                    <p className="text-[13.5px] leading-4">{product.name}</p>
                    <p className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
                      {product.role}
                    </p>
                  </div>
                </div>

                <div className="relative h-px bg-border-strong" aria-hidden="true">
                  <span className="absolute -left-0.5 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full border border-border-strong bg-paper" />
                  <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-y-[3px] border-l-[5px] border-y-transparent border-l-border-strong" />
                </div>

                <p className="text-right text-[11.5px] leading-4 text-muted sm:text-[11.5px]">
                  {DESTINATIONS[product.id]}
                </p>
              </div>
            ))}
          </div>

          <CauriumMark
            className="pointer-events-none absolute -bottom-10 -right-8 h-36 w-36 text-border-strong opacity-[0.12]"
            mono
          />
        </div>
      </div>

      <div className="figure__foot flex flex-wrap items-center justify-between gap-2">
        <p className="text-[12px] leading-5 text-muted">
          Probe is live in private preview. The other three boxes are illustrative.
        </p>
        <p className="mono text-[11.5px] uppercase tracking-[0.06em] text-muted">Rev. 2026-10-29</p>
      </div>
    </figure>
  );
}
