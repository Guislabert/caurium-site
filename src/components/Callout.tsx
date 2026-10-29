import type { ReactNode } from 'react';

type Tone = 'note' | 'warning' | 'danger' | 'info';

const TONE_CLASSES: Record<Tone, string> = {
  note: 'border-border bg-paper',
  info: 'border-[#bcd7fb] bg-accent-soft',
  warning: 'border-[#e8cfae] bg-[#fdf6ec]',
  danger: 'border-[#efc9c9] bg-[#fdf1f1]',
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
      <div className="mt-1 text-[14px] leading-6 text-muted">{children}</div>
    </div>
  );
}
