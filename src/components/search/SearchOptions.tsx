import { Box, FormField, RadioButtonGroup } from 'grommet';
import type { SearchColumn, SearchLimit } from '../../types/SearchColumn';

const COLUMN_OPTIONS: { value: SearchColumn, label: string}[] = [
  { value: 'char', label: 'Character' },
  { value: 'plainMessage', label: 'Message' },
];

const LIMIT_OPTIONS: SearchLimit[] = [
  50, 100, 200, 500,
];

interface SearchOptionsProps {
  searchColumn: SearchColumn;
  setSearchColumn: (v: SearchColumn) => void;
  limit: SearchLimit;
  setLimit: (v: SearchLimit) => void;
}

const SearchOptions = ({ searchColumn, setSearchColumn, limit, setLimit } : SearchOptionsProps) => (
  <Box
    direction="row-responsive"
    gap={{ row: 'medium', column: 'xlarge' }}
    margin={{ bottom: 'small' }}
    flex={false}
  >
    <FormField label="Column">
      <RadioButtonGroup
        name="searchColumn"
        direction="row"
        margin={{ bottom: 'medium' }}
        options={COLUMN_OPTIONS}
        value={searchColumn}
        onChange={e => setSearchColumn(e.target.value as SearchColumn)}
      />
    </FormField>
    <FormField label="Limit">
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

export default SearchOptions;