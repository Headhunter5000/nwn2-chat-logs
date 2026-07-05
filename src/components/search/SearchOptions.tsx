import { Box, RadioButtonGroup, Text } from 'grommet';
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
  <Box direction="row-responsive" gap={{ row: 'medium', column: 'xlarge' }} margin={{ bottom: 'small' }}flex={false}>
    <Box gap="medium">
      <Text>Column</Text>
      <RadioButtonGroup
        name="searchColumn"
        direction="row"
        gap="medium"
        margin={{ bottom: 'medium' }}
        options={COLUMN_OPTIONS}
        value={searchColumn}
        onChange={event => setSearchColumn(event.target.value as SearchColumn)}
      />
    </Box>
    <Box gap="medium">
      <Text>Limit</Text>
      <RadioButtonGroup
        name="searchColumn"
        direction="row"
        gap="medium"
        margin={{ bottom: 'medium' }}
        options={LIMIT_OPTIONS}
        value={limit}
        onChange={event => setLimit(Number(event.target.value) as SearchLimit)}
      />
    </Box>
  </Box>
);

export default SearchOptions;