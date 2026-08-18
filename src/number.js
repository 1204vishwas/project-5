/**
 * @file number.js
 * @module utils/number
 * @description Reusable number and currency formatting utilities.
 */

/**
 * Formats a number as a currency string using Intl.NumberFormat.
 *
 * @param {number} amount - The numeric amount.
 * @param {string} [currency='USD'] - An ISO 4217 currency code.
 * @param {string} [locale='en-US'] - A BCP 47 locale tag.
 * @returns {string} The formatted currency string.
 * @throws {TypeError} If `amount` is not a finite number.
 *
 * @example
 * formatCurrency(1234.5);                 // => '$1,234.50'
 * formatCurrency(1234.5, 'EUR', 'de-DE'); // => '1.234,50 €'
 * formatCurrency(9999, 'INR', 'en-IN');   // => '₹9,999.00'
 */
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    throw new TypeError('formatCurrency: expected a finite number');
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Formats a number with grouped thousands and fixed decimals.
 *
 * @param {number} value - The number to format.
 * @param {number} [decimals=0] - Number of decimal places.
 * @param {string} [locale='en-US'] - A BCP 47 locale tag.
 * @returns {string} The formatted number string.
 * @throws {TypeError} If `value` is not a finite number.
 *
 * @example
 * formatNumber(1234567.891, 2); // => '1,234,567.89'
 */
export function formatNumber(value, decimals = 0, locale = 'en-US') {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError('formatNumber: expected a finite number');
  }
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Clamps a number between a minimum and maximum bound (inclusive).
 *
 * @param {number} value - The number to clamp.
 * @param {number} min - The lower bound.
 * @param {number} max - The upper bound.
 * @returns {number} The clamped value.
 * @throws {TypeError} If any argument is not a finite number.
 * @throws {RangeError} If `min` is greater than `max`.
 *
 * @example
 * clamp(15, 0, 10); // => 10
 * clamp(-3, 0, 10); // => 0
 */
export function clamp(value, min, max) {
  if (![value, min, max].every((n) => typeof n === 'number' && Number.isFinite(n))) {
    throw new TypeError('clamp: expected finite numbers');
  }
  if (min > max) {
    throw new RangeError('clamp: min cannot be greater than max');
  }
  return Math.min(Math.max(value, min), max);
}

/**
 * Rounds a number to a fixed number of decimal places.
 *
 * @param {number} value - The number to round.
 * @param {number} [decimals=2] - Number of decimal places.
 * @returns {number} The rounded number.
 * @throws {TypeError} If `value` is not a finite number.
 * @throws {RangeError} If `decimals` is not a non-negative integer.
 *
 * @example
 * round(3.14159, 2); // => 3.14
 */
export function round(value, decimals = 2) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError('round: expected a finite number');
  }
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new RangeError('round: decimals must be a non-negative integer');
  }
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Formats a fraction as a percentage string.
 *
 * @param {number} value - The fraction (e.g. 0.25 for 25%).
 * @param {number} [decimals=0] - Decimal places to display.
 * @returns {string} The formatted percentage string.
 * @throws {TypeError} If `value` is not a finite number.
 *
 * @example
 * formatPercent(0.4567, 1); // => '45.7%'
 */
export function formatPercent(value, decimals = 0) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError('formatPercent: expected a finite number');
  }
  return `${round(value * 100, decimals).toFixed(decimals)}%`;
}

/**
 * Returns a random integer between min and max (both inclusive).
 *
 * @param {number} min - The lower bound (inclusive).
 * @param {number} max - The upper bound (inclusive).
 * @returns {number} A random integer in [min, max].
 * @throws {TypeError} If `min` or `max` is not an integer.
 * @throws {RangeError} If `min` is greater than `max`.
 *
 * @example
 * randomInt(1, 6); // => e.g. 4
 */
export function randomInt(min, max) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError('randomInt: expected integer bounds');
  }
  if (min > max) {
    throw new RangeError('randomInt: min cannot be greater than max');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Converts a byte count into a human-readable file size.
 *
 * @param {number} bytes - The number of bytes.
 * @param {number} [decimals=1] - Decimal places in the result.
 * @returns {string} A readable size, e.g. '1.5 KB'.
 * @throws {TypeError} If `bytes` is not a finite number.
 * @throws {RangeError} If `bytes` is negative.
 *
 * @example
 * formatBytes(1536);    // => '1.5 KB'
 * formatBytes(1048576); // => '1.0 MB'
 */
export function formatBytes(bytes, decimals = 1) {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes)) {
    throw new TypeError('formatBytes: expected a finite number');
  }
  if (bytes < 0) {
    throw new RangeError('formatBytes: bytes cannot be negative');
  }
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / 1024 ** i;
  return `${value.toFixed(decimals)} ${units[i]}`;
}
