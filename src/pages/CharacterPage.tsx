import { PageHeader } from 'grommet';
import { useContext, useEffect, useMemo } from 'react';
import { LuArrowLeft } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router';

import InternalLink from '../components/common/InternalLink';
import LogCalendar from '../components/logs/LogCalendar';
import LogItem from '../components/logs/LogItem';
import type { AggregatedStatsByChar } from '../types/AggregatedStats';
import { ChatLogsContext } from '../utils/contextProviders/StatsContext';
import { buildCharacterUrl } from '../utils/navigation';

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
        parent={<InternalLink icon={<LuArrowLeft size={20} />} to="/">back</InternalLink>}
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
