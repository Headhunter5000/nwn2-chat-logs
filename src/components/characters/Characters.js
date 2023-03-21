import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Card, CardBody, CardFooter, CardHeader, Nav, Text } from 'grommet';

import { ChatLogsContext } from '../../utils/statsContext';
import { buildCharacterUrl } from '../../utils/navigation';
import InternalLink from '../common/InternalLink';
import ImportDropzone from '../import/ImportDropzone';
import { Character } from './Character';
import DeleteButton from './DeleteButton';

const Flex = styled.div(({ theme }) => css`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.global.edgeSize.large};
`);

const CharacterList = () => {
  const { stats } = useContext(ChatLogsContext);

  return stats.map(({ name, dates, count }) => (
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
          {dates.slice(-3).map(date => (
            <InternalLink to={buildCharacterUrl(name, date)} key={date}>
              {date}
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
