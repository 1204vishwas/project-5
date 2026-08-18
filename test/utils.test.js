/**
 * @file utils.test.js
 * @description
 * Lightweight test suite using Node's built-in assert module — no
 * external dependencies. Run with:  node test/utils.test.js
 */

import assert from 'node:assert/strict';
import {
  unique, chunk, flatten, groupBy, difference, sum, last, shuffle,
} from '../src/array.js';
import {
  capitalize, titleCase, kebabCase, camelCase, truncate, reverse,
  slugify, escapeHtml, wordCount,
} from '../src/string.js';
import {
  formatDate, addDays, daysBetween, isLeapYear, isSameDay, timeAgo,
} from '../src/date.js';
import {
  formatCurrency, formatNumber, clamp, round, formatPercent,
  randomInt, formatBytes,
} from '../src/number.js';

let passed = 0;
let failed = 0;

/**
 * Registers and runs a single test case.
 * @param {string} name - Description of the test.
 * @param {function(): void} fn - Test body; should throw on failure.
 */
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ${name}\n      ${err.message}`);
  }
}

console.log('\n--- Array ---');
test('unique removes duplicates', () =>
  assert.deepEqual(unique([1, 1, 2, 3, 3]), [1, 2, 3]));
test('chunk splits with a smaller final chunk', () =>
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]));
test('chunk rejects size < 1', () =>
  assert.throws(() => chunk([1], 0), RangeError));
test('flatten fully flattens by default', () =>
  assert.deepEqual(flatten([1, [2, [3, [4]]]]), [1, 2, 3, 4]));
test('flatten respects depth', () =>
  assert.deepEqual(flatten([1, [2, [3]]], 1), [1, 2, [3]]));
test('groupBy groups by key function', () =>
  assert.deepEqual(groupBy([6.1, 4.2, 6.3], Math.floor), { 4: [4.2], 6: [6.1, 6.3] }));
test('difference excludes given values', () =>
  assert.deepEqual(difference([1, 2, 3, 4], [2, 4]), [1, 3]));
test('sum totals plain numbers', () =>
  assert.equal(sum([1, 2, 3]), 6));
test('sum supports a mapper', () =>
  assert.equal(sum([{ n: 2 }, { n: 3 }], (o) => o.n), 5));
test('last returns the final element', () =>
  assert.equal(last([1, 2, 3]), 3));
test('last returns fallback when empty', () =>
  assert.equal(last([], 'x'), 'x'));
test('shuffle preserves length and members', () => {
  const out = shuffle([1, 2, 3, 4, 5]);
  assert.equal(out.length, 5);
  assert.deepEqual([...out].sort(), [1, 2, 3, 4, 5]);
});
test('unique throws on non-array', () =>
  assert.throws(() => unique('nope'), TypeError));

console.log('\n--- String ---');
test('capitalize normalizes casing', () =>
  assert.equal(capitalize('hELLO'), 'Hello'));
test('titleCase capitalizes each word', () =>
  assert.equal(titleCase('the quick fox'), 'The Quick Fox'));
test('kebabCase handles camelCase', () =>
  assert.equal(kebabCase('camelCaseText'), 'camel-case-text'));
test('camelCase joins delimited words', () =>
  assert.equal(camelCase('hello-world_example'), 'helloWorldExample'));
test('truncate appends suffix', () =>
  assert.equal(truncate('The quick brown fox', 9), 'The quic…'));
test('truncate leaves short strings intact', () =>
  assert.equal(truncate('short', 20), 'short'));
test('reverse reverses characters', () =>
  assert.equal(reverse('hello'), 'olleh'));
test('slugify produces a clean slug', () =>
  assert.equal(slugify('Héllo, World!'), 'hello-world'));
test('escapeHtml escapes markup', () =>
  assert.equal(escapeHtml('<b>A & B</b>'), '&lt;b&gt;A &amp; B&lt;/b&gt;'));
test('wordCount counts words', () =>
  assert.equal(wordCount('  hi   there  '), 2));

console.log('\n--- Date ---');
test('formatDate applies the pattern', () =>
  assert.equal(formatDate('2026-08-18T09:05:30', 'DD/MM/YYYY HH:mm'), '18/08/2026 09:05'));
test('addDays offsets forward', () =>
  assert.equal(formatDate(addDays('2026-08-18', 5)), '2026-08-23'));
test('addDays offsets backward', () =>
  assert.equal(formatDate(addDays('2026-08-18', -3)), '2026-08-15'));
test('daysBetween counts days', () =>
  assert.equal(daysBetween('2026-08-18', '2026-08-23'), 5));
test('isLeapYear detects leap years', () => {
  assert.equal(isLeapYear(2024), true);
  assert.equal(isLeapYear(2100), false);
  assert.equal(isLeapYear(2000), true);
});
test('isSameDay ignores time of day', () =>
  assert.equal(isSameDay('2026-08-18T08:00', '2026-08-18T22:00'), true));
test('timeAgo describes the past', () =>
  assert.equal(timeAgo('2026-08-15', '2026-08-18'), '3 days ago'));
test('timeAgo describes the future', () =>
  assert.equal(timeAgo('2026-08-21', '2026-08-18'), 'in 3 days'));
test('formatDate throws on invalid date', () =>
  assert.throws(() => formatDate('not-a-date'), TypeError));

console.log('\n--- Number ---');
test('formatCurrency formats USD', () =>
  assert.equal(formatCurrency(1234.5), '$1,234.50'));
test('formatNumber groups thousands', () =>
  assert.equal(formatNumber(1234567.891, 2), '1,234,567.89'));
test('clamp bounds above', () =>
  assert.equal(clamp(15, 0, 10), 10));
test('clamp bounds below', () =>
  assert.equal(clamp(-3, 0, 10), 0));
test('clamp rejects min > max', () =>
  assert.throws(() => clamp(5, 10, 0), RangeError));
test('round rounds to decimals', () =>
  assert.equal(round(3.14159, 2), 3.14));
test('round handles float edge cases', () =>
  assert.equal(round(1.005, 2), 1.01));
test('formatPercent formats a fraction', () =>
  assert.equal(formatPercent(0.4567, 1), '45.7%'));
test('randomInt stays within range', () => {
  for (let i = 0; i < 100; i++) {
    const n = randomInt(1, 6);
    assert.ok(n >= 1 && n <= 6 && Number.isInteger(n));
  }
});
test('formatBytes scales units', () => {
  assert.equal(formatBytes(0), '0 B');
  assert.equal(formatBytes(1536), '1.5 KB');
  assert.equal(formatBytes(1048576), '1.0 MB');
});
test('formatCurrency throws on non-number', () =>
  assert.throws(() => formatCurrency('x'), TypeError));

console.log(`\n${'='.repeat(40)}`);
console.log(`  Passed: ${passed}   Failed: ${failed}`);
console.log('='.repeat(40));

if (failed > 0) process.exitCode = 1;
