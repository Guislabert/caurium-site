export interface Region {
  code: string;
  city: string;
  country: string;
  continent: string;
  status: 'live' | 'on-request';
  note: string;
}

export const regions: Region[] = [
  {
    code: 'eu-central',
    city: 'Frankfurt',
    country: 'Germany',
    continent: 'Europe',
    status: 'live',
    note: 'EU data residency and GDPR-friendly handling.',
  },
  {
    code: 'us-east',
    city: 'Virginia',
    country: 'United States',
    continent: 'North America',
    status: 'live',
    note: 'East-coast entry point for US and transatlantic traffic.',
  },
  {
    code: 'ap-southeast',
    city: 'Singapore',
    country: 'Singapore',
    continent: 'Asia Pacific',
    status: 'live',
    note: 'Southeast Asia and India-facing workloads.',
  },
  {
    code: 'ap-northeast',
    city: 'Tokyo',
    country: 'Japan',
    continent: 'Asia Pacific',
    status: 'live',
    note: 'Low-latency entry point for Japan and Korea.',
  },
  {
    code: 'ap-southeast-2',
    city: 'Sydney',
    country: 'Australia',
    continent: 'Oceania',
    status: 'live',
    note: 'Australia and New Zealand coverage.',
  },
  {
    code: 'on-request',
    city: 'Your region',
    country: 'On request',
    continent: 'Anywhere',
    status: 'on-request',
    note: 'New regions are assessed and delivered in 2–4 weeks.',
  },
];
