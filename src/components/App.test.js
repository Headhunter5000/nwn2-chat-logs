import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders component', () => {
    render(<App />);
    expect(screen.getByTestId('app-header')).toBeInTheDocument();
  });
});
