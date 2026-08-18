/**
 * @file array.js
 * @module utils/array
 * @description Reusable utility functions for working with arrays.
 */

/**
 * Removes duplicate values from an array, preserving first-seen order.
 *
 * @param {Array<*>} arr - The source array.
 * @returns {Array<*>} A new array containing only unique values.
 * @throws {TypeError} If `arr` is not an array.
 *
 * @example
 * unique([1, 2, 2, 3, 3, 3]); // => [1, 2, 3]
 */
export function unique(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('unique: expected an array');
  }
  return [...new Set(arr)];
}

/**
 * Splits an array into chunks of a given size. The final chunk may be smaller.
 *
 * @param {Array<*>} arr - The source array.
 * @param {number} size - The maximum size of each chunk (must be >= 1).
 * @returns {Array<Array<*>>} An array of chunk arrays.
 * @throws {TypeError} If `arr` is not an array.
 * @throws {RangeError} If `size` is not a positive integer.
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2); // => [[1, 2], [3, 4], [5]]
 */
export function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    throw new TypeError('chunk: expected an array');
  }
  if (!Number.isInteger(size) || size < 1) {
    throw new RangeError('chunk: size must be a positive integer');
  }
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Flattens a nested array to the specified depth.
 *
 * @param {Array<*>} arr - The source (possibly nested) array.
 * @param {number} [depth=Infinity] - How deep to flatten.
 * @returns {Array<*>} A new, flattened array.
 * @throws {TypeError} If `arr` is not an array.
 *
 * @example
 * flatten([1, [2, [3, [4]]]]);    // => [1, 2, 3, 4]
 * flatten([1, [2, [3]]], 1);      // => [1, 2, [3]]
 */
export function flatten(arr, depth = Infinity) {
  if (!Array.isArray(arr)) {
    throw new TypeError('flatten: expected an array');
  }
  return arr.reduce((acc, item) => {
    if (Array.isArray(item) && depth > 0) {
      acc.push(...flatten(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

/**
 * Groups the elements of an array by a key derived from each element.
 *
 * @param {Array<*>} arr - The source array.
 * @param {function(*): (string|number)} keyFn - Returns the group key for an element.
 * @returns {Object<string, Array<*>>} A map of key -> array of elements.
 * @throws {TypeError} If `arr` is not an array or `keyFn` is not a function.
 *
 * @example
 * groupBy([6.1, 4.2, 6.3], Math.floor); // => { '4': [4.2], '6': [6.1, 6.3] }
 */
export function groupBy(arr, keyFn) {
  if (!Array.isArray(arr)) {
    throw new TypeError('groupBy: expected an array');
  }
  if (typeof keyFn !== 'function') {
    throw new TypeError('groupBy: keyFn must be a function');
  }
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {});
}

/**
 * Returns the elements present in the first array but not in the second.
 *
 * @param {Array<*>} arr - The source array.
 * @param {Array<*>} values - The values to exclude.
 * @returns {Array<*>} A new array of the remaining elements.
 * @throws {TypeError} If either argument is not an array.
 *
 * @example
 * difference([1, 2, 3, 4], [2, 4]); // => [1, 3]
 */
export function difference(arr, values) {
  if (!Array.isArray(arr) || !Array.isArray(values)) {
    throw new TypeError('difference: expected two arrays');
  }
  const exclude = new Set(values);
  return arr.filter((item) => !exclude.has(item));
}

/**
 * Sums the numeric values of an array. Optionally maps each element first.
 *
 * @param {Array<*>} arr - The source array.
 * @param {function(*): number} [mapFn] - Optional mapper to extract a number.
 * @returns {number} The total sum (0 for an empty array).
 * @throws {TypeError} If `arr` is not an array.
 *
 * @example
 * sum([1, 2, 3]);                          // => 6
 * sum([{ n: 1 }, { n: 2 }], (o) => o.n);   // => 3
 */
export function sum(arr, mapFn) {
  if (!Array.isArray(arr)) {
    throw new TypeError('sum: expected an array');
  }
  return arr.reduce((total, item) => {
    const value = mapFn ? mapFn(item) : item;
    return total + (Number(value) || 0);
  }, 0);
}

/**
 * Returns the last element of an array, or a fallback when empty.
 *
 * @param {Array<*>} arr - The source array.
 * @param {*} [fallback=undefined] - Value returned when the array is empty.
 * @returns {*} The last element, or the fallback.
 * @throws {TypeError} If `arr` is not an array.
 *
 * @example
 * last([1, 2, 3]);      // => 3
 * last([], 'none');     // => 'none'
 */
export function last(arr, fallback = undefined) {
  if (!Array.isArray(arr)) {
    throw new TypeError('last: expected an array');
  }
  return arr.length ? arr[arr.length - 1] : fallback;
}

/**
 * Randomly shuffles an array using the Fisher–Yates algorithm.
 * Returns a new array; the input is not mutated.
 *
 * @param {Array<*>} arr - The source array.
 * @returns {Array<*>} A new, shuffled array.
 * @throws {TypeError} If `arr` is not an array.
 *
 * @example
 * shuffle([1, 2, 3, 4]); // => e.g. [3, 1, 4, 2]
 */
export function shuffle(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('shuffle: expected an array');
  }
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
