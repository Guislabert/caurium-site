import type { ReactNode } from 'react';

export function SectionHeading({
  index,
  title,
  intro,
  id,
  align = 'bottom',
}: {
  index: string;
  title: string;
  intro?: ReactNode;
  id?: string;
  align?: 'bottom' | 'center';
}) {
  return (
    <div
      className={`flex flex-wrap gap-6 ${
        align === 'bottom' ? 'items-end justify-between' : 'flex-col items-start'
      }`}
    >
      <div>
        <p className="section-index">{index}</p>
        <h2 id={id} className="h2 mt-4 max-w-[20ch]">
          {title}
        </h2>
      </div>
      {intro ? (
        <div className="max-w-sm text-[14px] leading-6 text-muted md:pb-1">{intro}</div>
      ) : null}
    </div>
  );
}
