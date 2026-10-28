import Link from 'next/link';
import { FOOTER_LINKS, SITE } from '@/content/site';
import { Logo } from '@/components/Logo';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-paper">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.25fr_1.75fr] md:gap-16">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">{SITE.tagline}</p>
            <p className="mt-6 max-w-sm border-l border-border-strong pl-3 text-xs leading-5 text-muted">
              {SITE.stageNote}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_LINKS.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className="eyebrow mb-3">{group.title}</p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-muted transition-colors hover:text-foreground"
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

        <div className="mt-12 border-t border-border pt-6">
          <div className="flex flex-col gap-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Caurium. All rights reserved.</p>
            <p className="mono text-[10px] uppercase tracking-[0.08em]">
              Static site · No account · No first-party tracking
            </p>
          </div>
          <p className="mt-4 max-w-2xl text-xs leading-5 text-muted">
            Product availability is listed per product. Nothing on this site is a live service
            unless a product page says so.
          </p>
        </div>
      </div>
    </footer>
  );
}
