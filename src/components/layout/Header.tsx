import { Box, Header, ResponsiveContext, Text, type ThemeType } from 'grommet';
import { Settings } from 'lucide-react';
import { lazy, useContext } from 'react';
import { useNavigate } from 'react-router';
import styled, { css } from 'styled-components';
import { convertHslToHsla, getColor, transparentBlack, transparentWhite } from '../../utils/themeUtils';
import InternalLink from '../common/InternalLink';

export const Search = lazy(() => import('../search/Search'));

/* const gradient1 = css`
  background-image:
    linear-gradient(
      180deg,
      transparent 7%,
      #fff5 8%,
      #fff5 9%,
      transparent 10%,
      transparent 15%,
      #0005 16%,
      #0005 17%,
      #00000013 18%,
      transparent 50%,
      #ffffff13 82%,
      #fff5 83%,
      #fff5 84%,
      transparent 85%,
      transparent 90%,
      #0005 91%,
      #0005 92%,
      transparent 93%
    );
`; */

const gradient2 = (props: { theme: ThemeType }) => {
  const brandColor = getColor('brand')(props);
  const brandColor50 = convertHslToHsla(brandColor, 30);

  return css`
    background-image:
      linear-gradient(90deg,
        ${brandColor50} 20%,
        transparent 50%,
        ${brandColor50} 80%
      ),
      linear-gradient(
        180deg,
        transparent 0%,
        ${transparentWhite(12)} 33.33%,
        transparent 50%,
        ${transparentBlack(9)} 66.67%,
        transparent 100%
      );

    background-size: auto, auto 33.33%;
    background-repeat: no-repeat, repeat-y;
  `;
};

const StickyHeader = styled(Header)`
  user-select: none;
  position: sticky;
  align-items: center;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  ${gradient2}
`;

const AppHeader = (props: { [key: string]: unknown}) => {
  const size = useContext(ResponsiveContext);
  const navigate = useNavigate();

  return (
    <StickyHeader
      pad={{ horizontal: 'large' }}
      background="brand"
      elevation="medium"
      height={size === 'small' ? '52px' : '56px'}
      data-testid="app-header"
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
