import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, PageHeader } from 'grommet';

import { ChatLogsContext } from '../utils/chatLogsContext';
import ChatLogs from '../components/ChatLogs';
import InternalLink from '../components/InternalLink';

const CharacterPage = () => {
  const { char } = useParams();
  const { chatLogs } = useContext(ChatLogsContext);

  const filteredChatLogs = useMemo(
    () => Object.keys(chatLogs)
      .reduce((acc, key) => {
        if (key.includes(char))
          return [...acc, { file: key, data: chatLogs[key] }];
        return acc;
      }, [])
      .sort((a, b) => a.file.localeCompare(b.file)),
    [char, chatLogs],
  );

  if (filteredChatLogs.length >= 1) {
    return (
      <>
        <Box direction="row">
          <InternalLink to="/">&larr; back</InternalLink>
        </Box>
        <PageHeader title={char.replace('_', ' ')} />
        <ChatLogs {...{ logs: filteredChatLogs }} />
      </>
    );
  }

  throw new Response('Not Found', { status: 404 });
};

export default CharacterPage;
