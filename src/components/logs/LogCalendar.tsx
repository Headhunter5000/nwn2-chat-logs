import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Drop, Button } from 'grommet';
import { FormCalendar } from 'grommet-icons';

import { getDateFromISOString, getIsoStringFromDate } from '../../utils/dateUtils';
import { ChatLogsContext } from '../../utils/statsContext';
import CalendarDay from '../common/CalendarDay';
import { buildCharacterUrl } from '../../utils/navigation';

const createCalendarDay = ({ dates, size, onClick }: { dates: string[], size: string, onClick: Function }) => ({ date: currentDate, ...props }: { date: Date }) => {
  const isMarked = dates?.find(date => getDateFromISOString(getIsoStringFromDate(currentDate)) === date);
  return <CalendarDay {...{ ...props, size, isMarked, onClick }} />;
};

const LogCalendar = ({ char, currentDate, size = 'medium' }: {
  char: string,
  currentDate: string,
  size: string,
}) => {
  const navigate = useNavigate();
  const { statsByChar } = useContext(ChatLogsContext);
  const [visible, setVisible] = useState(false);
  const targetRef = useRef(null);

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
          ref={targetRef}
        />
      </div>
      {visible && targetRef.current && (
        <Drop
          target={targetRef.current}
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
            onSelect={date => navigate(buildCharacterUrl(char, getDateFromISOString(date)))}
            // eslint-disable-next-line react/no-children-prop
            children={createCalendarDay({ dates, size, onClick: hide })}
          />
        </Drop>
      )}
    </>
  );
};

export default LogCalendar;
