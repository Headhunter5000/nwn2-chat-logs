import type { ChatLog, FormattedChatLogMessage } from '../../types/ChatLog';
import type { SearchColumn } from '../../types/SearchColumn';
import {
  caseInsensitiveIncludes,
  formatCroppedSearchMessage,
  formatSearchMessage,
} from '../stringUtils';

export type SearchFilterProps = {
  owner: string,
  date: string,
  messageIndex: number,
} & FormattedChatLogMessage;

export const preFilterLogs = (search: string, searchColumn: SearchColumn) =>
  ({ messages }: ChatLog) =>
    messages.some(
      ({ [searchColumn]: column }) =>
        typeof column === 'string' && caseInsensitiveIncludes(column, search),
    );

export const finalFilterLogs = (search: string, searchColumn: SearchColumn, limit: number) =>
  (logs: ChatLog[]) => {
    const filteredLogs = logs
      .reduce((acc, { char: owner, date, messages }) => {
        messages
          .forEach((message, messageIndex) => {
            const column = message[searchColumn];
            if (typeof column === 'string' && caseInsensitiveIncludes(column, search)) {
              return acc.push({
                ...message,
                owner,
                date,
                messageIndex,
                formattedChar: message.char ? formatSearchMessage(message.char, search) : '',
                formattedMessage: formatCroppedSearchMessage(message.plainMessage, search),
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
