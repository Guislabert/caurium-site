/**
 * Build-time settings.
 *
 * Every route is prerendered, so these values are read while the site is built and
 * never at request time. Reading `process.env` directly (rather than through the
 * Vite-only `import.meta.env`) keeps the same accessor working inside the Node
 * scripts that build the feed, the llms.txt file and the brand assets.
 *
 * Nothing here is a secret: every value ends up in the built HTML.
 */
export type PublicEnvKey =
  | 'PUBLIC_SITE_URL'
  | 'PUBLIC_SITE_ENV'
  | 'PUBLIC_STATUS_URL'
  | 'PUBLIC_PROBE_URL';

export function publicEnv(key: PublicEnvKey): string | undefined {
  const value = process.env[key];
  return value === '' ? undefined : value;
}
