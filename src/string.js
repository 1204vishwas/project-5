/**
 * @file string.js
 * @module utils/string
 * @description Reusable string formatter and helper functions.
 */

/**
 * Capitalizes the first character of a string and lowercases the rest.
 *
 * @param {string} str - The input string.
 * @returns {string} The capitalized string.
 * @throws {TypeError} If `str` is not a string.
 *
 * @example
 * capitalize('hELLO'); // => 'Hello'
 */
export function capitalize(str) {
  if (typeof str !== 'string') {
    throw new TypeError('capitalize: expected a string');
  }
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to Title Case (each word capitalized).
 *
 * @param {string} str - The input string.
 * @returns {string} The title-cased string.
 * @throws {TypeError} If `str` is not a string.
 *
 * @example
 * titleCase('the quick brown fox'); // => 'The Quick Brown Fox'
 */
export function titleCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('titleCase: expected a string');
  }
  return str
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Converts a string to kebab-case (lowercase, hyphen-separated).
 *
 * @param {string} str - The input string.
 * @returns {string} The kebab-cased string.
 * @throws {TypeError} If `str` is not a string.
 *
 * @example
 * kebabCase('Hello World_Example'); // => 'hello-world-example'
 * kebabCase('camelCaseText');       // => 'camel-case-text'
 */
export function kebabCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('kebabCase: expected a string');
  }
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_\s]+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

/**
 * Converts a string to camelCase.
 *
 * @param {string} str - The input string.
 * @returns {string} The camelCased string.
 * @throws {TypeError} If `str` is not a string.
 *
 * @example
 * camelCase('hello-world_example'); // => 'helloWorldExample'
 */
export function camelCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('camelCase: expected a string');
  }
  return str
    .replace(/[-_\s]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(/^(.)/, (m) => m.toLowerCase());
}

/**
 * Truncates a string to a maximum length, appending a suffix if cut.
 *
 * @param {string} str - The input string.
 * @param {number} maxLength - The maximum length of the result (including suffix).
 * @param {string} [suffix='…'] - Appended when the string is truncated.
 * @returns {string} The (possibly) truncated string.
 * @throws {TypeError} If `str` is not a string.
 * @throws {RangeError} If `maxLength` is not a non-negative integer.
 *
 * @example
 * truncate('The quick brown fox', 9); // => 'The quic…'
 */
export function truncate(str, maxLength, suffix = '…') {
  if (typeof str !== 'string') {
    throw new TypeError('truncate: expected a string');
  }
  if (!Number.isInteger(maxLength) || maxLength < 0) {
    throw new RangeError('truncate: maxLength must be a non-negative integer');
  }
  if (str.length <= maxLength) return str;
  if (maxLength <= suffix.length) return str.slice(0, maxLength);
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Reverses the characters of a string (Unicode code-point aware).
 *
 * @param {string} str - The input string.
 * @returns {string} The reversed string.
 * @throws {TypeError} If `str` is not a string.
 *
 * @example
 * reverse('hello'); // => 'olleh'
 */
export function reverse(str) {
  if (typeof str !== 'string') {
    throw new TypeError('reverse: expected a string');
  }
  return [...str].reverse().join('');
}

/**
 * Generates a URL-friendly slug from arbitrary text.
 *
 * @param {string} str - The input string.
 * @returns {string} A lowercase, hyphenated, accent-stripped slug.
 * @throws {TypeError} If `str` is not a string.
 *
 * @example
 * slugify('Héllo, World!'); // => 'hello-world'
 */
export function slugify(str) {
  if (typeof str !== 'string') {
    throw new TypeError('slugify: expected a string');
  }
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Escapes HTML-sensitive characters to prevent markup injection.
 *
 * @param {string} str - The input string.
 * @returns {string} The escaped string.
 * @throws {TypeError} If `str` is not a string.
 *
 * @example
 * escapeHtml('<b>Tom & "Jerry"</b>');
 * // => '&lt;b&gt;Tom &amp; &quot;Jerry&quot;&lt;/b&gt;'
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') {
    throw new TypeError('escapeHtml: expected a string');
  }
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (ch) => map[ch]);
}

/**
 * Counts the number of words in a string.
 *
 * @param {string} str - The input string.
 * @returns {number} The word count (0 for empty/whitespace-only strings).
 * @throws {TypeError} If `str` is not a string.
 *
 * @example
 * wordCount('  hello   world  '); // => 2
 */
export function wordCount(str) {
  if (typeof str !== 'string') {
    throw new TypeError('wordCount: expected a string');
  }
  const matches = str.trim().match(/\S+/g);
  return matches ? matches.length : 0;
}
