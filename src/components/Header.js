import { Header, Menu, Text } from 'grommet';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useCharacterMenu from '../utils/useCharacterMenu';

const StickyHeader = styled(Header)`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const MainHeader = props => {
  const navigate = useNavigate();
  const items = useCharacterMenu();

  return (
    <StickyHeader
      pad={{ left: 'large', right: 'medium' }}
      background="brand"
      elevation="medium"
      height="xxsmall"
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

export default MainHeader;
