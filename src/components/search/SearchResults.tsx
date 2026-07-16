import { Box, Text } from 'grommet';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { SearchColumn, SearchLimit } from '../../types/SearchColumn';
import { useFilteredChatLogs } from '../../utils/dbUtils';
import FormattedTrans from '../common/FormattedTrans';
import SearchOptions from './SearchOptions';
import SearchTable from './SearchTable';

const SearchResultsCount = ({ count, limit }: { count: number, limit: number }) => {
  const suffix = count === limit ? '+' : '';
  return (
    <Text margin={{ top: 'large' }}>
      <FormattedTrans i18nKey="component.search.results" values={{ count, suffix }} />
    </Text>
  );
};

const SearchResults = ({ search = '', hide } : { search: string, hide: () => void }) => {
  const { t } = useTranslation();
  const [searchColumn, setSearchColumn] = useState<SearchColumn>('plainMessage');
  const [limit, setLimit] = useState<SearchLimit>(50);

  const data = useFilteredChatLogs(search, searchColumn, limit);

  if (!data) {
    return <Text>{t('common.loading')}</Text>;
  }

  const count = data.length;

  return (
    <Box
      pad="large"
      width={count > 0 ? '1080px' : undefined}
      style={{ maxHeight: 'calc(100vh - 6em)', overflow: 'hidden' }}
    >
      <SearchOptions {...{ searchColumn, setSearchColumn, limit, setLimit }} />
      <SearchResultsCount {...{ count, limit }} />
      {count > 0 && <SearchTable {...{ limit, data, hide }} />}
    </Box>
  );
};

export default SearchResults;
