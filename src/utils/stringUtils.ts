import {
  BRACE_CLOSE,
  BRACE_OPEN,
  HTML_TAGS,
  LINE_BREAK,
  STAR,
} from '../regex/message';

//import colorHash from '../config/colorHash';

export const caseInsensitiveIndexOf = (text: string, search: string) =>
  text.toLowerCase().indexOf(search.toLowerCase());

export const caseInsensitiveIncludes = (text: string, search: string) =>
  caseInsensitiveIndexOf(text, search) !== -1;

export const getMessageId = (file: string, index: number) => `${file} / ${String(index).padStart(4, '0')}`;

export const formatSearchMessage = (message: string, search: string, maxLength = 60) => {
  const matchIndex = caseInsensitiveIndexOf(message, search);

  const searchLength = search.length;
  const messageLength = message.length;
  const padLeft = Math.floor((maxLength - searchLength) / 2);
  const padRight = Math.ceil((maxLength - searchLength) / 2);

  if (matchIndex !== -1) {
    const beforeIndexStart = Math.max(0, matchIndex - padLeft);
    const beforeIndexEnd = matchIndex;
    const beforePrefix = beforeIndexStart === 0 ? '' : '&hellip;';

    const matchIndexStart = matchIndex;
    const matchIndesEnd = matchIndex + searchLength;

    const afterIndexStart = matchIndex + searchLength;
    const afterIndexEnd = Math.min(messageLength, matchIndex + searchLength + padRight);
    const afterSuffix = afterIndexEnd === messageLength ? '' : '&hellip;';

    const beforeStr = message.substring(beforeIndexStart, beforeIndexEnd);
    const matchStr = message.substring(matchIndexStart, matchIndesEnd);
    const afterStr = message.substring(afterIndexStart, afterIndexEnd);

    return `${beforePrefix}${beforeStr}<strong>${matchStr}</strong>${afterStr}${afterSuffix}`;
  }

  if(messageLength > maxLength) {
    return `${message.substring(0, maxLength)}&hellip;`;
  }

  return message;
};

export const formatPlainMessage = (message: string) => message
  .replace(HTML_TAGS, '')
  .replace(LINE_BREAK, '')
  .replace(STAR, '')
  .replace(BRACE_OPEN, '')
  .replace(BRACE_CLOSE, '');
