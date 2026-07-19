import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    overflow-x: hidden;
    overflow-y: visible;
  }

  body {
    margin: 0;
  }

  #app-root {
    height: 100%;
    min-height: 100vh;
    overflow-x: hidden;
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