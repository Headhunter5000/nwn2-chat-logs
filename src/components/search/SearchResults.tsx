import { Text } from 'grommet';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { SearchColumn, SearchLimit } from '../../types/SearchColumn';
import { useFilteredChatLogs } from '../../utils/dbUtils';
import SearchOptions from './SearchOptions';
import SearchTable from './SearchTable';

const SearchResults = ({ search = '', hide } : { search: string, hide: () => void }) => {
  const { t } = useTranslation();
  const [searchColumn, setSearchColumn] = useState<SearchColumn>('plainMessage');
  const [limit, setLimit] = useState<SearchLimit>(50);

  const data = useFilteredChatLogs(search, searchColumn, limit);

  if (!data) {
    return <Text>{t('common.loading')}</Text>;
  }

  if (data.length === 0) {
    return <Text>{t('component.search.no_results')}</Text>;
  }

  const count = data.length;
  const suffix = data.length === limit ? '+' : '';

  return (
    <>
      <Text margin={{ bottom: 'large' }}>{t('component.search.results', { count, suffix })}</Text>
      <SearchOptions {...{ searchColumn, setSearchColumn, limit, setLimit }} />
      <SearchTable {...{ data, limit, hide }} />
    </>
  );
};

export default SearchResults;
