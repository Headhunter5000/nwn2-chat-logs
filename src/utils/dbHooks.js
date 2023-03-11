import { useLiveQuery } from 'dexie-react-hooks';

import db from '../config/db';
import getChatLogRegex from '../regex/chatlog';
import getChatLogFileRegex from '../regex/chatlogFile';

export const useChars = () => useLiveQuery(
  () => db.chats.orderBy('char').keys().then(chars => chars?.reduce(
    (acc, name) => {
      const index = acc.findIndex(c => c.name === name);

      if (index === -1) acc.push({ name, count: 1 });
      else acc[index].count += 1;

      return acc;
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name))
  ),
  undefined,
  [],
);

const useLogsOfChar = char => useLiveQuery(
  () => db.chats.where('char').equals(char).toArray(),
);

export const addChatLog = async ({ file, text }) => {
  const match = file.match(getChatLogFileRegex());

  if (!match) {
    throw new Error('File name has wrong format');
  }

  if (typeof text !== 'string' || !/\[(\d{2}:\d{2})\]/.test(text.substring(0, 7))) {
    throw new Error('File is not a string');
  }

  if (await db.chats.where('file').equals(file).count() !== 0) {
    throw new Error('File already exists');
  }

  const [, char, date] = match;

  const messages = [...text.matchAll(getChatLogRegex())]
    .map(([, time, user, char, type, message], index) => ({
      id: index + 1,
      time,
      user,
      char,
      type,
      message,
    }));

  return await db.chats.add({
    file,
    char,
    date,
    messages,
  });
};

export const deleteChatLogsOfChar = char =>
  db.chats.where('char').equals(char).delete();

export default useLogsOfChar;
