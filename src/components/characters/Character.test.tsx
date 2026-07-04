import { render, screen } from '@testing-library/react';
import { Character } from './Character';

describe('Character', () => {
  it('renders name and count correctly', () => {
    render(<Character name="Test Name" count={5} />);
    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText('(5)')).toBeInTheDocument();
  });

  it('renders delete button when withDelete is true', () => {
    render(<Character name="Test Name" count={5} withDelete={true} />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it('does not render delete button when withDelete is false', () => {
    render(<Character name="Test Name" count={5} withDelete={false} />);
    const deleteButton = screen.queryByRole('button', { name: /delete/i });
    expect(deleteButton).not.toBeInTheDocument();
  });

  it('does not render delete button when withDelete is undefined', () => {
    render(<Character name="Test Name" count={5} />);
    const deleteButton = screen.queryByRole('button', { name: /delete/i });
    expect(deleteButton).not.toBeInTheDocument();
  });
});
