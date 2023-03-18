import PropTypes from 'prop-types';
import { createContext, useMemo } from 'react';
import { useChatLogStats } from './dbUtils';

export const ChatLogsContext = createContext({
  stats: [],
  statsByChar: {},
  isLoaded: false,
});

export const ChatLogsProvider = ({ children }) => {
  const originalStats = useChatLogStats();

  const isLoaded = originalStats !== undefined;

  const stats = useMemo(
    () => originalStats ?? [],
    [originalStats],
  );

  const statsByChar = useMemo(
    () => stats.reduce(
      (acc, { name, ...rest }) => ({ ...acc, [name]: rest }),
      {}
    ),
    [stats]
  );

  const value = {
    stats,
    statsByChar,
    isLoaded,
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
