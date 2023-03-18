import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Calendar, Drop, Button } from 'grommet';
import { FormCalendar } from 'grommet-icons';
import PropTypes from 'prop-types';

import { getDateFromISOString, getIsoStringFromDate } from '../../utils/dateUtils';
import { ChatLogsContext } from '../../utils/statsContext';
import CalendarDay from '../common/CalendarDay';

// eslint-disable-next-line react/prop-types, react/display-name
const createCalendarDay = ({ dates, size, onClick }) => ({ date: currentDate, ...props }) => {
  const isMarked = dates?.find(date => getDateFromISOString(getIsoStringFromDate(currentDate)) === date);
  return <CalendarDay {...{ ...props, size, isMarked, onClick }} />;
};

const ChatLogCalendar = ({ char, setCurrrentDate, currentDate, size }) => {
  const { statsByChar } = useContext(ChatLogsContext);
  const [visible, setVisible] = useState(false);
  const dropRef = useRef();

  const { dates, firstDate, lastDate } = useMemo(
    () => statsByChar[char] ?? {},
    [char, statsByChar]
  );

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  return (
    <>
      <div>
        <Button
          label={currentDate}
          icon={<FormCalendar />}
          onClick={show}
          ref={dropRef}
        />
      </div>
      {visible && dropRef.current && (
        <Drop
          target={dropRef.current}
          onClickOutside={hide}
          onEsc={hide}
        >
          <Calendar
            size={size}
            margin={size}
            animate={false}
            daysOfWeek={true}
            firstDayOfWeek={1}
            bounds={[firstDate, lastDate]}
            date={getIsoStringFromDate(currentDate)}
            onSelect={date => setCurrrentDate(getDateFromISOString(date))}
            // eslint-disable-next-line react/no-children-prop
            children={createCalendarDay({ dates, size, onClick: hide })}
          />
        </Drop>
      )}
    </>
  );
};

ChatLogCalendar.propTypes = {
  char: PropTypes.string.isRequired,
  setCurrrentDate: PropTypes.func.isRequired,
  currentDate: PropTypes.string,
  size: PropTypes.string,
};

ChatLogCalendar.defaultProps = {
  currentDate: undefined,
  size: 'medium',
};

export default ChatLogCalendar;
