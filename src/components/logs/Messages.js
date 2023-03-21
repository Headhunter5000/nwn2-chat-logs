import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DataTable, Text } from 'grommet';

import MessagePropTypes from '../../config/propTypes/messagePropTypes';
import { formatHtmlMessage } from '../../utils/stringUtils';
import { getMessageId } from '../../utils/stringUtils';
import { scrollToTop } from '../../utils/scroll';
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
    render: ({ time, index }) => <Text id={`message-${index}`}>{time}</Text>,
  },
  {
    property: 'user',
    header: 'User',
    size: 'medium',
    render: datum => <ColoredText>{datum.user}</ColoredText>,
  },
  {
    property: 'char',
    header: 'Character',
    size: 'medium',
    render: datum => <ColoredText>{datum.char}</ColoredText>,
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
    render: ({ type, message }) => <MessageText {...{ type, message }} />,
  },
];

const applyMessageAdditions = messages => messages.map(
  ({ message, ...rest }, index) => ({
    ...rest,
    index,
    message: formatHtmlMessage(message),
  })
);

const getRowProps = (file, messageIndex) => {
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

const LogMessages = ({ file, messages, messageIndex, ...rest }) => {
  const data = useMemo(
    () => applyMessageAdditions(messages),
    [messages]
  );

  const rowProps = useMemo(
    () => getRowProps(file, messageIndex),
    [file, messageIndex]
  );

  return (
    <>
      <DataTable {...{
        ...rest,
        primaryKey: 'id',
        verticalAlign: { body: 'top' },
        pad: { vertical: 'medium', right: 'medium' },
        key: messageIndex,
        show: messageIndex,
        rowProps,
        paginate: PAGINATE,
        step: STEP_SIZE,
        columns: COLUMNS,
        data,
      }} />
      <ScrollToMessage index={messageIndex} />
    </>
  );
};

LogMessages.propTypes = {
  file: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    ...MessagePropTypes,
  })).isRequired,
  messageIndex: PropTypes.number,
};

LogMessages.defaultProps = {
  messageIndex: undefined,
};

export default LogMessages;
