export const caseInsensitiveIndexOf = (text, search) =>
  text.toLowerCase().indexOf(search.toLowerCase());

export const caseInsensitiveIncludes = (text, search) =>
  caseInsensitiveIndexOf(text, search) !== -1;

export const highlightString = (text, search, maxLength = 60) => {
  const matchIndex = caseInsensitiveIndexOf(text, search);

  const searchLength = search.length;
  const textLength = text.length;
  const padLeft = Math.floor((maxLength - searchLength) / 2);
  const padRight = Math.ceil((maxLength - searchLength) / 2);

  if (matchIndex !== -1) {
    const beforeIndexStart = Math.max(0, matchIndex - padLeft);
    const beforeIndexEnd = matchIndex;
    const beforePrefix = beforeIndexStart === 0 ? '' : '&hellip;';

    const matchIndexStart = matchIndex;
    const matchIndesEnd = matchIndex + searchLength;

    const afterIndexStart = matchIndex + searchLength;
    const afterIndexEnd = Math.min(textLength, matchIndex + searchLength + padRight);
    const afterSuffix = afterIndexEnd === textLength ? '' : '&hellip;';

    const beforeStr = text.substring(beforeIndexStart, beforeIndexEnd);
    const matchStr = text.substring(matchIndexStart, matchIndesEnd);
    const afterStr = text.substring(afterIndexStart, afterIndexEnd);

    return `${beforePrefix}${beforeStr}<strong>${matchStr}</strong>${afterStr}${afterSuffix}`;
  }

  return text;
};

export const getMessageId = (file, index) => `${file} / ${String(index).padStart(4, 0)}`;
