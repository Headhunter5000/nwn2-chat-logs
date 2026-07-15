import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  #app-root {
    overflow-y: scroll;
  }

  .nowrap {
    white-space: nowrap;
  }

  .break {
    word-wrap: break-word;
  }
`;

export default GlobalStyle;