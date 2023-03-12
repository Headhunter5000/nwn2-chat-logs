import { useParams } from 'react-router-dom';
import { PageHeader } from 'grommet';

import { useLogsOfChar } from '../utils/dbHooks';
import ChatLogs from '../components/ChatLogs';
import InternalLink from '../components/InternalLink';

const CharacterPage = () => {
  const { char } = useParams();
  const logs = useLogsOfChar(char);
  const count = logs?.length;

  const renderedHeader = (
    <>
      <PageHeader
        title={char.replace('_', ' ')}
        subtitle={count ? `${count} logs` : 'Loading...'}
        parent={<InternalLink to="/">&larr; back</InternalLink>}
      />
    </>
  );

  if (!Array.isArray(logs)) {
    return renderedHeader;
  }

  if (count > 0) {
    return (
      <>
        {renderedHeader}
        <ChatLogs {...{ logs }} />
      </>
    );
  }

  throw new Response('Not Found', { status: 404 });
};

export default CharacterPage;
