import { RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Grommet } from 'grommet';

import theme from './config/theme';
import router from './config/router';
import { ChatLogsProvider } from './utils/chatLogsContext';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const App = () =>  (
  <Grommet {...{ theme }} full>
    <GlobalStyle />
    <ChatLogsProvider>
      <RouterProvider router={router} />
    </ChatLogsProvider>
  </Grommet>
);

export default App;
