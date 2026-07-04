import { useMemo } from 'react';
import { useChatLogStats } from './dbUtils';
import { ChatLogsContext } from './statsContext';

export const ChatLogsProvider = ({ children }: { children? : React.ReactNode} ) => {
  const originalStats = useChatLogStats();

  const isLoaded = originalStats !== undefined;

  const stats = useMemo(
    () => originalStats ?? [],
    [originalStats],
  );

  const statsByChar = useMemo(
    () => stats.reduce((acc, { name, ...rest }) => ({ ...acc, [name]: rest }), {}),
    [stats],
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
