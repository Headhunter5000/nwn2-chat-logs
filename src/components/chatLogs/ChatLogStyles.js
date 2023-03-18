import { createGlobalStyle } from 'styled-components';

const ChatLogStyles = createGlobalStyle`
  .hide-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .message-type-dialog {
    color: #777;
  }

  .message-type-tell {
    color: blue;
  }

  .text-speech {
    color: black;
  }

  .text-emote {
    color: green;
  }

  .text-ooc {
    color: purple;
  }
`;

export default ChatLogStyles;
