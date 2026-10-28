'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/content/site';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  if (href === '/products/') return pathname.startsWith('/products');
  if (href === '/docs/') return pathname.startsWith('/docs');
  return pathname === href || pathname.startsWith(`${href}`);
}

export function PrimaryNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {NAV.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="nav-link"
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
