import styled, { css } from 'styled-components';

const preventClick = e => {
  e.preventDefault();
  e.stopPropagation();
};

const CalendarDay = styled(({ className, day, isSelected, isMarked, onClick: onClickOriginal }) => {
  const isClickable = !isSelected && isMarked;
  const onClick = isClickable ? onClickOriginal : preventClick;
  return <div {...{ className, onClick }}>{day}</div>;
})(({ theme, isSelected, isMarked, size }) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${theme.calendar[size].daySize};
  height: ${theme.calendar[size].daySize};
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
