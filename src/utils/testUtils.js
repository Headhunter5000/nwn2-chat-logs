import { render } from '@testing-library/react';
import { Grommet } from 'grommet';
import { ChatLogsProvider } from './statsContext';

const Providers = props => (
  <Grommet>
    <ChatLogsProvider {...props} />
  </Grommet>
);

export const renderWithProviders = (ui, options) => {
  render(ui, { wrapper: Providers, ...options });
};

export const expectToEqualJSON = (actual, expected) => {
  expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
};

export const expectNotToEqualJSON = (actual, expected) => {
  expect(JSON.stringify(actual)).not.toBe(JSON.stringify(expected));
};
