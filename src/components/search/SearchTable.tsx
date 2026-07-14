import { DataTable, Text } from 'grommet';
import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import type { SearchFilterProps } from '../../utils/dbUtils/searchFilters';
import { buildCharacterUrl } from '../../utils/navigation';
import ColoredText from '../common/ColoredText';
import { Date } from '../common/Date';
import InternalLink from '../common/InternalLink';
import MessageText from '../common/MessageText';

const getColumns = (t : (i18nKey: string) => string, hide: () => void) =>  [
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
    size: '30em',
    render: ({ type, formattedMessage: message }: SearchFilterProps) =>
      <MessageText {...{ type, message }} />,
  },
];

const SearchTable = ({ data, hide } : { data: SearchFilterProps[], hide: () => void }) => {
  const { t } = useTranslation();
  const columns = useMemo(() => getColumns(t, hide), [t, hide]);

  return (
    <DataTable {...{
      primaryKey: 'id',
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
      columns,
      data,
    }} />
  );
};

export default SearchTable;
