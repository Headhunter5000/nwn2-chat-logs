
import { Grommet } from 'grommet';
import { RouterProvider } from 'react-router';

import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import router from '../config/router';
import theme from '../config/theme';
import { SettingsContext } from '../utils/contextProviders/SettingsContext';
import { SettingsProvider } from '../utils/contextProviders/SettingsProvicer';
import { ChatLogsProvider } from '../utils/contextProviders/StatsProvider';
import BackgroundTexture from './layout/BackgroundTexture';
import GlobalStyle from './layout/GlobalStyle';

const ThemedContainer = () => {
  const { i18n } = useTranslation();
  const { themeMode } = useContext(SettingsContext);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Grommet
      theme={theme}
      themeMode={themeMode}
      id="app-root"
      full
    >
      <GlobalStyle />
      <BackgroundTexture />
      <RouterProvider router={router} />
    </Grommet>
  );
};

const App = () => (
  <ChatLogsProvider>
    <SettingsProvider>
      <ThemedContainer />
    </SettingsProvider>
  </ChatLogsProvider>
);

export default App;
