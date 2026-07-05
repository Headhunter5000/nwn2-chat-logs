import { screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { renderWithProviders } from '../utils/testUtils';
import LandingPage from './LandingPage';

const CHARS = [
  {
    name: 'TestChar',
    dates: ['2021-01-01', '2021-01-02', '2021-01-03'],
    minDate: '2021-01-01',
    maxDate: '2021-01-03',
    count: 15,
  },
];

vi.mock('react-router', async importOriginal => {
  const actual = await importOriginal<typeof import('react-router')>();

  return {
    ...actual,
    useNavigate: () => {},
  };
});

vi.mock('../utils/dbUtils', () => ({
  useChatLogStats: () => CHARS,
}));

describe('LandingPage', () => {
  test('renders component', async () => {
    renderWithProviders(<LandingPage />);
    expect(await screen.findByTestId('page-header')).toBeInTheDocument();
    expect(await screen.findByTestId('char-menu')).toBeInTheDocument();
  });
});
