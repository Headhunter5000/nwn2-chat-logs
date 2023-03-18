const TIME_PATTERN = '\\[(\\d{2}:\\d{2})\\]';
const USER_NAME_PATTERN = '(?:\\[([^\\]]+)\\])?';
const CHAR_NAME_PATTERN = '([^\\[]*)?';
const TYPE_PATTERN = '\\[(Dialog|Talk|Tell|ServerTell)\\]';
const MESSAGE_PATTERN = '([^\\[]*)?';

const CHAT_LOG_PATTERN_STRING =
  `${TIME_PATTERN}\\s*`+
  `${USER_NAME_PATTERN}\\s*`+
  `${CHAR_NAME_PATTERN}:\\s*`+
  `${TYPE_PATTERN}\\s*`+
  `${MESSAGE_PATTERN}`+
  '(?:\\r\\n|\\r|\\n|$)';

const CHAT_LOG_PATTERN = new RegExp(CHAT_LOG_PATTERN_STRING, 'gmi');

export default CHAT_LOG_PATTERN;
