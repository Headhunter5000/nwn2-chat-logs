import styled, { css } from 'styled-components';

const preventClick = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

interface CalendarDayProps  {
  day: number;
  size?: string;
  isSelected?: boolean;
  isMarked?: boolean;
  className?: string;
  onClick: (e: React.MouseEvent) => void
};

const CalendarDay = styled(({
  className,
  day,
  isSelected = false,
  isMarked = false,
  onClick: onClickOriginal,
} : CalendarDayProps) => {
  const isClickable = !isSelected && isMarked;
  const onClick = isClickable ? onClickOriginal : preventClick;
  return (
    <div
      {...{ className, onClick }}
      data-testid={`calendar-day-${day}`}
      data-is-selected={isSelected}
      data-is-marked={isMarked}
    >{day}</div>);
})(({ theme, size = 'medium' }) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${theme.calendar?.[size]?.daySize};
  height: ${theme.calendar?.[size]?.daySize};
`);

export default CalendarDay;
