import CHAT_LOG_PATTERN from '../regex/chatlog';
import CHAT_LOG_FILE_PATTERN from '../regex/chatlogFile';
import { addChatLog, getChatLogIdByFileName, updateChatLogById } from './dbUtils';
import { formatPlainMessage, getMessageId } from './stringUtils';

const importLogFile = async (file: string, text: unknown) => {
  const match = file.match(CHAT_LOG_FILE_PATTERN);

  if (!match) {
    throw new Error('File name has wrong format');
  }

  if (typeof text !== 'string') {
    throw new Error('File is not a string');
  }

  // Ensure the content starts with a timestamp in `[HH:MM]` format.
  if (!/^\[\d{2}:\d{2}\]/.test(text)) {
    throw new Error('Missing timestamp');
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

  const existingId = await getChatLogIdByFileName(file);

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

export default importLogFile;
