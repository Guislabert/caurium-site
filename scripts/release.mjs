#!/usr/bin/env node
/**
 * Cuts a version tag on the current branch and records why.
 *
 *   pnpm release patch "Fix the placeholder contrast"
 *   pnpm release minor "Graphite visual system"
 *   pnpm release major "First public release"
 *
 * Two branches, two independent version lines:
 *   main -> v0.x.y        (the site the public sees)
 *   dev  -> dev-v0.x.y    (the preview, may move ahead independently)
 *
 * The tag message is the release note. It is the one place that answers "what
 * shipped at v0.3.0" without reading a hundred commits.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const [bump, ...noteParts] = process.argv.slice(2);
const BUMP_KINDS = ['major', 'minor', 'patch'];

if (!BUMP_KINDS.includes(bump)) {
  console.error(`Usage: pnpm release <${BUMP_KINDS.join('|')}> "<note>"`);
  process.exit(1);
}

const note = noteParts.join(' ').trim();
if (!note) {
  console.error('A release note is required: it becomes the tag message.');
  process.exit(1);
}

const git = (args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
if (branch !== 'main' && branch !== 'dev') {
  console.error(`Releases are cut on main or dev, not on ${branch}.`);
  process.exit(1);
}

const dirty = git(['status', '--porcelain']);
if (dirty) {
  console.error('Working tree is dirty. Commit or stash first.');
  process.exit(1);
}

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const [major, minor, patch] = pkg.version.split('.').map(Number);

const next =
  bump === 'major'
    ? `${major + 1}.0.0`
    : bump === 'minor'
      ? `${major}.${minor + 1}.0`
      : `${major}.${minor}.${patch + 1}`;

const prefix = branch === 'main' ? 'v' : 'dev-v';
const tag = `${prefix}${next}`;

if (git(['tag', '--list', tag])) {
  console.error(`Tag ${tag} already exists.`);
  process.exit(1);
}

pkg.version = next;
writeFileSync('package.json', `${JSON.stringify(pkg, null, 2)}\n`);

git(['add', 'package.json']);
git(['commit', '-m', `Release ${tag}: ${note}`]);
// Annotated, so the note travels with the tag instead of living only in the log.
git(['tag', '-a', tag, '-m', `${note}\n\nBranch: ${branch}\nCommit: ${git(['rev-parse', '--short', 'HEAD'])}`]);

console.log(`Tagged ${tag} on ${branch}.`);
console.log(`Push it:  git push origin ${branch} ${tag}`);
