import { RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Grommet } from 'grommet';

import theme from './config/theme';
import router from './config/router';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const App = () =>  (
  <Grommet {...{ theme }} full>
    <GlobalStyle />
    <RouterProvider router={router} />
  </Grommet>
);

export default App;
