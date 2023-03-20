import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DataTable, Text } from 'grommet';
import { useSearchParams } from 'react-router-dom';

import MessagePropTypes from '../../config/propTypes/messagePropTypes';
import formatHtmlMessage from '../../utils/formatHtmlMessage';
import { getMessageId } from '../../utils/stringUtils';
import ColoredText from '../common/ColoredText';

const PAGINATE = true;
const STEP_SIZE = 50;

const MessageText = ({ type, message }) => (
  <Text>
    <span
      className={`message-type-${type.toLowerCase()}`}
      dangerouslySetInnerHTML={{ __html: message }}
    />
  </Text>
);

MessageText.propTypes = {
  type: MessagePropTypes.type,
  message: MessagePropTypes.message,
};

const LogMessages = ({ file, messages, 'data-testid': testId }) => {
  const [params] = useSearchParams();
  const index = params.get('index');

  const formattedMessages = useMemo(() => {
    return messages.map(({ message, ...rest }) => ({
      ...rest,
      message: formatHtmlMessage(message),
    }));
  }, [messages]);

  const show = useMemo(() => {
    if (!index) return undefined;

    return Number(index);
  }, [index]);

  const rowProps = useMemo(() => {
    if (!index) return undefined;

    return {
      [getMessageId(file, index)]: { background: 'black' },
    };
  }, [file, index]);

  return (
    <DataTable
      primaryKey="id"
      verticalAlign={{ body: 'top' }}
      pad={{ vertical: 'medium', right: 'medium' }}
      key={show}
      show={show}
      rowProps={rowProps}
      paginate={PAGINATE}
      step={STEP_SIZE}
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

LogMessages.propTypes = {
  file: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    ...MessagePropTypes,
  })).isRequired,
  'data-testid': PropTypes.string,
};

LogMessages.defaultProps = {
  'data-testid': undefined,
};

export default LogMessages;
