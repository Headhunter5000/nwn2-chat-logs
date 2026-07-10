import { Paragraph } from 'grommet';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Characters from '../components/characters/Characters';
import FormattedTrans from '../components/common/FormattedTrans';
import PageHeader from '../components/common/PageHeader';
import PageLoader from '../components/common/PageLoader';
import { ChatLogsContext } from '../utils/contextProviders/StatsContext';

const LandingPage = () => {
  const { t } = useTranslation();
  const { stats, isLoading } = useContext(ChatLogsContext);
  const statsCount = stats.length;

  const heading = statsCount > 0
    ? t('page.landing.has_logs.heading', { count: statsCount })
    : t('page.landing.no_logs.heading');

  const text = statsCount > 0
    ? t('page.landing.has_logs.text')
    : <FormattedTrans i18nKey="page.landing.no_logs.text" />;

  if (isLoading) return <PageLoader />;

  return (
    <>
      <PageHeader title={heading} size="small"  />
      <Paragraph margin={{ top: 'none', bottom: 'large' }} style={{ maxWidth: '30em' }}>
        {text}
      </Paragraph>
      <Characters />
    </>
  );
};

export default LandingPage;
