export function CauriumMark({
  className = 'h-6 w-6',
  inverse = false,
  mono = false,
}: {
  className?: string;
  inverse?: boolean;
  mono?: boolean;
}) {
  // Read the tokens instead of repeating the palette: the mark used to hard-code the
  // v1 navy and stayed behind when the site was reskinned.
  const background = inverse ? 'var(--paper)' : 'var(--ink)';
  const arc = mono ? 'currentColor' : inverse ? 'var(--ink)' : 'var(--paper)';
  const dot = mono ? 'currentColor' : 'var(--accent)';

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
        className={`wordmark text-[18px] leading-none ${inverse ? 'text-white' : 'text-ink'}`}
      >
        Caurium
      </span>
    </span>
  );
}
