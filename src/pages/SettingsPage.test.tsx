import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithProviders } from '../utils/testUtils';
import SettingsPage from './SettingsPage';

describe('SettingsPage', () => {
  test('renders component', async () => {
    renderWithProviders(<SettingsPage />);
    expect(await screen.findByTestId('page-header')).toBeInTheDocument();
  });
});
