import type { FeatureStage, ScopeFeature } from '@/content/products';

const FEATURE_LABELS: Record<FeatureStage, string> = {
  planned: 'Planned',
  implemented: 'Implemented',
  verified: 'Verified',
};

const FEATURE_STAGE: Record<FeatureStage, string> = {
  planned: 'planned',
  implemented: 'in-development',
  verified: 'available',
};

export function CapabilityList({
  features,
  productName,
}: {
  features: ScopeFeature[];
  productName: string;
}) {
  return (
    <ul className="border-t border-border" aria-label={`${productName} capability scope`}>
      {features.map((feature, index) => (
        <li
          key={feature.id}
          className="grid gap-3 border-b border-border py-5 md:grid-cols-[42px_1fr_auto] md:gap-5"
        >
          <span className="mono pt-0.5 text-[10px] tracking-[0.1em] text-muted">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-[15px] font-medium leading-6">{feature.label}</h3>
            <p className="mt-1 max-w-2xl text-[13.5px] leading-6 text-muted">{feature.detail}</p>
          </div>
          <span
            className="badge-stage self-start"
            data-stage={FEATURE_STAGE[feature.stage]}
          >
            <span className="badge-dot" aria-hidden="true" />
            {FEATURE_LABELS[feature.stage]}
          </span>
        </li>
      ))}
    </ul>
  );
}
