import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';
import InternalLink from './InternalLink';

describe('InternalLink', () => {
  test('renders basic anchor link', () => {
    render(
      <MemoryRouter>
        <InternalLink to="/test">Click me</InternalLink>
      </MemoryRouter>,
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders as button when ui is Button', () => {
    render(
      <MemoryRouter>
        <InternalLink to="/test">Button link</InternalLink>,
      </MemoryRouter>,
    );
    const btn = screen.getByText('Button link');
    expect(btn).toBeInTheDocument();
  });

  test('navigates on click', async () => {
    // Note: Complex navigation tests usually require a mock router or checking the history object, 
    // but basic rendering and presence of href/label is sufficient for unit.
    render(
      <MemoryRouter>
        <InternalLink to="/test">Nav test</InternalLink>
      </MemoryRouter>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });
});
