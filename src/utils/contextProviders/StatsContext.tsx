import { createContext } from 'react';

import type { AggregatedStats, AggregatedStatsByChar } from '../../types/AggregatedStats';

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
