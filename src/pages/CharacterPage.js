/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import { Box, PageHeader, Text } from 'grommet';

import ChatLogs from '../components/ChatLogs';
import InternalLink from '../components/InternalLink';
import useLogsOfChar from '../utils/dbHooks';

const CharacterPage = () => {
  const { char } = useParams();
  const logs = useLogsOfChar(char);

  if (!Array.isArray(logs)) {
    return (
      <>
        <Box direction="row">
          <InternalLink to="/">&larr; back</InternalLink>
        </Box>
        <Text margin={{ top: 'large' }}>Loading...</Text>
      </>
    );
  }

  if (logs.length >= 1) {
    return (
      <>
        <Box direction="row">
          <InternalLink to="/">&larr; back</InternalLink>
        </Box>
        <PageHeader title={char.replace('_', ' ')} />
        <ChatLogs {...{ logs }} />
      </>
    );
  }

  throw new Response('Not Found', { status: 404 });
};

export default CharacterPage;
