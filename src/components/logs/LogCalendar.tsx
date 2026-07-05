/* eslint-disable react-hooks/refs */
import { Button, Calendar, Drop } from 'grommet';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { LuCalendar } from 'react-icons/lu';
import { useNavigate } from 'react-router';

import { ChatLogsContext } from '../../utils/contextProviders/StatsContext';
import { getDateFromISOString, getIsoStringFromDate } from '../../utils/dateUtils';
import { buildCharacterUrl } from '../../utils/navigation';
import CalendarDay from '../common/CalendarDay';

interface createCalendarDaysProps {
  dates: string[];
  size: string;
  onClick: (e: React.MouseEvent) => void;
}

interface createCalendarDayProps {
  date: Date;
  day: number;
}

const createCalendarDays = ({ dates, size, onClick }: createCalendarDaysProps) => 
  ({ date: currentDate, day, ...props }: createCalendarDayProps) => {
    const isMarked = !!dates?.find(date =>
      getDateFromISOString(getIsoStringFromDate(currentDate)) === date,
    );
    return <CalendarDay {...{ ...props, day, size, isMarked, onClick }} />;
  };

const LogCalendar = ({ char, currentDate, size = 'medium' }: {
  char: string,
  currentDate: string,
  size?: string,
}) => {
  const navigate = useNavigate();
  const { statsByChar } = useContext(ChatLogsContext);
  const [visible, setVisible] = useState(false);
  const targetRef = useRef<HTMLInputElement | null>(null);

  const { dates, firstDate, lastDate } = useMemo(
    () => statsByChar[char] ?? {},
    [char, statsByChar],
  );

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  return (
    <>
      <div ref={targetRef}>
        <Button
          label={currentDate}
          icon={<LuCalendar size={20} />}
          onClick={show}
        />
      </div>
      {visible && targetRef.current && (
        <Drop
          target={targetRef.current}
          onClickOutside={hide}
          onEsc={hide}
          stretch={false}
        >
          <Calendar
            size={size}
            margin={size}
            animate={false}
            daysOfWeek={true}
            firstDayOfWeek={1}
            bounds={[firstDate, lastDate]}
            date={getIsoStringFromDate(currentDate)}
            onSelect={date => navigate(buildCharacterUrl(
              char,
              getDateFromISOString(Array.isArray(date) ? date[0] : date),
            ))}
          >
            {createCalendarDays({ dates, size, onClick: hide })}
          </Calendar>
        </Drop>
      )}
    </>
  );
};

export default LogCalendar;
