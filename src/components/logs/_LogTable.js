import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Data, DataTable, Text } from 'grommet';

import MessagePropTypes from '../../config/propTypes/messagePropTypes';
import formatHtmlMessage from '../../utils/formatHtmlMessage';
import ColoredText from '../common/ColoredText';
import LogStyles from './LogStyles';

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

const properties = {
  date: {
    label: 'Date',
  },
  time: {
    label: 'Time',
  },
  user: {
    label: 'User',
  },
  char: {
    label: 'Character',
  },
  type: {
    label: 'Type',
  },
  plainMessage: {
    label: 'Message',
    options: [],
  },
};

const columns = [
  {
    property: 'date',
    header: 'Date',
    size: 'small',
    render: datum => <nobr>{datum.date}</nobr>,
  },
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
    label: 'Type',
    size: 'small',
  },
  {
    property: 'plainMessage',
    header: 'Message',
    size: '50%',
    render: ({ type, message }) => <MessageText {...{ type, message }} />,
  },
];

const useMapData = logs => {
  const initialized = useRef(false);
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const start = Date.now();

      const result = logs.flatMap(
        ({ date, messages }) => messages.map(
          ({ message, ...rest }) => ({
            date,
            ...rest,
            message: formatHtmlMessage(message),
          })
        ),
      );

      console.log(`data created in ${Date.now() - start}ms`);

      setMappedData(result);
    }
  }, [logs]);

  return mappedData;
};

const LogTable = ({ logs }) => {
  const data = useMapData(logs);

  return (
    <>
      <LogStyles />
      <Data {...{
        toolbar: true,
        properties,
        data,
      }}>
        <DataTable {...{
          primaryKey: 'id',
          verticalAlign: { body: 'top' },
          pad: { vertical: 'medium', right: 'medium' },
          columns,
        }} />
      </Data>
    </>
  );
};

LogTable.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LogTable;
