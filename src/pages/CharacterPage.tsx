
import { ResponsiveContext } from 'grommet';
import { useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import PageHeader from '../components/common/PageHeader';
import LogCalendar from '../components/logs/LogCalendar';
import LogLoader from '../components/logs/LogLoader';
import type { AggregatedStatsByChar } from '../types/AggregatedStats';
import { ChatLogsContext } from '../utils/contextProviders/StatsContext';
import { buildCharacterUrl } from '../utils/navigation';

const getStatsOfChar = (statsByChar: AggregatedStatsByChar, char: string) => {
  if (char in statsByChar) return statsByChar[char];
  return { lastDate: null, count: 0 };
};

const CharacterPage = () => {
  const { t } = useTranslation();
  const size = useContext(ResponsiveContext);
  const navigate = useNavigate();
  const { char, date, index } = useParams<{ char: string, date?: string, index?: string }>();
  const { statsByChar, isLoading } = useContext(ChatLogsContext);

  const { lastDate, count } = useMemo(
    () => getStatsOfChar(statsByChar, char!),
    [char, statsByChar],
  );

  useEffect(() => {
    if (!date && lastDate) {
      navigate(buildCharacterUrl(char!, lastDate), { replace: true });
    }
  }, [char, date, lastDate, navigate]);

  if (!char || (!isLoading && !lastDate)) {
    throw new Response('Not Found', { status: 404 });
  }

  const calendarSize = size === 'small' ? 'small' : 'medium';

  return (
    <>
      <PageHeader
        title={char}
        subtitle={count
          ? t('page.character.logs_count', { count })
          : t('common.loading')
        }
        backLink="/"
      />
      {date && (
        <>
          <LogCalendar {...{ char, currentDate: date, size: calendarSize }} />
          <LogLoader {...{ char, date, index }} />
        </>
      )}
    </>
  );
};

export default CharacterPage;
