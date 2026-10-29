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
        className="mono inline-flex h-9 items-center gap-2 border border-white/30 px-3 text-[11.5px] uppercase tracking-[0.06em] text-white"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
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
        Menu
      </button>

      {open ? (
        <div
          id="mobile-navigation"
          ref={panelRef}
          className="mobile-nav-panel absolute inset-x-0 top-full z-40 h-[calc(100dvh-var(--header))] overflow-y-auto border-t border-white/15"
        >
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="border-t border-white/15">
              {NAV.map((item, index) => (
                <li key={item.href} className="border-b border-white/15">
                  <Link
                    href={item.href}
                    className="mobile-nav-link flex min-h-16 items-center justify-between gap-4 py-4"
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span>
                      <span className="flex items-baseline gap-3">
                        <span className="mono text-[11.5px] text-white/45">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[17px]">{item.label}</span>
                      </span>
                      <span className="mt-1 block pl-8 text-[13.5px] leading-5 text-white/55">
                        {item.description}
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-white/50">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                href="/access/"
                className="mono flex h-12 w-full items-center justify-center bg-white text-[13px] uppercase tracking-[0.06em] text-ink"
                onClick={() => setOpen(false)}
              >
                Apply for access
              </Link>
            </div>

            <p className="mt-6 border-t border-white/15 pt-4 text-[13.5px] leading-5 text-white/55">
              Probe is in private preview. Gate, Guard and Box are planned.
            </p>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
