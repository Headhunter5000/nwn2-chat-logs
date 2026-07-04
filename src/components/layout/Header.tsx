import { Header, Text } from 'grommet';
import { lazy } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

export const Search = lazy(() => import('../search/Search'));

const StickyHeader = styled(Header)`
  position: sticky;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
`;

const AppHeader = (props: { [key: string]: unknown}) => {
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
        <span>NWN2 Chat Logs</span>
        <Text size="small" as="sup" margin={{ left: 'small' }}>v{__APP_VERSION__}</Text>
      </Text>

      <Search />
    </StickyHeader>
  );
};

export default AppHeader;
