import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Date } from './Date';

// Use a known date string that will format the same regardless of zone.
const testIso = '2026-07-12T00:00:00Z'; // 12 July 2026 in UTC

describe('DateFormat', () => {
  test('formats using de-DE locale by default', () => {
    render(<Date date={testIso} locales="de-DE" />);
    const formatted = screen.getByText('12.07.2026');
    expect(formatted).toBeInTheDocument();
  });

  test('accepts a custom locale', () => {
    render(<Date date={testIso} locales="en-GB" />);
    const formatted = screen.getByText('12/07/2026');
    expect(formatted).toBeInTheDocument();
  });
});
