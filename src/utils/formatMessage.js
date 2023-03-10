import {
  BRACE_CLOSE,
  BRACE_OPEN,
  COLOR_END_TAG,
  COLOR_TAG_EMOTE,
  COLOR_TAG_SPEECH,
  LINE_BREAK_LAST_ONE,
  LINE_BREAK_NOT_LAST_ONE,
  STAR,
  STAR_NESTED_TAGS,
} from '../regex/message';

const formatMessage = message => message
  .replace(LINE_BREAK_LAST_ONE, '')
  .replace(LINE_BREAK_NOT_LAST_ONE, '<br />')
  .replace(COLOR_END_TAG, '</span>')
  .replace(COLOR_TAG_SPEECH, '<span class="text-speech">')
  .replace(COLOR_TAG_EMOTE, '<span class="text-emote">')
  .replace(STAR, '<span class="text-emote">*</span>')
  .replace(STAR_NESTED_TAGS, '<span class="text-emote">*</span>')
  .replace(BRACE_OPEN, '<span class="text-ooc">(')
  .replace(BRACE_CLOSE, ')</span>');

export default formatMessage;
