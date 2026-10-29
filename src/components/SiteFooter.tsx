import Link from 'next/link';
import { CONTACT, FOOTER_LINKS, SITE } from '@/content/site';

const CONTACT_LINKS = [
  { label: 'Security', address: CONTACT.security, note: 'vulnerability reports' },
  { label: 'Support', address: CONTACT.support, note: 'accounts and activation' },
  { label: 'Privacy', address: CONTACT.privacy, note: 'data requests' },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1.6fr] md:gap-16">
          <div>
            <p className="site-footer__word">Caurium</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">{SITE.tagline}</p>
            <p className="mt-6 max-w-sm border-l border-accent pl-3 text-xs leading-5 text-muted">
              {SITE.stageNote}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_LINKS.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className="eyebrow mb-4">{group.title}</p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-ink-2 transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <div className="flex flex-col gap-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Caurium. All rights reserved.</p>
            <p className="mono text-[10px] uppercase tracking-[0.1em]">
              Static site · Free preview · No first-party tracking
            </p>
          </div>
          <p className="mt-4 max-w-2xl text-xs leading-5 text-muted">
            Product availability is listed per product. Nothing on this site is a live service
            unless a product page says so.
          </p>
          <ul className="mt-5 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
            {CONTACT_LINKS.map((item) => (
              <li key={item.address}>
                <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
                  {item.label}
                </span>{' '}
                <a
                  href={`mailto:${item.address}`}
                  className="underline decoration-border-strong underline-offset-2 hover:text-accent"
                >
                  {item.address}
                </a>{' '}
                <span className="text-muted/80">— {item.note}</span>
              </li>
            ))}
          </ul>
          <p className="mono mt-3 text-[9px] uppercase tracking-[0.1em] text-muted">
            Content reviewed 29 Oct 2026 ·{' '}
            <Link href="/build-log/" className="underline decoration-border-strong underline-offset-2 hover:text-accent">
              Build log
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
