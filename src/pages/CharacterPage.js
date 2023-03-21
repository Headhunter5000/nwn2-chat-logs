import { useContext, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormPreviousLink } from 'grommet-icons';
import { PageHeader } from 'grommet';

import { ChatLogsContext } from '../utils/statsContext';
import { buildCharacterUrl } from '../utils/navigation';
import InternalLink from '../components/common/InternalLink';
import LogCalendar from '../components/logs/LogCalendar';
import LogItem from '../components/logs/LogItem';

const getStatsOfChar = (statsByChar, char) =>
  (statsByChar ?? {})[char] ?? {};

const CharacterPage = () => {
  const navigate = useNavigate();
  const { char, date, index } = useParams();
  const { statsByChar, isLoaded } = useContext(ChatLogsContext);

  const { lastDate, count } = useMemo(
    () => getStatsOfChar(statsByChar, char),
    [char, statsByChar],
  );

  useEffect(() => {
    if (!date && lastDate) {
      navigate(buildCharacterUrl(char, lastDate), { replace: true });
    }
  }, [char, date, lastDate, navigate]);

  if (isLoaded && !lastDate) {
    throw new Response('Not Found', { status: 404 });
  }

  return (
    <>
      <PageHeader
        title={char}
        subtitle={count ? `${count} logs` : 'Loading...'}
        parent={<InternalLink icon={<FormPreviousLink />} to="/">back</InternalLink>}
      />
      {date && (
        <>
          <LogCalendar {...{ char, currentDate: date }} />
          <LogItem {...{ char, date, index }} />
        </>
      )}
    </>
  );
};

export default CharacterPage;
