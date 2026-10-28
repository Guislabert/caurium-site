import Link from 'next/link';

const LINKS = [
  { href: '/products/', label: 'Products' },
  { href: '/architecture/', label: 'Architecture' },
  { href: '/docs/', label: 'Documentation' },
  { href: '/status/', label: 'Status' },
] as const;

export default function NotFound() {
  return (
    <div className="container-page py-16 md:py-24">
      <p className="mono text-[9.5px] uppercase tracking-[0.1em] text-muted">Error / 404</p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr_auto] lg:items-end lg:gap-16">
        <div>
          <h1 className="h1 max-w-[16ch]">Page not found.</h1>
          <p className="lede mt-5 max-w-lg">
            The address you requested does not exist on this site. No product console or private
            route is hidden behind a different URL.
          </p>
        </div>
        <ul className="border-t border-border-strong">
          {LINKS.map((link) => (
            <li key={link.href} className="border-b border-border">
              <Link
                href={link.href}
                className="group flex items-center justify-between py-3 text-[13.5px] text-foreground"
              >
                {link.label}
                <span aria-hidden="true" className="text-muted transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <Link href="/" className="btn btn-primary">
          Return home
        </Link>
      </div>
    </div>
  );
}
