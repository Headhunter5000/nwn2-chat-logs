import { Card, CardBody, CardFooter, CardHeader, Nav, Text } from 'grommet';
import { lazy, useContext } from 'react';
import styled, { css } from 'styled-components';

import { buildCharacterUrl } from '../../utils/navigation';
import { ChatLogsContext } from '../../utils/statsContext';
import { Date } from '../common/DateTime';
import InternalLink from '../common/InternalLink';
import { Character } from './Character';
import DeleteButton from './DeleteButton';

const ImportDropzone = lazy(() => import('../import/ImportDropzone'));

const Flex = styled.div(({ theme }) => css`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.global.edgeSize.large};
`);

interface CharacterListProps {
  name: string;
  dates: string[];
  count: number; 
}

const CharacterList = () => {
  const { stats } = useContext(ChatLogsContext);

  return stats.map(({ name, dates, count }: CharacterListProps) => (
    <Card
      height="12em"
      width="12em"
      background="light-1"
      key={name}
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
  ));
};

const Characters = () => (
  <Flex data-testid="char-menu">
    <CharacterList />
    <ImportDropzone />
  </Flex>
);

export default Characters;
