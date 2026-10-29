import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { PLANS } from '../src/content/plans';
import { PRODUCTS, STAGE_LABELS } from '../src/content/products';
import { SITE } from '../src/content/site';

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const sourceFiles = walk('src');
const sourceText = sourceFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
const productText = JSON.stringify(PRODUCTS);

test('every product has a unique id and slug', () => {
  assert.equal(new Set(PRODUCTS.map((p) => p.id)).size, PRODUCTS.length);
  assert.equal(new Set(PRODUCTS.map((p) => p.slug)).size, PRODUCTS.length);
});

test('only Probe is offered; Gate, Guard and Box remain Planned', () => {
  for (const product of PRODUCTS) {
    if (product.id === 'probe') {
      assert.equal(product.stage, 'private-preview');
      assert.ok(
        product.features.some((feature) => feature.stage === 'implemented'),
        'Probe must record its implemented capabilities',
      );
    } else {
      assert.equal(product.stage, 'planned', `${product.name} must remain Planned without evidence`);
      for (const feature of product.features) {
        assert.equal(feature.stage, 'planned', `${product.name}/${feature.id} must remain Planned`);
      }
    }
  }
  assert.equal(STAGE_LABELS.planned, 'Planned');
  assert.equal(STAGE_LABELS['private-preview'], 'Private preview');
});

test('every product answers audience, problem, workflow, limits and next step', () => {
  for (const product of PRODUCTS) {
    assert.ok(product.audience.length > 20, `${product.name} audience`);
    assert.ok(product.problem.length > 20, `${product.name} problem`);
    assert.ok(product.workflow.length >= 3, `${product.name} workflow`);
    assert.ok(product.features.length >= 5, `${product.name} scope`);
    assert.ok(product.boundaries.length >= 5, `${product.name} boundaries`);
    assert.ok(product.nextStep.label && product.nextStep.href, `${product.name} next step`);
  }
});

test('every product states release criteria, exclusions and a labelled example', () => {
  for (const product of PRODUCTS) {
    assert.ok(
      product.releaseCriteria.length >= 4,
      `${product.name} needs at least four release criteria`,
    );
    assert.ok(product.notThis.length >= 3, `${product.name} needs explicit exclusions`);
    assert.ok(product.boundaryTarget.length > 5, `${product.name} boundary target`);
    assert.ok(product.example.title && product.example.code, `${product.name} example`);

    const example = `${product.example.title} ${product.example.note}`;
    assert.match(
      example,
      /(illustrative|proposed|hypothetical)/i,
      `${product.name} example must be labelled as illustrative or proposed`,
    );

    if (product.example.language === 'bash' || product.example.language === 'json') {
      assert.equal(
        /https:\/\/(?!api\.example\.com)/.test(product.example.code),
        false,
        `${product.name} example must not contain a real hostname`,
      );
    }
  }
});

test('every product publishes a use case, design decisions, open questions and FAQ', () => {
  for (const product of PRODUCTS) {
    assert.ok(product.forLine.length > 20, `${product.name} use case`);

    assert.ok(
      product.designDecisions.length >= 3,
      `${product.name} needs at least three design decisions`,
    );
    for (const decision of product.designDecisions) {
      assert.ok(decision.title && decision.detail.length > 20, `${product.name} decision`);
    }

    assert.ok(
      product.openQuestions.length >= 4,
      `${product.name} needs at least four open questions`,
    );
    assert.ok(product.openQuestions.every((question) => question.endsWith('?')));

    assert.ok(product.faq.length >= 4, `${product.name} needs at least four FAQ entries`);
    for (const item of product.faq) {
      assert.ok(item.question.endsWith('?'), `${product.name} FAQ question`);
      assert.ok(item.answer.length > 20, `${product.name} FAQ answer`);
    }
  }
});

test('retired positioning is not reintroduced', () => {
  const retired = [
    'AI connectivity',
    'Infrastructure for a connected world',
    'Developer Infrastructure & AI',
    'Trusted by',
  ];

  for (const phrase of retired) {
    assert.equal(
      sourceText.toLowerCase().includes(phrase.toLowerCase()),
      false,
      `retired positioning present: ${phrase}`,
    );
  }
});

test('no contact address is published without a verified mailbox', () => {
  assert.equal(
    /[a-z0-9._%+-]+@caurium\.(tech|com)/i.test(sourceText),
    false,
    'contact address present',
  );
});

test('prices are published only for the Probe plans', () => {
  assert.deepEqual(
    PLANS.map((plan) => [plan.id, plan.price]),
    [
      ['starter', 19],
      ['team', 49],
      ['business', 99],
    ],
  );
  for (const plan of PLANS) {
    assert.ok(plan.endpoints > 0);
    assert.ok(plan.minIntervalSeconds >= 60);
    assert.ok(plan.retentionDays >= 7);
  }
  for (const product of PRODUCTS) {
    const text = JSON.stringify(product.boundaries) + JSON.stringify(product.faq);
    if (product.id === 'probe') {
      assert.match(text, /€19/);
    } else {
      assert.equal(/[€£]\s?\d/.test(text), false, `${product.name} must not publish a price`);
    }
  }
});

test('no unverified marketing claims or invented metrics', () => {
  const forbidden = [
    'enterprise-grade',
    'military-grade',
    'zero downtime',
    'unlimited',
    'Deploy globally in seconds',
    'Start building for free',
    'Connect every tool',
    '99.9%',
    '100% uptime',
    'SOC 2 certified',
    'ISO 27001 certified',
  ];

  for (const phrase of forbidden) {
    assert.equal(
      sourceText.toLowerCase().includes(phrase.toLowerCase()),
      false,
      `forbidden claim present: ${phrase}`,
    );
  }
});

