export type Health = 'operational' | 'degraded' | 'outage' | 'maintenance' | 'unknown';

export interface PublicComponent {
  id: string;
  health: Health;
  checkedAt: string | null;
  publishedAt: string;
  sourceRegion: string | null;
  coverageNote: string;
}

export interface PublicStatus {
  schemaVersion: 1;
  generatedAt: string;
  components: PublicComponent[];
}

export const STALE_AFTER_MS = 180_000;
export const FUTURE_TOLERANCE_MS = 5 * 60_000;

export const PUBLIC_COMPONENT_IDS = ['website', 'gate', 'probe', 'guard', 'box'] as const;

const HEALTH_VALUES: Health[] = ['operational', 'degraded', 'outage', 'maintenance', 'unknown'];

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

/**
 * Accepts only the documented, sanitized contract. Anything malformed,
 * stale, from an unknown component or dated in the future becomes Unknown.
 */
export function validatePublicStatus(
  payload: unknown,
  now: number = Date.now(),
): { ok: true; status: PublicStatus } | { ok: false; reason: string } {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, reason: 'Response is not an object.' };
  }

  const value = payload as Partial<PublicStatus>;

  if (value.schemaVersion !== 1) {
    return { ok: false, reason: 'Unsupported schema version.' };
  }
  if (!isIsoDate(value.generatedAt)) {
    return { ok: false, reason: 'Missing or invalid generatedAt.' };
  }
  if (Date.parse(value.generatedAt) - now > FUTURE_TOLERANCE_MS) {
    return { ok: false, reason: 'generatedAt is in the future.' };
  }
  if (!Array.isArray(value.components)) {
    return { ok: false, reason: 'Missing components.' };
  }

  const components: PublicComponent[] = [];

  for (const raw of value.components) {
    if (!raw || typeof raw !== 'object') {
      return { ok: false, reason: 'Invalid component entry.' };
    }
    const component = raw as Partial<PublicComponent>;

    if (typeof component.id !== 'string' || !(PUBLIC_COMPONENT_IDS as readonly string[]).includes(component.id)) {
      return { ok: false, reason: 'Unknown component id.' };
    }
    if (typeof component.health !== 'string' || !HEALTH_VALUES.includes(component.health as Health)) {
      return { ok: false, reason: `Invalid health value for ${component.id}.` };
    }
    if (!isIsoDate(component.publishedAt)) {
      return { ok: false, reason: `Invalid publishedAt for ${component.id}.` };
    }
    if (component.checkedAt !== null && !isIsoDate(component.checkedAt)) {
      return { ok: false, reason: `Invalid checkedAt for ${component.id}.` };
    }
    if (component.sourceRegion !== null && typeof component.sourceRegion !== 'string') {
      return { ok: false, reason: `Invalid sourceRegion for ${component.id}.` };
    }
    if (typeof component.coverageNote !== 'string') {
      return { ok: false, reason: `Invalid coverageNote for ${component.id}.` };
    }

    const checkedAt = component.checkedAt as string | null;
    const stale = checkedAt === null || now - Date.parse(checkedAt) > STALE_AFTER_MS;
    const future = checkedAt !== null && Date.parse(checkedAt) - now > FUTURE_TOLERANCE_MS;

    components.push({
      id: component.id,
      health: stale || future ? 'unknown' : component.health,
      checkedAt,
      publishedAt: component.publishedAt,
      sourceRegion: component.sourceRegion,
      coverageNote: component.coverageNote,
    });
  }

  return {
    ok: true,
    status: {
      schemaVersion: 1,
      generatedAt: value.generatedAt,
      components,
    },
  };
}
