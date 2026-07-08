/* eslint-disable max-len */
import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithProviders } from '../../utils/testUtils';
import CalendarDay from './CalendarDay';

const onClick = vi.fn();

describe('CalendarDay', () => {
  test('renders day correctly', () => {
    renderWithProviders(<CalendarDay day={15} onClick={onClick} />);
    expect(screen.getByTestId('calendar-day-15')).toBeInTheDocument();
  });

  test('applies styles for selected state', () => {
    renderWithProviders(<CalendarDay day={15} isSelected={true} isMarked={true} onClick={onClick} />);
    const el = screen.getByTestId('calendar-day-15');
    expect(el).toHaveAttribute('data-is-selected', 'true');
    expect(el).toHaveAttribute('data-is-marked', 'true');
  });

  test('applies styles for marked but not selected state', () => {
    renderWithProviders(<CalendarDay day={15} isMarked={true} isSelected={false} onClick={onClick} />);
    const el = screen.getByTestId('calendar-day-15');
    expect(el).toHaveAttribute('data-is-marked', 'true');
  });
});
