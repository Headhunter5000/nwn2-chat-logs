import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { renderWithProviders } from '../../utils/testUtils';
import PageHeader from './PageHeader';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PageHeader', () => {
  test('renders title and subtitle', () => {
    render(<PageHeader title="Test Title" subtitle="Subtitle" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  test('back link triggers history.back when backLink is true', () => {
    const backMock = vi.fn();
    const originalBack = window.history.back;
    window.history.back = backMock as () => void;
    renderWithProviders(<PageHeader title="Heading" backLink={true} />);
    fireEvent.click(screen.getByText('common.back'));
    expect(backMock).toHaveBeenCalledTimes(1);
    // restore
    window.history.back = originalBack;
  });
});