import { createGlobalStyle } from 'styled-components';

const LogMessageStyles = createGlobalStyle`
  .message-type-dialog {
    color: #777;
  }

  .message-type-tell {
    color: blue;
  }

  .text-speech {
    color: inherit;
  }

  .text-emote {
    color: green;
  }

  .text-ooc {
    color: purple;
  }
`;

export default LogMessageStyles;
