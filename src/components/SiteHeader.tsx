import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { MobileNavigation } from '@/components/MobileNavigation';
import { PrimaryNavigation } from '@/components/PrimaryNavigation';
import { NAV } from '@/content/site';

export function SiteHeader() {
  return (
    <>
      <div className="site-topbar">
        <div className="container-page site-topbar__inner">
          <span className="inline-flex items-center border border-white/35 px-1.5 py-0.5 text-[11.5px] tracking-[0.06em] text-white">
            New
          </span>
          <span className="text-white">Probe is in private preview</span>
          <span aria-hidden="true" className="hidden text-white/50 sm:inline">
            ·
          </span>
          <span className="hidden text-white/85 sm:inline">Free · By application · No SLA</span>
          <Link href="/access/" className="site-topbar__link ml-1">
            Apply
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <header className="site-header">
        <div className="container-page site-header__inner">
          <div className="flex items-center gap-5">
            <Link href="/" aria-label="Caurium home" className="shrink-0">
              <Logo inverse />
            </Link>
            <span className="hidden items-center gap-2 border-l border-white/20 pl-5 xl:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
              <span className="mono text-[11px] uppercase tracking-[0.06em] text-white/70">
                Probe private preview
              </span>
            </span>
          </div>

          <PrimaryNavigation />

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Link
                href="/access/"
                className="mono inline-flex h-9 shrink-0 items-center whitespace-nowrap bg-white px-3 text-[11.5px] uppercase tracking-[0.06em] text-ink transition-colors hover:bg-white/85 lg:px-4"
              >
                Apply for access
              </Link>
            </div>
            <MobileNavigation />
          </div>
        </div>

        {/* The menu button needs JavaScript. Without it, phone-width readers still
            get the primary navigation as a plain list under the header. */}
        <noscript>
          <nav aria-label="Primary" className="border-t border-white/15 md:hidden">
            <ul className="container-page flex flex-wrap gap-x-4 py-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="mono inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.06em] text-white/75"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </noscript>
      </header>
    </>
  );
}
