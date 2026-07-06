import { Box, Card, CardBody, CardFooter, CardHeader, Nav, Text } from 'grommet';
import { lazy, useContext } from 'react';

import type { AggregatedStats } from '../../types/AggregatedStats';
import { ChatLogsContext } from '../../utils/contextProviders/StatsContext';
import { buildCharacterUrl } from '../../utils/navigation';
import { Date } from '../common/DateTime';
import InternalLink from '../common/InternalLink';
import { Character } from './Character';
import DeleteButton from './DeleteButton';

const ImportDropzone = lazy(() => import('../import/ImportDropzone'));

const CharacterInfo = ({ name, dates, count } : AggregatedStats) => (
  <Card
    height="12em"
    width="12em"
    background="surface"
    elevation="medium"
    data-testid={`char-menu-item-${name}`}
  >
    <CardHeader pad={{ horizontal: 'medium', top: 'medium' }}>
      <Character {...{ name, count }} />
    </CardHeader>
    <CardBody pad="medium">
      <Text size="small" margin={{ bottom: 'small' }}>Latest logs:</Text>
      <Nav gap="small">
        {dates.slice(-4).map(date => (
          <InternalLink to={buildCharacterUrl(name, date)} key={date}>
            <Date date={date} />
          </InternalLink>
        ))}
      </Nav>
    </CardBody>
    <CardFooter pad={{ horizontal: 'medium', bottom: 'medium' }} justify="end">
      <DeleteButton {...{ name, onlyIcon: true, size: 'small' }} />
    </CardFooter>
  </Card>
);

const Characters = () => {
  const { stats } = useContext(ChatLogsContext);
  return (
    <Box direction="row" gap="large" data-testid="char-menu">
      {stats.map(stat => <CharacterInfo {...stat} key={stat.name} />)}
      <ImportDropzone />
    </Box>
  );
};

export default Characters;
