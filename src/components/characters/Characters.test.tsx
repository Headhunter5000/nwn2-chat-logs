import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import Characters from './Characters';

const CHARS = [
  {
    name: 'TestChar1',
    dates: ['2021-01-01'],
    firstDate: '2021-01-01',
    lastDate: '2021-01-03',
    count: 15,
  },
  {
    name: 'TestChar2',
    dates: ['2021-01-01'],
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
    const names = screen.getAllByTestId('char-name');
    expect(names.length).toBe(CHARS.length);
    expect(names[0]).toHaveTextContent('TestChar1');
    expect(names[1]).toHaveTextContent('TestChar2');
  });

  it('renders the ImportDropzone', async () => {
    renderWithProviders(<Characters />);
    expect(await screen.findByTestId('import-dropzone')).toBeInTheDocument();
  });
});
