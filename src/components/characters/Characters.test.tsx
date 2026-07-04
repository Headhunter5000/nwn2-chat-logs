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
  it('renders a list of characters', async () => {
    renderWithProviders(<Characters />);
    expect(await screen.findByTestId('char-menu')).toBeInTheDocument();
  });

  it('renders items with correct data from context', async () => {
    renderWithProviders(<Characters />);
    expect(await screen.findByText(/TestChar/)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(3);
  });

  it('renders the ImportDropzone', async () => {
    renderWithProviders(<Characters />);
    expect(await screen.findByText(/Drag .* or click/)).toBeInTheDocument();
  });
});
