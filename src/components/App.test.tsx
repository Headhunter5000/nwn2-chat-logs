import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from './App';

describe('App', () => {
  test('renders component', async () => {
    render(<App />);
    expect(await screen.findByTestId('app-header')).toBeInTheDocument();
  });
});
