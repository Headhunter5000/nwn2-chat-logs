import { Box } from 'grommet';
import { lazy, useContext } from 'react';

import { ChatLogsContext } from '../../utils/contextProviders/StatsContext';

const CharacterCard = lazy(() => import('./CharacterCard'));
const ImportDropzone = lazy(() => import('../import/ImportDropzone'));

const Characters = () => {
  const { stats } = useContext(ChatLogsContext);
  return (
    <Box direction="row" gap="large" wrap data-testid="char-menu">
      {stats.map(stat => <CharacterCard {...stat} key={stat.name} />)}
      <ImportDropzone />
    </Box>
  );
};

export default Characters;
