import { render, screen } from '@testing-library/react';
import { Character } from './Character';

describe('Character', () => {
  it('renders name and count correctly', () => {
    render(<Character name="Test Name" count={5} />);
    expect(screen.getByTestId('char-name')).toHaveTextContent('Test Name');
    expect(screen.getByTestId('char-count')).toHaveTextContent('(5)');
  });
});
