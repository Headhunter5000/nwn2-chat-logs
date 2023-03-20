import { useContext, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormPreviousLink } from 'grommet-icons';
import { PageHeader } from 'grommet';

import { ChatLogsContext } from '../utils/statsContext';
import InternalLink from '../components/common/InternalLink';
import LogItem from '../components/logs/LogItem';
import LogCalendar from '../components/logs/LogCalendar';
import LogStyles from '../components/logs/LogStyles';

const renderedHeader = ({ char, count }) => (
  <>
    <PageHeader
      title={char.replace('_', ' ')}
      subtitle={count ? `${count} logs` : 'Loading...'}
      parent={<InternalLink icon={<FormPreviousLink />} to="/">back</InternalLink>}
    />
  </>
);

const CharacterPage = () => {
  const { char, date } = useParams();
  const navigate = useNavigate();
  const { statsByChar, isLoaded } = useContext(ChatLogsContext);

  const { lastDate, count } = useMemo(
    () => (statsByChar ?? {})[char] ?? {},
    [char, statsByChar]
  );

  const header = useMemo(
    () => renderedHeader({ char, count }),
    [char, count]
  );

  useEffect(() => {
    if (!date && lastDate) {
      navigate(`/characters/${char}/${lastDate}`, { replace: true });
    }
  }, [char, date, lastDate, navigate]);

  if (isLoaded && !lastDate) {
    throw new Response('Not Found', { status: 404 });
  }

  if (date) {
    return (
      <>
        {header}
        <LogStyles />
        <LogCalendar {...{ char, currentDate: date }} />
        <LogItem {...{ char, date }} />
      </>
    );
  }

  return header;
};

export default CharacterPage;
