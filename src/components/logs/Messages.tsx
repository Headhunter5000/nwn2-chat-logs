import { DataTable, Text, type ColumnConfig, type PaginationProps } from 'grommet';
import { useEffect, useMemo, useState } from 'react';

import type { ChatLog, ChatLogMessage } from '../../types/ChatLog';
import { formatHtmlMessage } from '../../utils/formatHtmlMessage';
import { scrollToTop } from '../../utils/scroll';
import { getMessageId } from '../../utils/stringUtils';
import ColoredText from '../common/ColoredText';
import MessageText from '../common/MessageText';
import ScrollToMessage from './ScrollToMessage';

const PAGINATE = { onClick: () => scrollToTop(true) };
const STEP_SIZE = 50;

const COLUMNS = [
  {
    property: 'time',
    header: 'Time',
    size: 'xsmall',
    render: ({ time, index }: { time: string; index: number }) =>
      <Text id={`message-${index}`}>{time}</Text>,
  },
  {
    property: 'user',
    header: 'User',
    size: 'medium',
    render: ({ user }: { user: string }) => <ColoredText>{user}</ColoredText>,
  },
  {
    property: 'char',
    header: 'Character',
    size: 'medium',
    render: ({ char }: { char: string }) => <ColoredText>{char}</ColoredText>,
  },
  {
    property: 'type',
    header: 'Type',
    size: 'small',
  },
  {
    property: 'plainMessage',
    header: 'Message',
    size: '60%',
    search: true,
    render: ({ type, message }: { type: string; message: string }) =>
      <MessageText {...{ type, message }} />,
  },
];

const applyMessageAdditions = (messages: ChatLogMessage[]) => messages.map(
  ({ message, ...rest }, index) => ({
    ...rest,
    index,
    message: formatHtmlMessage(message),
  }),
);

const getRowProps = (file: string, messageIndex?: number) => {
  if (typeof messageIndex === 'number') {
    return {
      [getMessageId(file, messageIndex)]: {
        background: 'black',
        extend: 'color: red',
      },
    };
  }

  return undefined;
};

type LogMessagesProps =
  Pick<ChatLog, 'file' | 'date' | 'messages'> &
  { messageIndex?: number, dataTestId: string }

const LogMessages = ({ file, date, messages, messageIndex, dataTestId }: LogMessagesProps) => {
  const data = useMemo(
    () => applyMessageAdditions(messages),
    [messages],
  );

  const rowProps = useMemo(
    () => getRowProps(file, messageIndex),
    [file, messageIndex],
  );

  const [mKey, setMKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof messageIndex === 'number' && messageIndex >= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMKey(`${date}${messageIndex}-0`);
      const id1 = setTimeout(() => setMKey(`${date}${messageIndex}-1`), 100);
      const id2 = setTimeout(() => setMKey(`${date}${messageIndex}-2`), 500);
      
      return () => {
        clearTimeout(id1);
        clearTimeout(id2);
      };
    }
    setMKey(undefined);
  }, [date, messageIndex]);

  return (
    <>
      <DataTable {...{
        'data-testid': dataTestId,
        primaryKey: 'id',
        verticalAlign: { body: 'top' },
        pad: { vertical: 'medium', right: 'medium' },
        key: messageIndex ? mKey || messageIndex : undefined,
        show: messageIndex,
        rowProps,
        paginate: PAGINATE as PaginationProps,
        step: STEP_SIZE,
        columns: COLUMNS as ColumnConfig<ChatLogMessage>[],
        data,
      }} />
      <ScrollToMessage index={messageIndex} />
    </>
  );
};

export default LogMessages;
