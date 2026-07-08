import type { CalendarProps, ThemeType } from 'grommet';
import styled, { css } from 'styled-components';
import { getThemeProp } from '../../utils/themeUtils';

const preventClick = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

interface CalendarDayProps {
  day: number;
  size?: string;
  isSelected?: boolean;
  isMarked?: boolean;
  className?: string;
  onClick: (e: React.MouseEvent) => void
};

type CalenderStyleProps = Pick<CalendarProps, 'size'> & { theme: ThemeType };

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
})(({ theme, size = 'medium' }: CalenderStyleProps) => {
  const daySize = getThemeProp(`calendar.${size}.daySize`)({ theme });

  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${daySize};
    height: ${daySize};
  `;
});

export default CalendarDay;
