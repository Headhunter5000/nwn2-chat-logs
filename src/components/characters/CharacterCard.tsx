import { Card, CardBody, CardFooter, CardHeader, Nav, Text } from 'grommet';

import type { AggregatedStats } from '../../types/AggregatedStats';
import { buildCharacterUrl } from '../../utils/navigation';
import { Date } from '../common/DateTime';
import InternalLink from '../common/InternalLink';
import { Character } from './Character';
import DeleteButton from './DeleteButton';

const CharacterCard = (
  { name, dates, count }:
  Pick<AggregatedStats, 'name' | 'dates' | 'count'>,
) => (
  <Card
    height="12em"
    width="12em"
    background="surface"
    data-testid={`char-menu-item-${name}`}
  >
    <CardHeader pad={{ horizontal: 'medium', top: 'medium' }}>
      <Character {...{ name, count }} />
    </CardHeader>
    <CardBody pad="medium">
      <Text size="small" margin={{ bottom: 'small' }}>Latest logs:</Text>
      <Nav gap="small">
        {dates.slice(-4).map(date => (
          <InternalLink
            data-testid="char-log-date"
            to={buildCharacterUrl(name, date)}
            key={date}
          >
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

export default CharacterCard;
