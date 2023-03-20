import CHAT_LOG_PATTERN from '../regex/chatlog';
import CHAT_LOG_FILE_PATTERN from '../regex/chatlogFile';
import { addChatLog, geChatLogIdByFileName, updateChatLogById } from './dbUtils';
import formatPlainMessage from './formatPlainMessage';
import { getMessageId } from './stringUtils';

export const addOrUpdateChatLog = async ({ file, text }) => {
  const match = file.match(CHAT_LOG_FILE_PATTERN);

  if (!match) {
    throw new Error('File name has wrong format');
  }

  if (typeof text !== 'string' || !/\[(\d{2}:\d{2})\]/.test(text.substring(0, 7))) {
    throw new Error('File is not a string');
  }

  const [, char, date] = match;

  CHAT_LOG_PATTERN.lastIndex = 0;

  const messages = [...text.matchAll(CHAT_LOG_PATTERN)]
    .map(([, time, user, char, type, message], index) => ({
      id: getMessageId(file, index),
      time,
      user,
      char,
      type,
      message,
      plainMessage: formatPlainMessage(message),
    }));

  const existingId = await geChatLogIdByFileName(file);

  if (existingId) {
    return await updateChatLogById(existingId, messages);
  }

  return await addChatLog({
    file,
    char,
    date,
    messages,
  });
};
