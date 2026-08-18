# JavaScript Utility Functions Library

A reusable, zero-dependency JavaScript utility package containing helper functions
for **arrays**, **strings**, **dates**, and **numbers**. Written as native ES modules
with full [JSDoc](https://jsdoc.app/) documentation, proper input validation, and
edge-case handling.

> **Minor Project 5 — Web Development**

---

## Features

- **Zero dependencies** — pure JavaScript, runs in the browser and in Node.js.
- **ES Modules** — import only what you need (tree-shakeable).
- **Fully documented** — every function carries JSDoc with `@param`, `@returns`,
  `@throws`, and `@example` tags.
- **Defensive** — inputs are validated and clear `TypeError` / `RangeError`
  exceptions are thrown for misuse.
- **Tested** — 43 assertions using Node's built-in test runner (no test framework needed).

---

## Project Structure

```
project 5/
├── src/
│   ├── array.js      # Array utility functions
│   ├── string.js     # String formatter functions
│   ├── date.js       # Date helper methods
│   ├── number.js     # Number & currency formatting utilities
│   └── index.js      # Barrel entry point (named + namespaced exports)
├── examples/
│   ├── demo.js       # Node.js usage demonstration
│   └── index.html    # Browser console demonstration
├── test/
│   └── utils.test.js # Lightweight test suite
├── package.json
└── README.md
```

---

## Getting Started

### Run the demo (Node.js)

```bash
npm run demo
```

### Run the tests

```bash
npm test
```

### Try it in the browser console

Open `examples/index.html` with a local server (ES modules require `http://`,
not `file://`):

```bash
npx serve .
```

Then open the served `examples/index.html`, press **F12**, and experiment with the
global `utils` object — e.g. `utils.number.formatCurrency(9.99)`.

---

## Usage

```js
// Import individual helpers
import { unique, titleCase, formatCurrency, daysBetween } from './src/index.js';

unique([1, 1, 2, 3]);              // [1, 2, 3]
titleCase('hello world');          // 'Hello World'
formatCurrency(1234.5, 'INR', 'en-IN'); // '₹1,234.50'
daysBetween('2026-08-18', '2026-08-23'); // 5
```

```js
// Or import grouped namespaces
import utils from './src/index.js';

utils.array.chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
utils.string.slugify('Héllo, World!'); // 'hello-world'
```

---

## API Reference

### Array (`src/array.js`)

| Function | Description |
| --- | --- |
| `unique(arr)` | Removes duplicate values, preserving order. |
| `chunk(arr, size)` | Splits an array into chunks of `size`. |
| `flatten(arr, depth?)` | Flattens a nested array to a given depth. |
| `groupBy(arr, keyFn)` | Groups elements by a derived key. |
| `difference(arr, values)` | Returns elements in `arr` not in `values`. |
| `sum(arr, mapFn?)` | Sums numbers, with optional mapper. |
| `last(arr, fallback?)` | Returns the last element, or a fallback. |
| `shuffle(arr)` | Returns a Fisher–Yates shuffled copy. |

### String (`src/string.js`)

| Function | Description |
| --- | --- |
| `capitalize(str)` | Capitalizes the first letter. |
| `titleCase(str)` | Capitalizes each word. |
| `kebabCase(str)` | Converts to `kebab-case`. |
| `camelCase(str)` | Converts to `camelCase`. |
| `truncate(str, maxLength, suffix?)` | Truncates with an ellipsis. |
| `reverse(str)` | Reverses characters (Unicode-aware). |
| `slugify(str)` | Produces a URL-friendly slug. |
| `escapeHtml(str)` | Escapes HTML-sensitive characters. |
| `wordCount(str)` | Counts words. |

### Date (`src/date.js`)

| Function | Description |
| --- | --- |
| `formatDate(date, pattern?)` | Formats via `YYYY MM DD HH mm ss` tokens. |
| `addDays(date, days)` | Adds/subtracts days. |
| `daysBetween(a, b)` | Whole days between two dates. |
| `isLeapYear(year)` | Whether a year is a leap year. |
| `isSameDay(a, b)` | Whether two dates are the same day. |
| `timeAgo(date, from?)` | Human-friendly relative time. |

### Number (`src/number.js`)

| Function | Description |
| --- | --- |
| `formatCurrency(amount, currency?, locale?)` | Locale-aware currency formatting. |
| `formatNumber(value, decimals?, locale?)` | Grouped-thousands formatting. |
| `clamp(value, min, max)` | Constrains a number to a range. |
| `round(value, decimals?)` | Rounds to fixed decimals. |
| `formatPercent(value, decimals?)` | Formats a fraction as a percentage. |
| `randomInt(min, max)` | Random integer in an inclusive range. |
| `formatBytes(bytes, decimals?)` | Human-readable file size. |

---

## Deliverables

- ✅ **JavaScript Utility Library** — `src/` (array, string, date, number modules)
- ✅ **JSDoc Documentation** — inline on every exported function
- ✅ **Example Usage Demonstrations** — `examples/demo.js` and `examples/index.html`

---

## License

MIT
