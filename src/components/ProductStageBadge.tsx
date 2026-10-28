import { STAGE_LABELS, type ProductStage } from '@/content/products';

export function ProductStageBadge({
  stage,
  className = '',
}: {
  stage: ProductStage;
  className?: string;
}) {
  return (
    <span className={`badge-stage ${className}`} data-stage={stage}>
      <span className="badge-dot" aria-hidden="true" />
      {STAGE_LABELS[stage]}
    </span>
  );
}
