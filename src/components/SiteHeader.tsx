import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { MobileNavigation } from '@/components/MobileNavigation';
import { PrimaryNavigation } from '@/components/PrimaryNavigation';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container-page site-header__inner">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Caurium home" className="shrink-0">
            <Logo />
          </Link>
          <span className="hidden items-center gap-2 border-l border-border pl-4 xl:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
            <span className="mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
              Probe private preview
            </span>
          </span>
        </div>

        <PrimaryNavigation />

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Link href="/access/" className="btn btn-primary btn-compact">
              Apply for access
            </Link>
          </div>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
