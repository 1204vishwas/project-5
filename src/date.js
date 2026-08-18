/**
 * @file date.js
 * @module utils/date
 * @description Reusable date helper methods.
 */

/** @constant {number} Milliseconds in one day. */
const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Coerces a value into a valid Date object.
 *
 * @private
 * @param {Date|string|number} value - The value to coerce.
 * @param {string} label - Caller name, used in error messages.
 * @returns {Date} A valid Date.
 * @throws {TypeError} If the value cannot be turned into a valid Date.
 */
function toDate(value, label) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new TypeError(`${label}: invalid date`);
  }
  return date;
}

/**
 * Formats a date using simple tokens: YYYY, MM, DD, HH, mm, ss.
 *
 * @param {Date|string|number} date - The date to format.
 * @param {string} [pattern='YYYY-MM-DD'] - The token pattern.
 * @returns {string} The formatted date string.
 * @throws {TypeError} If `date` is invalid.
 *
 * @example
 * formatDate('2026-08-18T09:05:30', 'DD/MM/YYYY HH:mm');
 * // => '18/08/2026 09:05'
 */
export function formatDate(date, pattern = 'YYYY-MM-DD') {
  const d = toDate(date, 'formatDate');
  const pad = (n) => String(n).padStart(2, '0');
  const tokens = {
    YYYY: d.getFullYear(),
    MM: pad(d.getMonth() + 1),
    DD: pad(d.getDate()),
    HH: pad(d.getHours()),
    mm: pad(d.getMinutes()),
    ss: pad(d.getSeconds()),
  };
  return pattern.replace(/YYYY|MM|DD|HH|mm|ss/g, (t) => tokens[t]);
}

/**
 * Adds (or subtracts, with a negative value) days to a date.
 *
 * @param {Date|string|number} date - The starting date.
 * @param {number} days - Number of days to add (may be negative).
 * @returns {Date} A new Date offset by the given days.
 * @throws {TypeError} If `date` is invalid.
 * @throws {RangeError} If `days` is not a finite number.
 *
 * @example
 * addDays('2026-08-18', 5); // => Date for 2026-08-23
 */
export function addDays(date, days) {
  const d = toDate(date, 'addDays');
  if (!Number.isFinite(days)) {
    throw new RangeError('addDays: days must be a finite number');
  }
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Returns the whole number of days between two dates (b - a).
 *
 * @param {Date|string|number} a - The first date.
 * @param {Date|string|number} b - The second date.
 * @returns {number} Day difference (positive if `b` is later than `a`).
 * @throws {TypeError} If either date is invalid.
 *
 * @example
 * daysBetween('2026-08-18', '2026-08-23'); // => 5
 */
export function daysBetween(a, b) {
  const start = toDate(a, 'daysBetween');
  const end = toDate(b, 'daysBetween');
  const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((utcEnd - utcStart) / MS_PER_DAY);
}

/**
 * Determines whether a year is a leap year.
 *
 * @param {number} year - A four-digit year.
 * @returns {boolean} True if the year is a leap year.
 * @throws {TypeError} If `year` is not an integer.
 *
 * @example
 * isLeapYear(2024); // => true
 * isLeapYear(2100); // => false
 */
export function isLeapYear(year) {
  if (!Number.isInteger(year)) {
    throw new TypeError('isLeapYear: expected an integer year');
  }
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Checks whether two dates fall on the same calendar day.
 *
 * @param {Date|string|number} a - The first date.
 * @param {Date|string|number} b - The second date.
 * @returns {boolean} True if both dates share the same year, month, and day.
 * @throws {TypeError} If either date is invalid.
 *
 * @example
 * isSameDay('2026-08-18T08:00', '2026-08-18T22:00'); // => true
 */
export function isSameDay(a, b) {
  const d1 = toDate(a, 'isSameDay');
  const d2 = toDate(b, 'isSameDay');
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Returns a human-friendly relative time string (e.g. "3 days ago").
 *
 * @param {Date|string|number} date - The date to describe.
 * @param {Date|string|number} [from=new Date()] - The reference "now".
 * @returns {string} A relative time description.
 * @throws {TypeError} If either date is invalid.
 *
 * @example
 * timeAgo('2026-08-15', '2026-08-18'); // => '3 days ago'
 */
export function timeAgo(date, from = new Date()) {
  const then = toDate(date, 'timeAgo');
  const now = toDate(from, 'timeAgo');
  const diffSeconds = Math.round((now.getTime() - then.getTime()) / 1000);
  const past = diffSeconds >= 0;
  const seconds = Math.abs(diffSeconds);

  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
  ];

  for (const [name, size] of units) {
    const value = Math.floor(seconds / size);
    if (value >= 1) {
      const plural = value === 1 ? name : `${name}s`;
      return past ? `${value} ${plural} ago` : `in ${value} ${plural}`;
    }
  }
  return 'just now';
}
