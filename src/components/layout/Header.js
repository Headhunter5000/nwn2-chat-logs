import { Header, Text } from 'grommet';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Search from '../search/Search';

const StickyHeader = styled(Header)`
  position: sticky;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
`;

const AppHeader = props => {
  const navigate = useNavigate();

  return (
    <StickyHeader
      pad={{ horizontal: 'large' }}
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

      <Search />
    </StickyHeader>
  );
};

export default AppHeader;
