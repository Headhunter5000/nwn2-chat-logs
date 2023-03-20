import PropTypes from 'prop-types';
import { DataTable, Text } from 'grommet';

import MessagePropTypes from '../../config/propTypes/messagePropTypes';
import { useFilteredChatLogs } from '../../utils/dbUtils';
import InternalLink from '../common/InternalLink';
import ColoredText from '../common/ColoredText';

const getColumns = hide =>  [
  {
    property: 'date',
    header: 'Date',
    size: '7em',
    render: ({ owner, date, messageIndex }) => {
      const href = `/characters/${owner}/${date}?index=${messageIndex}`;

      return (
        <Text>
          <InternalLink
            to={href}
            onClick={hide}
          >
            {date}
          </InternalLink>
        </Text>
      );
    },
  },
  {
    property: 'char',
    header: 'Character',
    size: '15em',
    render: datum => <ColoredText>{datum.char}</ColoredText>,
  },
  {
    property: 'plainMessage',
    header: 'Message',
    size: '30em',
    render: ({ type, message }) => <MessageText {...{ type, message }} />,
  },
];

const MessageText = ({ type, message }) => (
  <Text truncate>
    <span dangerouslySetInnerHTML={{ __html: message }} />
  </Text>
);

MessageText.propTypes = {
  type: MessagePropTypes.type,
  message: MessagePropTypes.message,
};

const SearchResults = ({ search, hide }) => {
  const data = useFilteredChatLogs(search, 50);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  if (data?.length === 0) {
    return <Text>No results found</Text>;
  }

  return (
    <DataTable {...{
      primaryKey: 'id',
      verticalAlign: { body: 'top' },
      pad: { vertical: 'medium', right: 'medium' },
      size: '25.5em',
      columns: getColumns(hide),
      data,
    }} />
  );
};

SearchResults.propTypes = {
  hide: PropTypes.func.isRequired,
  search: PropTypes.string,
};

SearchResults.defaultProps = {
  search: '',
};

export default SearchResults;
