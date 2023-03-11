import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, css } from 'styled-components';
import { Accordion, AccordionPanel, DataTable, Text } from 'grommet';
import ColorHash from 'color-hash';

import getChatLogFileRegex from '../regex/chatlogFile';
import formatMessage from '../utils/formatMessage';
import formatPlainMessage from '../utils/formatPlainMessage';

const colorHash = new ColorHash();

const ChatLogEntryPropTypes = {
  id: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  user: PropTypes.string,
  char: PropTypes.string,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

const MessageStyles = createGlobalStyle`
  .hide-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .message-type-dialog {
    color: #777;
  }

  .message-type-tell {
    color: blue;
  }

  .text-speech {
    color: black;
  }

  .text-emote {
    color: green;
  }

  .text-ooc {
    color: purple;
  }
`;

const StickyAccordion = styled(Accordion)`
  button[aria-expanded] {
    position: sticky;
    top: 0;
    z-index: 1;
    background: white;
  }
`;

const ColoredText = styled(Text)(({ children }) => css`
  color: ${colorHash.hex(typeof children === 'string' ? children : '')};
`);

const MessageText = ({ type, message }) => (
  <span
    className={`message-type-${type.toLowerCase()}`}
    dangerouslySetInnerHTML={{ __html: message }}
  />
);

MessageText.propTypes = {
  type: ChatLogEntryPropTypes.type,
  message: ChatLogEntryPropTypes.message,
};

const ChatLogFile = ({ data }) => {
  const formattedData = useMemo(() => {
    console.log('formatting data created');
    return data.map(entry => ({
      ...entry,
      plainMessage: formatPlainMessage(entry.message),
      message: formatMessage(entry.message),
    }));
  }, [data]);

  return (
    <DataTable
      primaryKey="id"
      verticalAlign={{ body: 'top' }}
      pad={{ vertical: 'medium' }}
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
          size: 'xsmall',
        },
        {
          property: 'plainMessage',
          header: 'Message',
          size: '60%',
          search: true,
          render: ({ type, message }) => <MessageText {...{ type, message }} />,
        },
      ]}
      data={formattedData}
    />
  );
};

ChatLogFile.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    ...ChatLogEntryPropTypes,
  })).isRequired,
};

const ChatLogList = ({ logs }) => (
  <>
    <MessageStyles />
    <StickyAccordion animate={false}>
      {logs.map(({ file, data }) => {
        const label = file.replace(getChatLogFileRegex(), '$2');
        return (
          <AccordionPanel label={label} key={label}>
            <ChatLogFile {...{ data }} key={file} />
          </AccordionPanel>
        );
      })}
    </StickyAccordion>
  </>
);

ChatLogList.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.shape({
    file: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  })).isRequired,
};

export default ChatLogList;
