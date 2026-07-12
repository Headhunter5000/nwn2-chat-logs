import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PageLoader from './PageLoader';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('PageLoader', () => {
  test('renders loading text', () => {
    render(<PageLoader />);
    expect(screen.getByText('common.loading')).toBeInTheDocument();
  });
});