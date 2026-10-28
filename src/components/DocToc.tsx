export interface TocItem {
  id: string;
  label: string;
}

export function DocToc({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="On this page" className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
      <p className="eyebrow mb-3">On this page</p>
      <ul className="border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="toc-link -ml-px border-l border-transparent pl-3 hover:border-border-strong">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
