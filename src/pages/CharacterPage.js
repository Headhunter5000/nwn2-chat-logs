
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from 'grommet';
import { FormPreviousLink } from 'grommet-icons';

import ChatLogItem from '../components/chatLogs/ChatLogItem';
import InternalLink from '../components/common/InternalLink';
import ChatLogCalendar from '../components/chatLogs/ChatLogCalendar';
import ChatLogStyles from '../components/chatLogs/ChatLogStyles';
import { ChatLogsContext } from '../utils/statsContext';

const renderedHeader = ({ char, count }) => (
  <>
    <PageHeader
      title={char.replace('_', ' ')}
      subtitle={count ? `${count} logs` : 'Loading...'}
      parent={<InternalLink icon={<FormPreviousLink />} to="/">back</InternalLink>}
    />
  </>
);

const CharacterPage = () => {
  const { char } = useParams();
  const { statsByChar, isLoaded } = useContext(ChatLogsContext);
  const [currentDate, setCurrrentDate] = useState();

  const { lastDate, count } = useMemo(
    () => (statsByChar ?? {})[char] ?? {},
    [char, statsByChar]
  );

  const header = useMemo(
    () => renderedHeader({ char, count }),
    [char, count]
  );

  useEffect(() => {
    if (!currentDate && lastDate) {
      setCurrrentDate(lastDate);
    }
  }, [setCurrrentDate, currentDate, lastDate]);

  if (isLoaded && !lastDate) {
    throw new Response('Not Found', { status: 404 });
  }

  if (currentDate) {
    return (
      <>
        {header}
        <ChatLogStyles />
        <ChatLogCalendar {...{ char, currentDate, setCurrrentDate }} />
        <ChatLogItem {...{ char, date: currentDate }} />
      </>
    );
  }

  return header;
};

export default CharacterPage;
