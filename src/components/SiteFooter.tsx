import Link from 'next/link';
import { Logo } from '@/components/Logo';
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
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[14px] leading-6 text-muted">{SITE.tagline}</p>
            <p className="mono mt-6 max-w-sm border-l border-accent pl-3 text-[12px] leading-5 text-muted">
              {SITE.stageNote}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {FOOTER_LINKS.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className="eyebrow mb-4">{group.title}</p>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-ink-2 transition-colors hover:text-accent-ink"
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
          <div className="flex flex-col gap-3 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Caurium. All rights reserved.</p>
            <p className="mono text-[11px] uppercase tracking-[0.06em]">
              Static site · Free preview · No first-party tracking
            </p>
          </div>
          <p className="note mt-4 text-[13px] leading-5 text-muted">
            Product availability is listed per product. Nothing on this site is a live service
            unless a product page says so.
          </p>
          <ul className="mt-5 flex flex-col gap-2 text-[13px] text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
            {CONTACT_LINKS.map((item) => (
              <li key={item.address}>
                <span className="mono text-[11px] uppercase tracking-[0.06em] text-muted">
                  {item.label}
                </span>{' '}
                <a
                  href={`mailto:${item.address}`}
                  className="underline decoration-border-strong underline-offset-2 hover:text-accent-ink"
                >
                  {item.address}
                </a>{' '}
                <span className="text-muted">— {item.note}</span>
              </li>
            ))}
          </ul>
          <p className="mono mt-3 text-[11px] uppercase tracking-[0.06em] text-muted">
            Content reviewed 29 Oct 2026 ·{' '}
            <Link
              href="/build-log/"
              className="underline decoration-border-strong underline-offset-2 hover:text-accent-ink"
            >
              Build log
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
