export interface Region {
  code: string;
  name: string;
  continent: string;
  status: 'live' | 'on-request';
  note: string;
}

export const regions: Region[] = [
  {
    code: 'de',
    name: 'Germany',
    continent: 'Europe',
    status: 'live',
    note: 'EU data residency and GDPR-friendly handling.',
  },
  {
    code: 'us',
    name: 'United States',
    continent: 'North America',
    status: 'live',
    note: 'Entry point for US and transatlantic traffic.',
  },
  {
    code: 'sg',
    name: 'Singapore',
    continent: 'Asia Pacific',
    status: 'live',
    note: 'Southeast Asia and India-facing workloads.',
  },
  {
    code: 'jp',
    name: 'Japan',
    continent: 'Asia Pacific',
    status: 'live',
    note: 'Low-latency entry point for Japan and Korea.',
  },
  {
    code: 'au',
    name: 'Australia',
    continent: 'Oceania',
    status: 'live',
    note: 'Australia and New Zealand coverage.',
  },
  {
    code: 'on-request',
    name: 'Your region',
    continent: 'On request',
    status: 'on-request',
    note: 'New regions are assessed and delivered in 2–4 weeks.',
  },
];
