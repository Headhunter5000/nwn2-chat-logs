import { Button, Header, Nav, ResponsiveContext, Text } from 'grommet';
import { Settings } from 'lucide-react';
import { lazy, useContext } from 'react';
import { useTranslation } from 'react-i18next';
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

const AppTitle = () => {
  const navigate = useNavigate();
  const size = useContext(ResponsiveContext);

  return (
    <Text
      size={size === 'small' ? 'medium' : 'large'}
      style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
      onClick={() => navigate('/')}
    >
        NWN2 Chat Logs
    </Text>
  );
};

const SettingsNav = () => {
  const { t } = useTranslation();
  const size = useContext(ResponsiveContext);

  return (
    <InternalLink
      to="settings"
      ui={Button}
      icon={<Settings size={20} />}
      plain
    >
      {size === 'small' ? undefined : t('page.settings.heading')}
    </InternalLink>
  );
};

const AppHeader = () => {
  const size = useContext(ResponsiveContext);

  return (
    <StickyHeader
      id="app-header"
      data-testid="app-header"
      background="brand"
      elevation="medium"
      gap="large"
      pad={{ horizontal: 'large' }}
      height={size === 'small' ? '52px' : '56px'}
    >
      <AppTitle />
      <Nav direction="row" align="center" gap="large">
        <Search />
        <SettingsNav />
      </Nav>
    </StickyHeader>
  );
};

export default AppHeader;
