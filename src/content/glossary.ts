export interface GlossaryEntry {
  term: string;
  definition: string;
  href?: string;
  linkLabel?: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'Module',
    definition: 'One of Gate, Probe, Guard or Box. A module is a product line with one job and one boundary.',
    href: '/products/',
    linkLabel: 'Products',
  },
  {
    term: 'Stage',
    definition:
      'A lifecycle label backed by evidence, not a marketing tier. The six labels are defined in the stage dictionary.',
    href: '/docs/product-stages/',
    linkLabel: 'Product stages',
  },
  {
    term: 'Health',
    definition:
      'A runtime state such as Operational, Degraded or Unknown. Health is separate from the lifecycle stage.',
    href: '/status/',
    linkLabel: 'Status',
  },
  {
    term: 'Sanitized status',
    definition:
      'A public record containing an alias, coarse region, state and timestamps only. It excludes origin addresses, hostnames and raw errors.',
    href: '/docs/security/',
    linkLabel: 'Security boundaries',
  },
  {
    term: 'Allow-listed upstream',
    definition:
      'A specific API destination the operator has authorized Gate to reach. Callers cannot supply an arbitrary URL.',
    href: '/products/gate/',
    linkLabel: 'Gate',
  },
  {
    term: 'Evidence',
    definition:
      'A recorded check, test or measurement that supports a stage change. A passing build is not acceptance evidence.',
    href: '/trust/',
    linkLabel: 'Claims register',
  },
  {
    term: 'Unknown',
    definition:
      'The state shown when data is missing, stale, malformed or future-dated. Unknown is never treated as success.',
    href: '/status/',
    linkLabel: 'Status rules',
  },
  {
    term: 'Boundary',
    definition:
      'A documented limit on what a module can reach, who can call it, or what data it may expose.',
    href: '/architecture/',
    linkLabel: 'Architecture',
  },
  {
    term: 'Release criteria',
    definition:
      'The checks that must pass and be recorded before a module can move to a later stage.',
    href: '/docs/product-stages/',
    linkLabel: 'How a stage changes',
  },
];
