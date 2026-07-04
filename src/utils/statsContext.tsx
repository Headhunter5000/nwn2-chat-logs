import { createContext, useMemo } from 'react';
import { useChatLogStats } from './dbUtils';

import type { AggregatedStats, AggregatedStatsByChar  } from "../types/AggregatedStats";

export interface ChatLogContextProps {
  stats: AggregatedStats[];
  statsByChar: AggregatedStatsByChar;
  isLoaded: boolean;
}

export const ChatLogsContext = createContext<ChatLogContextProps>({
  stats: [],
  statsByChar: {},
  isLoaded: false,
});

export const ChatLogsProvider = ({ children }: { children? : React.ReactNode} ) => {
  const originalStats = useChatLogStats();

  const isLoaded = originalStats !== undefined;

  const stats = useMemo(
    () => originalStats ?? [],
    [originalStats],
  );

  const statsByChar: AggregatedStatsByChar = useMemo(
    () => stats.reduce((acc: AggregatedStatsByChar, { name, ...rest }) => ({ ...acc, [name]: rest }), {}),
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
