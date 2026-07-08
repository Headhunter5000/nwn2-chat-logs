import { Text } from 'grommet';
import { useState } from 'react';
import type { SearchColumn, SearchLimit } from '../../types/SearchColumn';
import SearchOptions from './SearchOptions';
import SearchTable from './SearchTable';

import { useFilteredChatLogs } from '../../utils/dbUtils';

const SearchResults = ({ search = '', hide } : { search: string, hide: () => void }) => {
  const [searchColumn, setSearchColumn] = useState<SearchColumn>('plainMessage');
  const [limit, setLimit] = useState<SearchLimit>(50);

  const data = useFilteredChatLogs(search, searchColumn, limit);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  if (data.length === 0) {
    return <Text>No results found</Text>;
  }

  const countInfo = `${data.length}${data.length === limit ? '+' : ''}`;

  return (
    <>
      <Text margin={{ bottom: 'large' }}>{countInfo} results</Text>
      <SearchOptions {...{ searchColumn, setSearchColumn, limit, setLimit }} />
      <SearchTable {...{ data, limit, hide }} />
    </>
  );
};

export default SearchResults;
