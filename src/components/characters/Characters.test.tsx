import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import Characters from './Characters';

const CHARS = [
  {
    name: 'TestChar',
    dates: ['2021-01-01', '2021-01-02', '2021-01-03'],
    firstDate: '2021-01-01',
    lastDate: '2021-01-03',
    count: 15,
  },
];

vi.mock('../../utils/dbUtils', () => ({
  useChatLogStats: () => CHARS,
}));

describe('Characters', () => {
  it('renders a list of characters', () => {
    renderWithProviders(<Characters />);
    expect(screen.getByTestId('char-menu')).toBeInTheDocument();
  });

  it('renders items with correct data from context', () => {
    renderWithProviders(<Characters />);
    expect(screen.getByText(/TestChar/)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(3);
  });

  it('renders the ImportDropzone', () => {
    renderWithProviders(<Characters />);
    const dropzoneText = screen.queryByText(/Drag .* or click/);
    expect(dropzoneText).toBeInTheDocument();
  });
});
