import {
  BRACE_CLOSE,
  BRACE_OPEN,
  HTML_TAGS,
  LINE_BREAK,
  STAR,
} from '../regex/message';

const formatPlainMessage = message => message
  .replace(HTML_TAGS, '')
  .replace(LINE_BREAK, '')
  .replace(STAR, '')
  .replace(BRACE_OPEN, '')
  .replace(BRACE_CLOSE, '');

export default formatPlainMessage;
