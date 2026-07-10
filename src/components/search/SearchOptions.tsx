import { Box, FormField, RadioButtonGroup } from 'grommet';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { SearchColumn, SearchLimit } from '../../types/SearchColumn';

const getColumnOptions = (t: (i18nKey: string) => string): { value: SearchColumn, label: string}[] => ([
  { value: 'char', label: t('component.search.option.column.value.char') },
  { value: 'plainMessage', label: t('component.search.option.column.value.message') },
]);

const LIMIT_OPTIONS: SearchLimit[] = [
  50, 100, 200, 500,
];

interface SearchOptionsProps {
  searchColumn: SearchColumn;
  setSearchColumn: (v: SearchColumn) => void;
  limit: SearchLimit;
  setLimit: (v: SearchLimit) => void;
}

const SearchOptions = ({ searchColumn, setSearchColumn, limit, setLimit } : SearchOptionsProps) => {
  const { t } = useTranslation();
  const columnOptions = useMemo(() => getColumnOptions(t), [t]);

  return (
    <Box
      direction="row-responsive"
      gap={{ row: 'medium', column: 'xlarge' }}
      margin={{ bottom: 'small' }}
      flex={false}
    >
      <FormField label={t('component.search.option.column.label')}>
        <RadioButtonGroup
          name="searchColumn"
          direction="row"
          margin={{ bottom: 'medium' }}
          options={columnOptions}
          value={searchColumn}
          onChange={e => setSearchColumn(e.target.value as SearchColumn)}
        />
      </FormField>
      <FormField label={t('component.search.option.limit.label')}>
        <RadioButtonGroup
          name="searchColumn"
          direction="row"
          margin={{ bottom: 'medium' }}
          options={LIMIT_OPTIONS}
          value={limit}
          onChange={e => setLimit(Number(e.target.value) as SearchLimit)}
        />
      </FormField>
    </Box>
  );
};

export default SearchOptions;