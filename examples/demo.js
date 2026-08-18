/**
 * @file demo.js
 * @description
 * Example usage demonstrations for the JavaScript Utility Functions Library.
 * Run with:  node examples/demo.js
 */

import {
  array,
  string,
  date,
  number,
} from '../src/index.js';

/** Small helper to pretty-print a labelled demo line. */
const show = (label, value) =>
  console.log(`  ${label.padEnd(34)} => ${JSON.stringify(value)}`);

console.log('\n===== ARRAY UTILITIES =====');
show('unique([1,2,2,3,3,3])', array.unique([1, 2, 2, 3, 3, 3]));
show('chunk([1,2,3,4,5], 2)', array.chunk([1, 2, 3, 4, 5], 2));
show('flatten([1,[2,[3,[4]]]])', array.flatten([1, [2, [3, [4]]]]));
show("groupBy([6.1,4.2,6.3], floor)", array.groupBy([6.1, 4.2, 6.3], Math.floor));
show('difference([1,2,3,4], [2,4])', array.difference([1, 2, 3, 4], [2, 4]));
show('sum([1,2,3])', array.sum([1, 2, 3]));
show("last([1,2,3])", array.last([1, 2, 3]));

console.log('\n===== STRING UTILITIES =====');
show("capitalize('hELLO')", string.capitalize('hELLO'));
show("titleCase('the quick fox')", string.titleCase('the quick fox'));
show("kebabCase('camelCaseText')", string.kebabCase('camelCaseText'));
show("camelCase('hello-world_x')", string.camelCase('hello-world_x'));
show("truncate('The quick brown', 9)", string.truncate('The quick brown', 9));
show("slugify('Héllo, World!')", string.slugify('Héllo, World!'));
show("escapeHtml('<b>A & B</b>')", string.escapeHtml('<b>A & B</b>'));
show("wordCount('  hi  there ')", string.wordCount('  hi  there '));

console.log('\n===== DATE UTILITIES =====');
show("formatDate('2026-08-18', pattern)", date.formatDate('2026-08-18T09:05:30', 'DD/MM/YYYY HH:mm'));
show("addDays('2026-08-18', 5)", date.formatDate(date.addDays('2026-08-18', 5)));
show("daysBetween('08-18','08-23')", date.daysBetween('2026-08-18', '2026-08-23'));
show('isLeapYear(2024)', date.isLeapYear(2024));
show("isSameDay(morning, evening)", date.isSameDay('2026-08-18T08:00', '2026-08-18T22:00'));
show("timeAgo('08-15', from '08-18')", date.timeAgo('2026-08-15', '2026-08-18'));

console.log('\n===== NUMBER UTILITIES =====');
show('formatCurrency(1234.5)', number.formatCurrency(1234.5));
show("formatCurrency(1234.5,'EUR','de-DE')", number.formatCurrency(1234.5, 'EUR', 'de-DE'));
show("formatCurrency(9999,'INR','en-IN')", number.formatCurrency(9999, 'INR', 'en-IN'));
show('formatNumber(1234567.891, 2)', number.formatNumber(1234567.891, 2));
show('clamp(15, 0, 10)', number.clamp(15, 0, 10));
show('round(3.14159, 2)', number.round(3.14159, 2));
show('formatPercent(0.4567, 1)', number.formatPercent(0.4567, 1));
show('formatBytes(1536)', number.formatBytes(1536));

console.log('\nAll demonstrations completed.\n');
