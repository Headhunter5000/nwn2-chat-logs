import { Header, Menu, Text } from 'grommet';
import { useNavigate } from 'react-router-dom';

import useCharacterMenu from '../utils/useCharacterMenu';

const MainHeader = props => {
  const navigate = useNavigate();
  const items = useCharacterMenu();

  return (
    <Header
      background="brand"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation="medium"
      {...props}
    >
      <Text
        size="large"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        NWN2 Chat Logs
      </Text>
      <Menu
        label="Characters"
        items={items}
      />
    </Header>
  );
};

export default MainHeader;
