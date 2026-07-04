import { PageHeader } from 'grommet';
import { FormPreviousLink } from 'grommet-icons';
import { useContext, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

import InternalLink from '../components/common/InternalLink';
import LogCalendar from '../components/logs/LogCalendar';
import LogItem from '../components/logs/LogItem';
import type { AggregatedStatsByChar } from '../types/AggregatedStats';
import { buildCharacterUrl } from '../utils/navigation';
import { ChatLogsContext } from '../utils/statsContext';

const getStatsOfChar = (statsByChar: AggregatedStatsByChar, char: string) => {
  if (char in statsByChar) return statsByChar[char];
  return { lastDate: null, count: 0 };
};

const CharacterPage = () => {
  const navigate = useNavigate();
  const { char, date, index } = useParams<{ char: string, date?: string, index?: string }>();
  const { statsByChar, isLoaded } = useContext(ChatLogsContext);

  const { lastDate, count } = useMemo(
    () => getStatsOfChar(statsByChar, char!),
    [char, statsByChar],
  );

  useEffect(() => {
    if (!date && lastDate) {
      navigate(buildCharacterUrl(char!, lastDate), { replace: true });
    }
  }, [char, date, lastDate, navigate]);

  if (!char || (isLoaded && !lastDate)) {
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
