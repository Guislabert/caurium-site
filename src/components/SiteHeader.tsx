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
            <span className="h-1 w-1 rounded-full bg-border-strong" aria-hidden="true" />
            <span className="mono text-[9.5px] uppercase tracking-[0.12em] text-muted">
              Early development
            </span>
          </span>
        </div>

        <PrimaryNavigation />

        <div className="flex items-center gap-2">
          <Link
            href="/docs/"
            className="btn btn-secondary hidden h-10 min-h-10 px-4 text-[13px] md:inline-flex"
          >
            Read the docs
          </Link>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
