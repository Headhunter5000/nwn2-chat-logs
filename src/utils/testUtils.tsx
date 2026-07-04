import { render, type RenderOptions } from '@testing-library/react';
import { Grommet } from 'grommet';
import type React from 'react';
import { expect } from 'vitest';
import { ChatLogsProvider } from './statsProvider';

// eslint-disable-next-line react-refresh/only-export-components
const Providers = (props: Record<string, unknown> ) => (
  <Grommet>
    <ChatLogsProvider {...props} />
  </Grommet>
);

export const renderWithProviders = (ui: React.ReactNode, options?: RenderOptions) => {
  render(ui, { wrapper: Providers, ...options });
};

export const expectToEqualJSON = (actual: unknown, expected: unknown) => {
  expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
};

export const expectNotToEqualJSON = (actual: unknown, expected: unknown) => {
  expect(JSON.stringify(actual)).not.toBe(JSON.stringify(expected));
};
