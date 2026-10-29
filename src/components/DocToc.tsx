'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
}

/**
 * The contents list marks the section the reader is in. Without it the list is
 * decoration: every item looked identical at every scroll position.
 */
export function DocToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (headings.length === 0) return;

    const update = () => {
      const line = window.innerHeight * 0.25;
      let current: string | null = headings[0].id;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= line) current = heading.id;
      }
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="hidden xl:sticky xl:top-[calc(var(--header)+var(--topbar)+16px)] xl:block xl:self-start"
    >
      <p className="eyebrow mb-3">On this page</p>
      <ul className="border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className="toc-link -ml-px border-l border-transparent hover:border-border-strong"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
