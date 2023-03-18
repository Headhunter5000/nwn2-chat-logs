import { Header, Menu, Text } from 'grommet';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useCharacterMenu from '../utils/useCharacterMenu';

const StickyHeader = styled(Header)`
  position: sticky;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
`;

const AppHeader = props => {
  const navigate = useNavigate();
  const items = useCharacterMenu();

  return (
    <StickyHeader
      pad={{ left: 'large', right: 'medium' }}
      background="brand"
      elevation="medium"
      height="xxsmall"
      data-testid="app-header"
      {...props}
    >
      <Text
        size="large"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        NWN2 Chat Logs
      </Text>
      {items.length > 0 && (
        <Menu
          label="Characters"
          items={items}
        />
      )}
    </StickyHeader>
  );
};

export default AppHeader;
