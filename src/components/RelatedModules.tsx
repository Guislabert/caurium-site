import Link from 'next/link';
import { PRODUCTS, STAGE_LABELS } from '@/content/products';
import { ProductGlyph } from '@/components/ProductGlyph';

export function RelatedModules({ currentId }: { currentId: string }) {
  const related = PRODUCTS.filter((product) => product.id !== currentId);

  return (
    <ul className="grid gap-3 md:grid-cols-3">
      {related.map((product) => (
        <li key={product.id}>
          <Link
            href={`/products/${product.slug}/`}
            className="group flex h-full items-start justify-between gap-4 rounded-[10px] border border-border bg-background p-5 transition-colors hover:border-border-strong"
          >
            <span>
              <ProductGlyph id={product.id} className="h-8 w-8" />
              <span className="mt-4 block text-[15.5px] font-medium">{product.name}</span>
              <span className="mt-1 block text-[12px] leading-5 text-muted">
                {product.role} · {STAGE_LABELS[product.stage]}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="pt-1 text-muted transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
