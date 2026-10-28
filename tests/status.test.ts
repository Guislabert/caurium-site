import assert from 'node:assert/strict';
import test from 'node:test';
import { validatePublicStatus, STALE_AFTER_MS } from '../src/lib/status';

const now = Date.parse('2026-10-28T12:00:00Z');

type Component = {
  id: string;
  health: string;
  checkedAt: string | null;
  publishedAt: string;
  sourceRegion: string | null;
  coverageNote: string;
};

type Payload = {
  schemaVersion: number;
  generatedAt: string;
  components: Component[] | string;
};

function payload(overrides: Record<string, unknown> = {}): Payload {
  return {
    schemaVersion: 1,
    generatedAt: new Date(now - 5_000).toISOString(),
    components: [
      {
        id: 'website',
        health: 'operational',
        checkedAt: new Date(now - 10_000).toISOString(),
        publishedAt: new Date(now - 5_000).toISOString(),
        sourceRegion: 'eu-west',
        coverageNote: 'HTTPS check, 60 second interval.',
      },
    ],
    ...overrides,
  };
}

test('accepts a fresh, valid payload', () => {
  const result = validatePublicStatus(payload(), now);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.status.components[0].health, 'operational');
  }
});

test('downgrades stale checkedAt to Unknown', () => {
  const data = payload();
  (data.components as Component[])[0].checkedAt = new Date(now - STALE_AFTER_MS - 1_000).toISOString();
  const result = validatePublicStatus(data, now);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.status.components[0].health, 'unknown');
});

test('downgrades a future checkedAt to Unknown', () => {
  const data = payload();
  (data.components as Component[])[0].checkedAt = new Date(now + 10 * 60_000).toISOString();
  const result = validatePublicStatus(data, now);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.status.components[0].health, 'unknown');
});

test('rejects a future generatedAt', () => {
  const result = validatePublicStatus(payload({ generatedAt: new Date(now + 60 * 60_000).toISOString() }), now);
  assert.equal(result.ok, false);
});

test('rejects an unsupported schema', () => {
  const result = validatePublicStatus(payload({ schemaVersion: 2 }), now);
  assert.equal(result.ok, false);
});

test('rejects unknown components and invalid health values', () => {
  assert.equal(validatePublicStatus(payload({ components: [{ ...(payload().components as Component[])[0], id: 'console' }] }), now).ok, false);
  assert.equal(validatePublicStatus(payload({ components: [{ ...(payload().components as Component[])[0], health: 'green' }] }), now).ok, false);
});

test('rejects malformed JSON shapes', () => {
  assert.equal(validatePublicStatus(null, now).ok, false);
  assert.equal(validatePublicStatus({}, now).ok, false);
  assert.equal(validatePublicStatus(payload({ components: 'none' }), now).ok, false);
});

test('null checkedAt is Unknown, not operational', () => {
  const data = payload();
  (data.components as Component[])[0].checkedAt = null;
  const result = validatePublicStatus(data, now);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.status.components[0].health, 'unknown');
});
