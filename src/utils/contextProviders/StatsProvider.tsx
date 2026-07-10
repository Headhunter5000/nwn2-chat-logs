import { useMemo } from 'react';
import { useChatLogStats } from '../dbUtils';
import { ChatLogsContext } from './StatsContext';

export const ChatLogsProvider = ({ children }: { children? : React.ReactNode} ) => {
  const originalStats = useChatLogStats();

  const isLoading = originalStats === undefined;

  const stats = useMemo(
    () => originalStats ?? [],
    [originalStats],
  );

  const statsByChar = useMemo(
    () => stats.reduce((acc, { name, ...rest }) => ({ ...acc, [name]: rest }), {}),
    [stats],
  );

  return (
    <ChatLogsContext.Provider value={{
      stats,
      statsByChar,
      isLoading,
    }}>
      {children}
    </ChatLogsContext.Provider>
  );
};
