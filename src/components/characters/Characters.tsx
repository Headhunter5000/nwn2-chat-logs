import { Box } from 'grommet';
import { lazy, useContext } from 'react';

import { ChatLogsContext } from '../../utils/contextProviders/StatsContext';
import CharacterCard from './CharacterCard';

const ImportDropzone = lazy(() => import('../import/ImportDropzone'));

const Characters = () => {
  const { stats } = useContext(ChatLogsContext);
  return (
    <Box direction="row" gap={{ row:'large', column: 'large' }} wrap data-testid="char-menu">
      {stats.map(stat => <CharacterCard {...stat} key={stat.name} />)}
      <ImportDropzone />
    </Box>
  );
};

export default Characters;
