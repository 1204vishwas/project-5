/**
 * @file index.js
 * @module utils
 * @description
 * Entry point for the JavaScript Utility Functions Library.
 * Re-exports every helper from the array, string, date, and number modules,
 * and also exposes them grouped under namespaces for convenient access.
 *
 * @example
 * // Named imports
 * import { unique, capitalize, formatCurrency } from './src/index.js';
 *
 * @example
 * // Namespaced import
 * import utils from './src/index.js';
 * utils.array.unique([1, 1, 2]);
 * utils.number.formatCurrency(9.99);
 */

import * as array from './array.js';
import * as string from './string.js';
import * as date from './date.js';
import * as number from './number.js';

// Re-export every helper as a flat named export.
export * from './array.js';
export * from './string.js';
export * from './date.js';
export * from './number.js';

// Grouped namespaces.
export { array, string, date, number };

/**
 * Default export bundling all utility namespaces.
 * @type {{array: object, string: object, date: object, number: object}}
 */
export default { array, string, date, number };
