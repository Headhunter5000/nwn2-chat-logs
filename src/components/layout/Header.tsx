import { Box, Header, ResponsiveContext, Text } from 'grommet';
import { Settings } from 'lucide-react';
import { lazy, useContext } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import InternalLink from '../common/InternalLink';

export const Search = lazy(() => import('../search/Search'));

const StickyHeader = styled(Header)`
  user-select: none;
  position: sticky;
  align-items: center;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
`;

const AppHeader = (props: { [key: string]: unknown}) => {
  const size = useContext(ResponsiveContext);
  const navigate = useNavigate();

  return (
    <StickyHeader
      id="app-header"
      data-testid="app-header"
      pad={{ horizontal: 'large' }}
      background="brand"
      elevation="medium"
      height={size === 'small' ? '52px' : '56px'}
      {...props}
    >
      <Text
        size={size === 'small' ? 'medium' : 'large'}
        style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
        onClick={() => navigate('/')}
      >
        NWN2 Chat Logs
      </Text>

      <Box direction="row" align="center" gap="medium">
        <Search />
        <InternalLink
          to="settings"
          icon={<Settings size={20} />}
          color="text"
        />
      </Box>
    </StickyHeader>
  );
};

export default AppHeader;
