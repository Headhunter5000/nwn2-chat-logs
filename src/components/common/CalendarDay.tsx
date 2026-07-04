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

const CalendarDay = styled(({ className, day, isSelected = false, isMarked = false, onClick: onClickOriginal } : CalendarDayProps) => {
  const isClickable = !isSelected && isMarked;
  const onClick = isClickable ? onClickOriginal : preventClick;
  return <div {...{ className, onClick }} data-testid={`calendar-day-${day}`} data-is-selected={isSelected} data-is-marked={isMarked}>{day}</div>;
})(({ theme, isSelected, isMarked, size = 'medium' }) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${theme.calendar?.[size]?.daySize};
  height: ${theme.calendar?.[size]?.daySize};
  color: ${theme.global.colors.text.light};
  opacity: 0.5;

  ${isSelected && css`
    background: ${theme.global.colors.brand};
    color: ${theme.global.colors.text.dark};
    font-weight: 500;
    opacity: 1;
  `}

  ${isMarked && !isSelected && css`
    color: ${theme.global.colors.brand};
    font-weight: 500;
    opacity: 1;
  `}
`);

export default CalendarDay;
