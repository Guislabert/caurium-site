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
