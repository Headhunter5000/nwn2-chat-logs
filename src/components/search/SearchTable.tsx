import { DataTable, Text } from 'grommet';
import { useMemo } from 'react';

import type { SearchFilterProps } from '../../utils/dbUtils/searchFilters';
import { buildCharacterUrl } from '../../utils/navigation';
import ColoredText from '../common/ColoredText';
import { Date } from '../common/DateTime';
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
          <Date date={date} />
        </InternalLink>
      </Text>
    ),
  },
  {
    property: 'char',
    header: 'Character',
    size: '15em',
    render: ({ char, formattedChar }: SearchFilterProps) =>
      <ColoredText value={char}>{formattedChar}</ColoredText>,
  },
  {
    property: 'plainMessage',
    header: 'Message',
    size: '30em',
    render: ({ type, formattedMessage: message }: SearchFilterProps) =>
      <MessageText {...{ type, message }} />,
  },
];

const SearchTable = ({ data, hide } : { data: SearchFilterProps[], hide: () => void }) => {
  const columns = useMemo(() => getColumns(hide), [hide]);

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

export default SearchTable;
