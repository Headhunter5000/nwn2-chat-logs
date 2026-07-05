import { Paragraph } from 'grommet';
import { useContext } from 'react';

import Characters from '../components/characters/Characters';
import PageHeader from '../components/common/PageHeader';
import { ChatLogsContext } from '../utils/contextProviders/StatsContext';

const LandingPageHeading = () => {
  const { stats } = useContext(ChatLogsContext);

  const title = stats.length > 0
    ? `You have chat logs of ${stats.length} characters`
    : 'Import some chat logs';

  return <PageHeader title={title} size="small"  />;
};

const LandingPage = () => (
  <>
    <LandingPageHeading />
    <Paragraph margin={{ top: 'none', bottom: 'large' }}>
        Chat logs are stored locally in browser memory.<br />
        No files are transferred to any server.
    </Paragraph>
    <Characters />
  </>
);

export default LandingPage;
