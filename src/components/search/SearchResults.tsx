import { DataTable, Text } from 'grommet';
import { useMemo } from 'react';

import { useFilteredChatLogs } from '../../utils/dbUtils';
import type { SearchFilterProps } from '../../utils/dbUtils/searchFilters';
import { buildCharacterUrl } from '../../utils/navigation';
import ColoredText from '../common/ColoredText';
import InternalLink from '../common/InternalLink';
import MessageText from '../common/MessageText';

const getColumns = (hide: () => void) =>  [
  {
    property: 'date',
    header: 'Date',
    size: '7em',
    render: ({ owner, date, messageIndex }: SearchFilterProps) => (
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
    render: ({ char }: SearchFilterProps) => <ColoredText>{char}</ColoredText>,
  },
  {
    property: 'plainMessage',
    header: 'Message',
    size: '30em',
    render: ({ type, message }: SearchFilterProps) => <MessageText {...{ type, message }} />,
  },
];

const SearchResults = ({ search = '', hide } : { search: string, hide: () => void }) => {
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

export default SearchResults;
