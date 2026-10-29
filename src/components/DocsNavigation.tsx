import Link from 'next/link';

export const DOC_NAV = [
  { href: '/docs/', label: 'Documentation', short: 'Index' },
  { href: '/docs/overview/', label: 'System overview', short: 'Overview' },
  { href: '/docs/product-stages/', label: 'Product stages', short: 'Stages' },
  { href: '/docs/security/', label: 'Security boundaries', short: 'Security' },
  { href: '/docs/faq/', label: 'FAQ', short: 'FAQ' },
  { href: '/docs/glossary/', label: 'Glossary', short: 'Glossary' },
] as const;

export function DocsNavigation({ current }: { current: string }) {
  return (
    <nav aria-label="Documentation" className="min-w-0 max-w-full lg:sticky lg:top-[calc(var(--header)+var(--topbar)+16px)] lg:self-start">
      <p className="eyebrow mb-3">Docs</p>
      <ul className="docs-nav-list max-w-full border-l border-border">
        {DOC_NAV.map((item) => {
          const active = current === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className="docs-nav-link"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 hidden rounded-[10px] border border-border bg-paper p-3 lg:block">
        <p className="mono text-[11px] uppercase tracking-[0.06em] text-muted">Current state</p>
        <p className="mt-1.5 text-[12px] leading-5 text-muted">
          Probe is in private preview. Gate, Guard and Box are planned.
        </p>
      </div>
    </nav>
  );
}
