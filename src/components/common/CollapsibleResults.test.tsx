import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import CollapsibleResults from './CollapsibleResults';

describe('CollapsibleResults', () => {
  const label = 'Test Item';
  const results: string[] = ['Alpha', 'Beta'];

  test('renders null when no results', () => {
    render(<CollapsibleResults label={label} results={[]} color="brand" />);
    // button should not be in document
    expect(screen.queryByRole('button')).toBeNull();
  });

  test('renders button and collapsible list when results are provided', () => {
    render(<CollapsibleResults label={label} results={results} color="brand" />);

    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    // Initially collapsed, list items not visible
    results.forEach(item => {
      expect(screen.queryAllByText(item)).toHaveLength(0);
    });

    fireEvent.click(btn);
    // After toggle, items should appear
    results.forEach(item => {
      const nodes = screen.getAllByText(item);
      expect(nodes.length).toBeGreaterThan(0);
    });
  });
});
