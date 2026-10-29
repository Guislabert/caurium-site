#!/usr/bin/env node
/**
 * Checks that `main` and `dev` differ only in the visual layer.
 *
 * docs/branches.md states that the two long-lived branches may diverge in exactly
 * eight files. A rule in a document decays; this makes it fail.
 *
 * Run in CI on pull requests, and by hand before promoting anything:
 *   pnpm check:branches
 */
import { execFileSync } from 'node:child_process';

/** The complete set of files allowed to differ between main and dev. */
const VISUAL_LAYER = new Set([
  'src/app/globals.css',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/components/SiteHeader.tsx',
  'src/components/MobileNavigation.tsx',
  'src/content/site.ts',
  'package.json',
  'pnpm-lock.yaml',
]);

/** Files that must be byte-identical on both branches, listed for a louder error. */
const MUST_MATCH = [
  'docs/design-system.md',
  'docs/design-system-editorial.md',
  'docs/design-system-graphite.md',
  '.github/workflows/actions.yaml',
  'wrangler.jsonc',
  'wrangler.dev.jsonc',
];

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function refExists(ref) {
  try {
    git(['rev-parse', '--verify', '--quiet', ref]);
    return true;
  } catch {
    return false;
  }
}

if (!refExists('origin/main') || !refExists('origin/dev')) {
  // A fork without dev, or a shallow clone: nothing to compare, so this is not a
  // failure. The check exists to catch drift, not to require a branch layout.
  console.log('check:branches skipped: origin/main and origin/dev are both required.');
  process.exit(0);
}

const changed = git(['diff', '--name-only', 'origin/main..origin/dev'])
  .split('\n')
  .filter(Boolean);

const outside = changed.filter((file) => !VISUAL_LAYER.has(file));
const failures = [];

if (outside.length > 0) {
  failures.push(
    `files changed outside the visual layer:\n${outside.map((f) => `  ${f}`).join('\n')}`,
  );
}

const mustMatchDiff = git(['diff', '--name-only', 'origin/main..origin/dev', '--', ...MUST_MATCH])
  .split('\n')
  .filter(Boolean);

if (mustMatchDiff.length > 0) {
  failures.push(
    `shared files differ between branches:\n${mustMatchDiff.map((f) => `  ${f}`).join('\n')}`,
  );
}

if (failures.length > 0) {
  console.error('Branch divergence check failed.');
  for (const failure of failures) console.error(`\n${failure}`);
  console.error('\nSee docs/branches.md section 2. Sync the shared file onto both branches,');
  console.error('or add the file to VISUAL_LAYER in scripts/check-branches.mjs if the split');
  console.error('is deliberate and documented.');
  process.exit(1);
}

console.log(
  `Branch divergence OK: ${changed.length} file(s) differ, all in the visual layer.`,
);
