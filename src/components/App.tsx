import { RouterProvider } from 'react-router';
import { createGlobalStyle } from 'styled-components';
import { Grommet, type ThemeType } from 'grommet';

import theme from '../config/theme';
import router from '../config/router';
import { ChatLogsProvider } from '../utils/statsContext';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const App = () =>  (
  <Grommet theme={theme as ThemeType} id="app-root" full>
    <GlobalStyle />
    <ChatLogsProvider>
      <RouterProvider router={router} />
    </ChatLogsProvider>
  </Grommet>
);

export default App;
