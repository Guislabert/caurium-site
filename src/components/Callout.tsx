import type { ReactNode } from 'react';

type Tone = 'note' | 'warning' | 'danger' | 'info';

const TONE_CLASSES: Record<Tone, string> = {
  note: 'border-border bg-paper',
  info: 'border-[#c7d7f5] bg-accent-soft',
  warning: 'border-[#e8d3b6] bg-[#fffaf1]',
  danger: 'border-[#eccaca] bg-[#fff6f6]',
};

export function Callout({
  title,
  children,
  tone = 'note',
}: {
  title: string;
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <div className={`rounded-[10px] border p-4 md:p-5 ${TONE_CLASSES[tone]}`}>
      <p className="text-sm font-medium leading-6">{title}</p>
      <div className="mt-1 text-[13.5px] leading-6 text-muted">{children}</div>
    </div>
  );
}
