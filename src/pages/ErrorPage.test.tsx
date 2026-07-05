import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithProviders } from '../utils/testUtils';
import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {
  test('renders component', async () => {
    renderWithProviders(<ErrorPage />);
    expect(await screen.findByTestId('page-header')).toBeInTheDocument();
  });
});
