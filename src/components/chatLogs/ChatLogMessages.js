import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { DataTable, Text } from 'grommet';
import ColorHash from 'color-hash';

import formatHtmlMessage from '../../utils/formatHtmlMessage';
import formatPlainMessage from '../../utils/formatPlainMessage';

const colorHash = new ColorHash();

const ChatLogMessagePropTypes = {
  id: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  user: PropTypes.string,
  char: PropTypes.string,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

const ColoredText = styled(Text)(({ children }) => css`
  color: ${colorHash.hex(typeof children === 'string' ? children : '')};
`);

const MessageText = ({ type, message }) => (
  <Text>
    <span
      className={`message-type-${type.toLowerCase()}`}
      dangerouslySetInnerHTML={{ __html: message }}
    />
  </Text>
);

MessageText.propTypes = {
  type: ChatLogMessagePropTypes.type,
  message: ChatLogMessagePropTypes.message,
};

const ChatLogMessages = ({ messages, 'data-testid': testId }) => {
  const formattedMessages = useMemo(() => {
    return messages.map(entry => ({
      ...entry,
      plainMessage: formatPlainMessage(entry.message),
      message: formatHtmlMessage(entry.message),
    }));
  }, [messages]);

  return (
    <DataTable
      primaryKey="id"
      verticalAlign={{ body: 'top' }}
      pad={{ vertical: 'medium', right: 'medium' }}
      step={100}
      columns={[
        {
          property: 'time',
          header: 'Time',
          size: 'xsmall',
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
      ]}
      data={formattedMessages}
      data-testid={testId}
    />
  );
};

ChatLogMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    ...ChatLogMessagePropTypes,
  })).isRequired,
  'data-testid': PropTypes.string,
};

ChatLogMessages.defaultProps = {
  'data-testid': undefined,
};

export default ChatLogMessages;
