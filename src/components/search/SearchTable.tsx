import { DataTable, Text } from 'grommet';
import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import type { SearchFilterProps } from '../../utils/dbUtils/searchFilters';
import { buildCharacterUrl } from '../../utils/navigation';
import ColoredText from '../common/ColoredText';
import { Date } from '../common/Date';
import InternalLink from '../common/InternalLink';
import MessageText from '../common/MessageText';

const getColumns = (
  t : (i18nKey: string) => string,
  hide: () => void,
) =>  [
  {
    property: 'date',
    header: t('common.date'),
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
    header: t('common.char'),
    size: '15em',
    render: ({ char, formattedChar }: SearchFilterProps) =>
      <ColoredText value={char}>{formattedChar}</ColoredText>,
  },
  {
    property: 'plainMessage',
    header: t('common.message'),
    size: '100%',
    render: ({ type, formattedMessage: message }: SearchFilterProps) =>
      <MessageText {...{ type, message }} />,
  },
];

const SearchTable = (
  { data, limit, hide } :
  {
    data: SearchFilterProps[];
    limit: number;
    hide: () => void;
  },
) => {
  const { t } = useTranslation();
  const columns = useMemo(() => getColumns(t, hide), [t, hide]);

  return (
    <DataTable {...{
      primaryKey: 'id',
      key: `row-limit-${limit}`,
      verticalAlign: { body: 'top' },
      margin: {
        top: 'medium',
      },
      pad: {
        header: {
          vertical: 'none', right: 'medium',
        },
        body: {
          vertical: 'medium', right: 'medium',
        },
      },
      size: '25.5em',
      style: { width: '100%', whiteSpace: 'nowrap' },
      columns,
      data,
    }} />
  );
};

export default SearchTable;
