---
name: vitest-rtl
description: >
  Use this skill for ANY task involving Vitest — including plain TypeScript/JavaScript
  unit tests, utility functions, hooks, modules, and React components. Triggers include:
  any mention of vitest, vite, vi.mock, vi.fn, vi.spyOn, describe/it/expect blocks,
  writing or fixing a test file, adding test coverage, mocking a module or function,
  testing a hook or utility, snapshot tests, or any file ending in .test.ts,
  .test.tsx, .spec.ts, or .spec.tsx. Also triggers for React Testing Library (RTL)
  specifically: @testing-library/react, userEvent, render, screen. Do NOT skip this
  skill for non-React tests — Vitest conventions (file placement, mocking, async
  patterns) apply equally to plain unit tests.
---

# React + Vitest + React Testing Library

## File placement convention

Test files live **next to the file they test**, in the same directory, named with a
`.test.tsx` (or `.test.ts`) suffix. The surrounding directory structure doesn't matter —
whatever it looks like in the codebase, the test file goes right beside the source file.

```
Button.tsx          → Button.test.tsx
useCounter.ts       → useCounter.test.ts
format.ts           → format.test.ts
```

Never place tests in a separate `__tests__/` folder unless the user explicitly asks.

---

## Imports — always use these

```ts
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
```

Do **not** import from `@testing-library/react/pure` unless you have a specific reason
(e.g. custom cleanup timing).

---

## Test file skeleton

```tsx
// Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("calls onClick when pressed", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

---

## Querying — priority order

Follow the RTL guiding principle: query the way users perceive the page.

| Priority | Query                  | When to use                                      |
| -------- | ---------------------- | ------------------------------------------------ |
| 1        | `getByRole`            | Most elements — buttons, inputs, headings, links |
| 2        | `getByLabelText`       | Form fields associated with a `<label>`          |
| 3        | `getByPlaceholderText` | Inputs when no label exists                      |
| 4        | `getByText`            | Non-interactive text content                     |
| 5        | `getByDisplayValue`    | Controlled inputs/selects/textareas              |
| 6        | `getByAltText`         | Images                                           |
| 7        | `getByTitle`           | Tooltip / title attributes                       |
| 8        | `getByTestId`          | Last resort — only when no semantic query works  |

**Avoid** `container.querySelector` and `getByClassName`. If you reach for them, add an
accessible role or `data-testid` to the component instead.

---

## User interactions

Always use `userEvent` (v14+) instead of `fireEvent` for interactions. It more
accurately simulates real browser behaviour (focus, pointer events, key sequences).

```ts
const user = userEvent.setup(); // call once per test or in beforeEach

await user.click(element);
await user.type(input, "hello");
await user.clear(input);
await user.selectOptions(select, "option-value");
await user.keyboard("{Enter}");
await user.tab();
```

---

## Async assertions

Prefer `waitFor` when asserting on things that appear after async work:

```ts
await waitFor(() => {
  expect(screen.getByText("Loaded!")).toBeInTheDocument();
});

// Or the shorthand for a single element appearing:
await screen.findByText("Loaded!");
```

Do **not** use arbitrary `setTimeout` delays.

---

## Mocking

### Module mock (vi.mock)

Place `vi.mock(...)` calls **at the top of the file**, before imports (Vitest hoists them).

```ts
vi.mock("./api", () => ({
  fetchUser: vi.fn(),
}));

// Then in your test:
import { fetchUser } from "./api";
vi.mocked(fetchUser).mockResolvedValue({ id: 1, name: "Alice" });
```

### Spy on a function

```ts
const spy = vi.spyOn(console, "error").mockImplementation(() => {});
// after test:
spy.mockRestore();
```

### Mock a default export

```ts
vi.mock("./logger", () => ({ default: vi.fn() }));
```

### Reset mocks between tests

```ts
beforeEach(() => {
  vi.clearAllMocks(); // clear call history
});

afterEach(() => {
  vi.restoreAllMocks(); // restore spies
});
```

---

## Testing custom hooks

Use `renderHook` from `@testing-library/react`:

```ts
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

it("increments the count", () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

---

## Wrapping with providers

When a component needs context (Router, Theme, Redux, etc.), create a reusable wrapper:

```tsx
// test-utils.tsx  (shared helper, lives in src/test-utils.tsx or similar)
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

function AllProviders({ children }: { children: React.ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

export function renderWithProviders(ui: React.ReactElement, options = {}) {
  return render(ui, { wrapper: AllProviders, ...options });
}
```

Then in individual test files:

```ts
import { renderWithProviders } from '../test-utils'
renderWithProviders(<MyPage />)
```

---

## Snapshot tests

Use sparingly — only for stable, purely presentational components. Prefer explicit
assertions for anything with logic.

```ts
it('matches snapshot', () => {
  const { container } = render(<Badge label="new" />)
  expect(container).toMatchSnapshot()
})
```

Update snapshots intentionally: `vitest --update-snapshots` (or `vitest -u`).

---

## Common patterns

### Assert element is NOT in the document

```ts
expect(screen.queryByText("Error")).not.toBeInTheDocument();
```

(`query*` returns `null` instead of throwing; use it for absence checks.)

### Assert on multiple items

```ts
const items = screen.getAllByRole("listitem");
expect(items).toHaveLength(3);
expect(items[0]).toHaveTextContent("Apple");
```

### Assert accessible name / attribute

```ts
expect(button).toHaveAccessibleName("Submit form");
expect(input).toHaveValue("hello");
expect(checkbox).toBeChecked();
expect(link).toHaveAttribute("href", "/about");
```

### Scoped queries with `within`

```ts
const dialog = screen.getByRole("dialog");
const confirmBtn = within(dialog).getByRole("button", { name: /confirm/i });
```

---

## After writing tests — always run them

Once the test file is written, **always run the tests immediately** using bash:

```bash
npx vitest run path/to/MyFile.test.tsx
```

If the project has a test script in `package.json`, prefer that:

```bash
npm test -- path/to/MyFile.test.tsx
```

Check the output and fix any failures before considering the task done. Do not stop after writing the file.

---

## What NOT to do

- ❌ `wrapper.find(...)` — this is Enzyme, not RTL
- ❌ `component.instance()` — no direct instance access in RTL
- ❌ `fireEvent.click(el)` — use `await user.click(el)` instead
- ❌ `await new Promise(r => setTimeout(r, 500))` — use `waitFor` / `findBy*`
- ❌ `getByTestId` as a first resort — only use when semantic queries aren't viable
- ❌ Placing test files in `__tests__/` folders — co-locate them with the source file
