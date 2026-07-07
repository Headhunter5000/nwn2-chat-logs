import { Grommet } from 'grommet';
import { RouterProvider } from 'react-router';
import { createGlobalStyle } from 'styled-components';

import { useContext } from 'react';
import router from '../config/router';
import theme from '../config/theme';
import { SettingsContext } from '../utils/contextProviders/SettingsContext';
import { SettingsProvider } from '../utils/contextProviders/SettingsProvicer';
import { ChatLogsProvider } from '../utils/contextProviders/StatsProvider';
import { getGrainyColorImage } from '../utils/themeUtils';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  #app-root {
    background-image: url("${getGrainyColorImage('background')}");
    background-attachment: local;
    background-repeat: repeat;
  }
`;

const ThemedContainer = () => {
  const { themeMode } =  useContext(SettingsContext);
  return (
    <Grommet
      theme={theme}
      themeMode={themeMode}
      id="app-root"
      full
    >
      <GlobalStyle />
      <RouterProvider router={router} />
    </Grommet>
  );
};

const App = () =>  (
  <ChatLogsProvider>
    <SettingsProvider>
      <ThemedContainer />
    </SettingsProvider>
  </ChatLogsProvider>
);

export default App;
