import { Card, CardBody, CardFooter, CardHeader, Nav, Text } from 'grommet';

import { useTranslation } from 'react-i18next';
import type { AggregatedStats } from '../../types/AggregatedStats';
import { buildCharacterUrl } from '../../utils/navigation';
import { Date } from '../common/Date';
import InternalLink from '../common/InternalLink';
import DeleteButton from '../delete/DeleteButton';
import { Character } from './Character';

const CharacterCard = (
  { name, dates, count }:
  Pick<AggregatedStats, 'name' | 'dates' | 'count'>,
) => {
  const { t } = useTranslation();
  return (
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
        <Text size="small" margin={{ bottom: 'small' }}>
          {t('component.char_card.latest_logs')}:
        </Text>
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
};

export default CharacterCard;
