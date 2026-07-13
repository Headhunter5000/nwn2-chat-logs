import { Paragraph } from 'grommet';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import Characters from '../components/characters/Characters';
import FormattedTrans from '../components/common/FormattedTrans';
import PageHeader from '../components/common/PageHeader';
import PageLoader from '../components/common/PageLoader';
import { ChatLogsContext } from '../utils/contextProviders/StatsContext';

const CustomParagraph = styled(Paragraph)`
  max-width: '30em';
`;

const LandingPage = () => {
  const { t } = useTranslation();
  const { stats, isLoading } = useContext(ChatLogsContext);
  const statsCount = stats.length;

  if (isLoading) return <PageLoader />;

  if (statsCount > 0) {
    return (
      <>
        <PageHeader title={t('page.landing.has_logs.heading', { count: statsCount })} size="small"  />
        <CustomParagraph margin={{ top: 'none', bottom: 'large' }}>
          {t('page.landing.has_logs.text')}
        </CustomParagraph>
        <Characters />
      </>
    );
  }

  return (
    <>
      <PageHeader title={t('page.landing.no_logs.heading')} size="small"  />
      {['page.landing.no_logs.text1', 'page.landing.no_logs.text2', 'page.landing.no_logs.text3'].map(i18nKey => (
        <CustomParagraph margin={{ top: 'none', bottom: 'large' }}>
          <FormattedTrans {...{ i18nKey }} />
        </CustomParagraph>
      ))}
      <Characters />
    </>
  );
};

export default LandingPage;
