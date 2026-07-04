import { useContext } from 'react';
import { Heading, Paragraph } from 'grommet';

import { ChatLogsContext } from '../utils/statsContext';
import Characters from '../components/characters/Characters';

const LandingPageHeading = () => {
  const { stats } = useContext(ChatLogsContext);

  return (
    <Heading level="3" margin={{ top: 'large' }}>
      {stats.length > 0
        ? `You have chat logs of ${stats.length} characters`
        : 'Import some chat logs'
      }
    </Heading>
  );
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
