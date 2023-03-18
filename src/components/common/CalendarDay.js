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

  ${isSelected && css`
    background: ${theme.global.colors.brand};
    color: ${theme.global.colors.text.dark};
    font-weight: bold;
  `}

  ${isMarked && !isSelected && css`
    color: ${theme.global.colors.brand};
  `}
`);

export default CalendarDay;
