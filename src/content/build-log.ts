import entries from './build-log.json';

export type BuildLogType = 'content' | 'docs' | 'design' | 'release';

export interface BuildLogEntry {
  date: string;
  type: BuildLogType;
  title: string;
  detail: string;
  href?: string;
  linkLabel?: string;
}

export const BUILD_LOG: BuildLogEntry[] = entries as BuildLogEntry[];

export const LATEST_BUILD = BUILD_LOG[0];
