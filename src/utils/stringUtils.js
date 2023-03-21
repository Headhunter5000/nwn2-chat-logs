import {
  BRACE_CLOSE,
  BRACE_OPEN,
  COLOR_END_TAG,
  COLOR_TAG_EMOTE,
  COLOR_TAG_SPEECH,
  HTML_TAGS,
  LINE_BREAK,
  LINE_BREAK_LAST_ONE,
  LINE_BREAK_NOT_LAST_ONE,
  STAR,
  STAR_NESTED_TAGS,
} from '../regex/message';

export const caseInsensitiveIndexOf = (text, search) =>
  text.toLowerCase().indexOf(search.toLowerCase());

export const caseInsensitiveIncludes = (text, search) =>
  caseInsensitiveIndexOf(text, search) !== -1;

export const getMessageId = (file, index) => `${file} / ${String(index).padStart(4, 0)}`;

export const formatSearchMessage = (message, search, maxLength = 60) => {
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

export const formatHtmlMessage = message => message
  .replace(LINE_BREAK_LAST_ONE, '')
  .replace(LINE_BREAK_NOT_LAST_ONE, '<br />')
  .replace(COLOR_END_TAG, '</span>')
  .replace(COLOR_TAG_SPEECH, '<span class="text-speech">')
  .replace(COLOR_TAG_EMOTE, '<span class="text-emote">')
  .replace(STAR, '<span class="text-emote">*</span>')
  .replace(STAR_NESTED_TAGS, '<span class="text-emote">*</span>')
  .replace(BRACE_OPEN, '<span class="text-ooc">(')
  .replace(BRACE_CLOSE, ')</span>');

export const formatPlainMessage = message => message
  .replace(HTML_TAGS, '')
  .replace(LINE_BREAK, '')
  .replace(STAR, '')
  .replace(BRACE_OPEN, '')
  .replace(BRACE_CLOSE, '');
