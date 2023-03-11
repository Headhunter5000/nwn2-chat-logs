import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

import getChatLogRegex from '../regex/chatlog';
import getChatLogFileRegex from '../regex/chatlogFile';
import { retrieveChatLogs, storeChatLogs } from './chatLogsStorage';

export const ChatLogsContext = createContext();

export const ChatLogsProvider = ({ children }) => {
  const [chatLogs, setChatLogs] = useState(retrieveChatLogs());

  const characters = useMemo(
    () => Object.keys(chatLogs).reduce(
      (acc, key) => {
        const name = key.replace(getChatLogFileRegex(), '$1');
        const index = acc.findIndex(c => c.name === name);

        if (index === -1) {
          acc.push({ name, count: 1 });
        } else {
          acc[index].count += 1;
        }

        return acc;
      }, [])
      .sort((a, b) => a.name.localeCompare(b.name)),
    [chatLogs],
  );

  const addChatLog = ({ file, text }) => {
    if (!file.match(getChatLogFileRegex())) {
      throw new Error('File name haswrong format');
    }

    if (typeof text !== 'string' || !/\[(\d{2}:\d{2})\]/.test(text.substring(0, 7))) {
      throw new Error('File is not a string');
    }

    const parsed = [...text.matchAll(getChatLogRegex())]
      .map(([, time, user, char, type, message], index) => ({
        time, user, char, type,
        id: String(index).padStart(4, 0),
        message,
      }));

    const storage = retrieveChatLogs();

    storage[file] = parsed;

    storeChatLogs(storage);
    setChatLogs(storage);
  };

  const deleteChatLogsOfChar = char => {
    const storage = retrieveChatLogs();

    Object.keys(storage).forEach(key => {
      if (key.includes(char)) {
        delete storage[key];
      }
    });

    storeChatLogs(storage);
    setChatLogs(storage);
  };

  const value = {
    characters,
    chatLogs,
    addChatLog,
    deleteChatLogsOfChar,
  };

  return (
    <ChatLogsContext.Provider value={value}>
      {children}
    </ChatLogsContext.Provider>
  );
};

ChatLogsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
