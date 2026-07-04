import type { ChatLog, ChatLogMessage } from '../../types/ChatLog';
import { caseInsensitiveIncludes, formatSearchMessage } from '../stringUtils';

export type SearchFilterProps = {
  owner: string,
  date: string,
  messageIndex: number,
} & ChatLogMessage;

export const preFilterLogs = (search: string) => ({ messages }: ChatLog) =>  messages.some(
  ({ plainMessage }) => caseInsensitiveIncludes(plainMessage, search)
);

export const finalFilterLogs = (search: string, limit: number) => (logs: ChatLog[]) => {
  const filteredLogs = logs
    .reduce((acc, { char: owner, date, messages }) => {
      messages
        .forEach(({ plainMessage, ...rest }, messageIndex) => {
          if (caseInsensitiveIncludes(plainMessage, search)) {
            return acc.push({
              ...rest,
              owner,
              date,
              messageIndex,
              plainMessage,
              message: formatSearchMessage(plainMessage, search),
            });
          }
        });
      return acc;
    }, [] as SearchFilterProps[]);

  if (limit > 0) {
    return filteredLogs.slice(0, limit);
  }

  return filteredLogs;
};
