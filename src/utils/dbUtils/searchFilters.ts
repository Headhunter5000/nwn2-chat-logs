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

const escapeRegExp = (text: string): string => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const finalFilterLogs2 = (search: string, searchColumn: SearchColumn, limit: number) =>
  (logs: ChatLog[]) => {
    const filteredLogs: SearchFilterProps[] = [];
    const hasLimit = limit > 0;

    const searchRegex = new RegExp(escapeRegExp(search), 'i');

    // Äußere Schleife läuft vorwärts (respektiert die Dexie-Sortierung)
    for (let i = 0; i < logs.length; i++) {
      if (hasLimit && filteredLogs.length >= limit) {
        break;
      }

      const { char: owner, date, messages } = logs[i];

      // Innere Schleife läuft rückwärts (neueste Nachricht im Log zuerst)
      for (let messageIndex = messages.length - 1; messageIndex >= 0; messageIndex--) {
        if (hasLimit && filteredLogs.length >= limit) {
          break;
        }

        const message = messages[messageIndex];
        const column = message[searchColumn];

        if (typeof column === 'string' && searchRegex.test(column)) {
          filteredLogs.push({
            ...message,
            owner,
            date,
            messageIndex, // Korrekter Original-Index aus dem Array
            formattedChar: message.char ? formatSearchMessage(message.char, search) : '',
            formattedMessage: formatCroppedSearchMessage(message.plainMessage, search),
          });
        }
      }
    }

    return filteredLogs;
  };
