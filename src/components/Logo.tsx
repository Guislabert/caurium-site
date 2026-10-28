export function CauriumMark({
  className = 'h-6 w-6',
  inverse = false,
  mono = false,
}: {
  className?: string;
  inverse?: boolean;
  mono?: boolean;
}) {
  const background = inverse ? '#F6F4EE' : '#0B1B3F';
  const arc = mono ? 'currentColor' : inverse ? '#0B1B3F' : '#F6F4EE';
  const dot = mono ? 'currentColor' : '#C9E265';

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="9"
        fill={mono ? 'none' : background}
        stroke={mono ? 'currentColor' : 'none'}
        strokeWidth={mono ? 1.5 : 0}
      />
      <path
        d="M21.4 9.9a8.2 8.2 0 1 0 0 12.2"
        stroke={arc}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="23.6" cy="16" r="2.2" fill={dot} />
    </svg>
  );
}

export function Logo({
  className = '',
  inverse = false,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <CauriumMark
        className="h-7 w-7 shrink-0"
        inverse={inverse}
      />
      <span
        className={`font-display text-[18px] font-semibold leading-none tracking-[-0.02em] ${
          inverse ? 'text-[#F6F4EE]' : 'text-ink'
        }`}
      >
        Caurium
      </span>
    </span>
  );
}
