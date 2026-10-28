const NODES = [
  { cx: 22.43, cy: 23.66 },
  { cx: 9.57, cy: 23.66 },
  { cx: 7.34, cy: 11 },
  { cx: 22.43, cy: 8.34 },
] as const;

export function CauriumMark({
  className = 'h-6 w-6',
  inverse = false,
  mono = false,
}: {
  className?: string;
  inverse?: boolean;
  mono?: boolean;
}) {
  const accent = mono ? 'currentColor' : inverse ? '#8FB0FF' : '#1d4ed8';

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.43 23.66A10 10 0 0 1 9.57 23.66A10 10 0 0 1 7.34 11A10 10 0 0 1 22.43 8.34"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {NODES.map((node, index) => (
        <circle
          key={`${node.cx}-${node.cy}`}
          cx={node.cx}
          cy={node.cy}
          r="1.9"
          fill={index === 0 ? accent : 'currentColor'}
        />
      ))}
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
        className={`h-[25px] w-[25px] ${inverse ? 'text-[#f4f3ee]' : 'text-foreground'}`}
        inverse={inverse}
      />
      <span
        className={`text-[15.5px] font-semibold tracking-[-0.015em] ${
          inverse ? 'text-[#f4f3ee]' : 'text-foreground'
        }`}
      >
        Caurium
      </span>
    </span>
  );
}
