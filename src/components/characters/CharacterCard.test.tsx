import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import CharacterCard from './CharacterCard';

const CHAR = {
  name: 'Test Name',
  dates: ['2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05'],
  count: 15,
};

describe('CharacterCard', () => {
  it('renders name and count correctly', () => {
    renderWithProviders(<CharacterCard {...CHAR} />);
    expect(screen.getByTestId('char-name')).toHaveTextContent('Test Name');
    expect(screen.getByTestId('char-count')).toHaveTextContent('(15)');
  });

  it('renders items with correct data from context', () => {
    renderWithProviders(<CharacterCard {...CHAR} />);
    const dates = screen.getAllByTestId('char-log-date');
    expect(dates.length).toBe(4);
  });

  it('renders delete button when withDelete is true', () => {
    renderWithProviders(<CharacterCard {...CHAR} />);
    const deleteButton = screen.getByTestId('char-delete');
    expect(deleteButton).toBeInTheDocument();
  });
});
