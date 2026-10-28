import Link from 'next/link';
import type { ProductRecord } from '@/content/products';
import { ProductGlyph } from '@/components/ProductGlyph';
import { ProductStageBadge } from '@/components/ProductStageBadge';

export function ProductCard({
  product,
  index,
}: {
  product: ProductRecord;
  index: number;
}) {
  return (
    <Link
      href={`/products/${product.slug}/`}
      className="product-card group"
      aria-label={`View ${product.name} — ${product.title}`}
    >
      <div className="product-card__body">
        <div className="flex items-start justify-between gap-4">
          <ProductGlyph id={product.id} className="h-11 w-11 text-foreground" />
          <ProductStageBadge stage={product.stage} />
        </div>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-[25px] font-medium leading-none tracking-[-0.03em]">
            {product.name}
          </h3>
          <span className="mono text-[9.5px] uppercase tracking-[0.12em] text-muted">
            {product.role}
          </span>
        </div>

        <p className="mt-4 text-[15.5px] font-medium leading-6">{product.title}</p>
        <p className="mt-2 text-[13.5px] leading-6 text-muted">{product.summary}</p>
        <p className="mt-4 text-[12.5px] leading-5 text-ink-2">
          <span className="mono mr-2 text-[8.5px] uppercase tracking-[0.12em] text-muted">For</span>
          {product.forLine}
        </p>

        <div className="mt-7 flex-1" />

        <div className="flex items-center justify-between gap-4 border-t border-border pt-3.5">
          <span className="mono text-[9px] uppercase tracking-[0.12em] text-muted">Boundary</span>
          <span className="text-right text-[11.5px] leading-5 text-muted">
            {product.boundaryTarget}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="link-arrow">
            View {product.name}
            <span aria-hidden="true">→</span>
          </span>
          <span className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
            Fig. {String(index + 2).padStart(2, '0')}
          </span>
        </div>
      </div>
    </Link>
  );
}
