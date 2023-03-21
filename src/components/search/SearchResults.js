import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DataTable, Text } from 'grommet';

import { useFilteredChatLogs } from '../../utils/dbUtils';
import { buildCharacterUrl } from '../../utils/navigation';
import InternalLink from '../common/InternalLink';
import ColoredText from '../common/ColoredText';
import MessageText from '../common/MessageText';

const getColumns = hide =>  [
  {
    property: 'date',
    header: 'Date',
    size: '7em',
    render: ({ owner, date, messageIndex }) => (
      <Text>
        <InternalLink
          to={buildCharacterUrl(owner, date, messageIndex)}
          onClick={hide}
        >
          {date}
        </InternalLink>
      </Text>
    ),
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

const SearchResults = ({ search, hide }) => {
  const data = useFilteredChatLogs(search, 50);

  const columns = useMemo(() => getColumns(hide), [hide]);

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
      pad: {
        header: {
          vertical: 'none', right: 'medium',
        },
        body: {
          vertical: 'medium', right: 'medium',
        },
      },
      size: '25.5em',
      columns,
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
