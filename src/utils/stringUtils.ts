import {
  BRACE_CLOSE,
  BRACE_OPEN,
  HTML_TAGS,
  LINE_BREAK,
  STAR,
} from '../regex/message';

export const caseInsensitiveIndexOf = (text: string, search: string) =>
  text.toLowerCase().indexOf(search.toLowerCase());

export const caseInsensitiveIncludes = (text: string, search: string) =>
  caseInsensitiveIndexOf(text, search) !== -1;

export const getMessageId = (file: string, index: number) =>
  `${file} / ${String(index).padStart(4, '0')}`;

export const formatSearchMessage = (message: string, search: string) => {
  const matchIndex = caseInsensitiveIndexOf(message, search);

  if (matchIndex !== -1) {
    const searchLength = search.length;

    const beforeStr = message.substring(0, matchIndex);
    const matchStr = message.substring(matchIndex, matchIndex + searchLength);
    const afterStr = message.substring(matchIndex + searchLength);

    return `${beforeStr}<strong>${matchStr}</strong>${afterStr}`;
  }

  return message;
};

export const formatCroppedSearchMessage = (message: string, search: string, maxLength = 60) => {
  const matchIndex = caseInsensitiveIndexOf(message, search);

  const searchLength = search.length;
  const messageLength = message.length;

  if (matchIndex !== -1) {
    const totalContextSpace = Math.max(0, maxLength - searchLength);

    let leftCount = Math.floor(totalContextSpace / 2);
    let rightCount = Math.ceil(totalContextSpace / 2);

    const availableLeft = matchIndex;
    const availableRight = messageLength - (matchIndex + searchLength);

    if (availableLeft < leftCount) {
      const unusedLeft = leftCount - availableLeft;
      leftCount = availableLeft;
      rightCount = Math.min(availableRight, rightCount + unusedLeft);
    } else if (availableRight < rightCount) {
      const unusedRight = rightCount - availableRight;
      rightCount = availableRight;
      leftCount = Math.min(availableLeft, leftCount + unusedRight);
    }

    const beforeIndexStart = matchIndex - leftCount;
    const afterIndexEnd = matchIndex + searchLength + rightCount;

    const beforePrefix = beforeIndexStart === 0 ? '' : '&hellip;';
    const afterSuffix = afterIndexEnd === messageLength ? '' : '&hellip;';

    const beforeStr = message.substring(beforeIndexStart, matchIndex);
    const matchStr = message.substring(matchIndex, matchIndex + searchLength);
    const afterStr = message.substring(matchIndex + searchLength, afterIndexEnd);

    return `${beforePrefix}${beforeStr}<strong>${matchStr}</strong>${afterStr}${afterSuffix}`;
  }

  if (messageLength > maxLength) {
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
