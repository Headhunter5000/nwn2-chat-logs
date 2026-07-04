import { Grommet, type ThemeType } from 'grommet';
import { RouterProvider } from 'react-router';
import { createGlobalStyle } from 'styled-components';

import router from '../config/router';
import theme from '../config/theme';
import { ChatLogsProvider } from '../utils/statsProvider';

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
