'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAV } from '@/content/site';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  if (href === '/products/') return pathname.startsWith('/products');
  if (href === '/docs/') return pathname.startsWith('/docs');
  return pathname === href || pathname.startsWith(`${href}`);
}

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);


  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-background text-foreground"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          ) : (
            <path d="M4 8h16M4 16h16" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-navigation"
          ref={panelRef}
          className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-var(--header))] overflow-y-auto border-t border-border bg-background"
        >
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="border-t border-border">
              {NAV.map((item, index) => (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    className="flex min-h-16 items-center justify-between gap-4 py-4"
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span>
                      <span className="flex items-baseline gap-3">
                        <span className="mono text-[10px] tracking-[0.12em] text-muted">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[17px] font-medium">{item.label}</span>
                      </span>
                      <span className="mt-1 block pl-8 text-xs leading-5 text-muted">
                        {item.description}
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-muted">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                href="/docs/"
                className="btn btn-primary w-full"
                onClick={() => setOpen(false)}
              >
                Read the docs
              </Link>
            </div>

            <p className="mt-6 border-t border-border pt-4 text-xs leading-5 text-muted">
              Caurium is in early development. Planned features are not available for use.
            </p>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
