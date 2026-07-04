---
name: code-quality-check
description: >
  ALWAYS use this skill whenever touching any JavaScript or TypeScript file —
  this includes fixing bugs, adding features, refactoring, creating new files,
  or editing existing files. Do not skip this skill even for small or seemingly
  trivial edits. Two phases: (1) before writing, read the ESLint config so
  formatting rules like trailing commas, quotes, and semicolons are known
  upfront; (2) after writing, run ESLint and tsc --noEmit as applicable.
  Trigger words: edit, fix, create, refactor, add, update, change, implement,
  write — on any .js .jsx .ts .tsx file. If the file being worked on is a
  test file (e.g. matches *.test.ts, *.test.tsx, *.spec.ts, *.spec.tsx,
  or lives under a __tests__ directory, or otherwise uses Vitest/React
  Testing Library APIs), also read and follow the `vitest-rtl` skill's
  instructions in addition to this one — they are complementary, not a
  replacement for each other.
---

# Code Quality Check

Two phases: **read rules first, then verify after**.

---

## Phase 0 — Vitest Test Files: Also Consult vitest-rtl

Before doing anything else, check whether the file you're about to create or
edit is a Vitest test file — for example it matches `*.test.ts`, `*.test.tsx`,
`*.spec.ts`, `*.spec.tsx`, lives under a `__tests__` directory, or otherwise
uses Vitest / React Testing Library APIs (`describe`, `it`, `test`, `render`,
`screen`, etc.).

If it is a Vitest test file:

1. Read the **vitest-rtl** skill in full before writing any test code.
2. Follow its instructions alongside the steps in this skill — the two skills
   are complementary. This skill governs linting/type-checking; vitest-rtl
   governs testing conventions, queries, and execution.
3. Do not treat this skill as a substitute for vitest-rtl, or vice versa —
   apply both.

---

## Phase 1 — Before Writing Code: Read the ESLint Config

Before editing or creating any JS/TS file, locate and read the ESLint config:

```bash
# Find the config (pick the first match)
ls eslint.config.* .eslintrc.* .eslintrc 2>/dev/null | head -5
```

Common filenames: `eslint.config.js`, `eslint.config.mjs`, `.eslintrc.json`,
`.eslintrc.js`, `.eslintrc.yaml`. If none exist at the root, check the nearest
parent directory or look for an `eslintConfig` key in `package.json`.

**Extract and internalize these rule categories before writing a single line:**

| Category          | What to look for                                                               |
| ----------------- | ------------------------------------------------------------------------------ |
| Trailing commas   | `comma-dangle` — `"all"`, `"es5"`, `"never"`                                   |
| Semicolons        | `semi` — required or forbidden                                                 |
| Quotes            | `quotes` — `"single"`, `"double"`, `"backtick"`                                |
| Indentation       | `indent` or `@typescript-eslint/indent` — spaces or tabs, how many             |
| Line length       | `max-len` — max characters per line                                            |
| Spacing           | `space-before-function-paren`, `object-curly-spacing`, `array-bracket-spacing` |
| Arrow functions   | `arrow-parens` — parens always/as-needed                                       |
| TypeScript extras | `@typescript-eslint/*` rules for type assertions, imports, etc.                |

Apply these rules consistently throughout all code you write. Do not wait for
the linter to catch violations — write correctly the first time.

---

## Phase 2 — After Writing Code: Run the Checks

### JavaScript / TypeScript — Linting

```bash
npx eslint <file>
```

### TypeScript — Type Checking

For any `.ts` or `.tsx` file:

```bash
# From the project root, or nearest tsconfig for monorepos
npx tsc -b
# or
npx tsc -b -p <path/to/tsconfig.json>
```

---

## Handling Failures

- **Lint errors**: Fix them directly — don't just suppress. Re-run to confirm clean.
- **Type errors**: Fix the root cause, re-run `tsc --noEmit` until green.
- **Tool not found / no config**: Skip that check, note it briefly, continue.

---

## Quick Reference

| File type      | Read ESLint config | Run ESLint | `tsc --noEmit` | Also read vitest-rtl       |
| -------------- | ------------------ | ---------- | -------------- | -------------------------- |
| `.js` / `.jsx` | ✓ before           | ✓ after    |                | if it's a Vitest test file |
| `.ts` / `.tsx` | ✓ before           | ✓ after    | ✓ after        | if it's a Vitest test file |