test('no invented uptime percentage in product copy', () => {
  assert.equal(/uptime\s*(is|:)?\s*\d+(\.\d+)?%/i.test(productText), false);
});

test('no legacy brand, GitHub links or private node identifiers', () => {
  const forbidden = [
    'asterlyn',
    'Guislabert',
    'github.com',
    'net.caurium.tech',
    'us1.net',
    '198.51.100.',
    '203.0.113.',
    '192.0.2.',
  ];

  for (const phrase of forbidden) {
    assert.equal(
      sourceText.toLowerCase().includes(phrase.toLowerCase()),
      false,
      `forbidden identifier present: ${phrase}`,
    );
  }
});

test('no contact page while no verified contact channel exists', () => {
  assert.equal(SITE.contactEmail, null);
  assert.equal(existsSync('src/app/contact'), false);
});

test('no credentials or secret-shaped strings in source', () => {
  const patterns = [/sk-[A-Za-z0-9]{16,}/, /ghp_[A-Za-z0-9]{20,}/, /ibk_[A-Za-z0-9]{16,}/, /AKIA[0-9A-Z]{16}/];
  for (const pattern of patterns) {
    assert.equal(pattern.test(sourceText), false, `secret-shaped string: ${pattern}`);
  }
});

test('the sitemap lists every route and nothing else', () => {
  const declared = new Set(
    [...readFileSync('src/app/sitemap.ts', 'utf8').matchAll(/'(\/[a-z0-9/-]*\/)'/g)].map(
      (match) => match[1],
    ),
  );
  for (const product of PRODUCTS) declared.add(`/products/${product.slug}/`);

  declared.add('/');

  const routes = new Set<string>(['/']);
  for (const file of walk('src/app')) {
    if (!file.endsWith('/page.tsx')) continue;
    const route = file.replace('src/app', '').replace('/page.tsx', '');
    if (route.includes('[')) continue;
    routes.add(`${route.replace(/\/$/, '')}/`.replace(/^\/\//, '/'));
  }
  routes.delete('/start/received/');
  for (const product of PRODUCTS) routes.add(`/products/${product.slug}/`);

  assert.deepEqual([...declared].sort(), [...routes].sort());
});

test('every referenced Open Graph card exists and is scoped to one section', () => {
  // Cards are per section, not per page: the docs pages and the two legal notices
  // deliberately share one card each. A card must not cross section boundaries.
  const SECTION_OF: Record<string, string> = { privacy: 'legal', terms: 'legal' };
  function section(path: string): string {
    const top = path.replace('src/app/', '').split('/')[0];
    return SECTION_OF[top] ?? top;
  }

  const used = new Map<string, string>();
  for (const file of walk('src/app')) {
    if (!file.endsWith('.tsx')) continue;
    const text = readFileSync(file, 'utf8');
    for (const match of text.matchAll(/ogImage:\s*'(\/og\/[a-z-]+\.png)'/g)) {
      assert.ok(existsSync(`public${match[1]}`), `${file} references missing ${match[1]}`);
      const previous = used.get(match[1]);
      if (previous) {
        assert.equal(
          section(previous),
          section(file),
          `${match[1]} is reused across sections by ${previous} and ${file}`,
        );
      }
      used.set(match[1], file);
    }
  }
  assert.ok(used.size >= 10);
});

test('the pricing copy does not claim plans differ in check frequency', () => {
  const intervals = new Set(PLANS.map((plan) => plan.minIntervalSeconds));
  const pricing = readFileSync('src/app/pricing/page.tsx', 'utf8');
  if (intervals.size === 1) {
    assert.equal(
      /how often they are checked|interval differs|different interval/i.test(pricing),
      false,
      'every plan uses one interval, so the page must not claim intervals differ',
    );
  }
});

test('no page promises a response time while terms deny one', () => {
  const terms = readFileSync('src/app/terms/page.tsx', 'utf8');
  const deniesCommitment = /No SLA, uptime percentage, response-time guarantee/.test(terms);
  const promising = [
    ...sourceText.matchAll(/[^.\n]*\b(within \w+ (?:business|working) day|respond(?:s)? within|reply within)\b[^.\n]*/gi),
  ].map((match) => match[0].trim());

  if (deniesCommitment) {
    assert.deepEqual(promising, [], 'the terms deny a response-time commitment');
  }
});

test('the CSP allows the origin the application form posts to', () => {
  const headers = readFileSync('public/_headers', 'utf8');
  const startPage = readFileSync('src/app/start/page.tsx', 'utf8');
  const fallback = startPage.match(/caurium-probe\.[a-z.]+workers\.dev/)?.[0];
  assert.ok(fallback, 'the Probe Worker origin must be discoverable in src/app/start/page.tsx');

  const origin = new URL(`https://${fallback}`).origin;
  const connect = headers.match(/connect-src ([^;]+);/)?.[1] ?? '';
  const formAction = headers.match(/form-action ([^;]+);?/)?.[1] ?? '';

  assert.ok(connect.includes(origin), `connect-src must include ${origin}`);
  assert.ok(formAction.includes(origin), `form-action must include ${origin}`);
});

test('the asset worker redirects www to the apex before serving files', () => {
  const worker = readFileSync('src/worker.ts', 'utf8');
  const config = readFileSync('wrangler.jsonc', 'utf8');

  assert.match(worker, /startsWith\('www\.'\)/, 'the entry worker must recognise the www host');
  assert.match(worker, /,\s*301\)/, 'the redirect must be permanent');
  assert.match(config, /"main"/, 'wrangler.jsonc must name the entry worker');
  assert.match(
    config,
    /"run_worker_first":\s*true/,
    'assets would answer before the worker and skip the host check',
  );
  assert.match(config, /"binding":\s*"ASSETS"/, 'the worker needs the assets binding to fall through');
});
