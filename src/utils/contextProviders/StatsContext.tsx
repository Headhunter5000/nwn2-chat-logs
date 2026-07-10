import { createContext } from 'react';

import type { AggregatedStats, AggregatedStatsByChar } from '../../types/AggregatedStats';

export interface ChatLogContextProps {
  stats: AggregatedStats[];
  statsByChar: AggregatedStatsByChar;
  isLoading: boolean;
}

export const ChatLogsContext = createContext<ChatLogContextProps>({
  stats: [],
  statsByChar: {},
  isLoading: false,
});
