import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  type TableBodyProps,
} from 'grommet';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { SearchFilterProps } from '../../utils/dbUtils/searchFilters';
import { buildCharacterUrl } from '../../utils/navigation';
import ColoredText from '../common/ColoredText';
import { Date } from '../common/Date';
import InternalLink from '../common/InternalLink';
import MessageText from '../common/MessageText';

interface TableColumn {
  property: string;
  header: React.ReactNode;
  size: string;
  render: (item: SearchFilterProps) => React.ReactNode;
}

type PatchRefForDiv<Props> = Omit<Props, 'ref' | 'style'> & {
  ref?: React.Ref<HTMLDivElement>;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const RefTableBody = TableBody as unknown as React.FC<PatchRefForDiv<TableBodyProps>>;

const ROW_HEIGHT = 48;
const MAX_VISIBLE_ROWS = 10;

const getColumns = (
  t: (i18nKey: string) => string,
  hide: () => void,
): TableColumn[] => [
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
    size: 'auto',
    render: ({ type, formattedMessage: message }: SearchFilterProps) =>
      <MessageText {...{ type, message }} />,
  },
];

const SearchTable = ({
  data,
  limit,
  hide,
}: {
  data: SearchFilterProps[];
  limit: number;
  hide: () => void;
}) => {
  'use no memo';

  const { t } = useTranslation();
  const columns = useMemo(() => getColumns(t, hide), [t, hide]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerHeight = Math.min(data.length, MAX_VISIBLE_ROWS) * ROW_HEIGHT;

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - virtualRows[virtualRows.length - 1].end : 0;

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [limit]);

  return (

    <Table
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '0',
        flex: '0 1 max-content',
      }}
      margin={{ top: 'medium' }}
    >
      <TableHeader style={{ display: 'block', flex: '0' }}>
        <TableRow style={{ display: 'flex' }}>
          {columns.map(col => (
            <TableCell
              key={col.property}
              plain
              pad={{ vertical: 'small', right: 'medium' }}
              style={{
                display: 'block',
                boxSizing: 'border-box',
                height: `${ROW_HEIGHT}px`,
                flex: col.size && col.size !== 'auto'
                  ? `0 0 ${col.size}`
                  : '1 1 auto',
              }}
            >
              <strong>{col.header}</strong>
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>

      <RefTableBody
        ref={scrollContainerRef}
        style={{
          display: 'block',
          height: `${containerHeight + ROW_HEIGHT}px`,
          overflowY: 'auto',
        }}
      >
        {paddingTop > 0 && (
          <TableRow style={{ display: 'block' }}>
            <TableCell
              colSpan={columns.length}
              style={{
                display: 'block',
                height: `${paddingTop}px`,
              }}
              plain
            />
          </TableRow>
        )}

        {virtualRows.map(virtualRow => {
          const item = data[virtualRow.index];
          if (!item) return null;

          return (
            <TableRow
              key={virtualRow.key}
              style={{ display: 'flex' }}
            >
              {columns.map(col => (
                <TableCell
                  key={col.property}
                  plain
                  pad={{ vertical: 'small', right: 'medium' }}
                  style={{
                    display: 'block',
                    boxSizing: 'border-box',
                    flex: col.size && col.size !== 'auto'
                      ? `0 0 ${col.size}`
                      : '1 1 auto',
                    height: `${ROW_HEIGHT}px`,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {col.render(item)}
                </TableCell>
              ))}
            </TableRow>
          );
        })}

        {paddingBottom > 0 && (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              style={{
                display: 'block',
                height: `${paddingBottom}px`,
              }}
              plain
            />
          </TableRow>
        )}
      </RefTableBody>
    </Table>
  );
};

export default SearchTable;