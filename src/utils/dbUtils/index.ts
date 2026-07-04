import { useLiveQuery } from 'dexie-react-hooks';
import db from '../../config/db';
import type { ChatLog } from '../../types/ChatLog';
import aggregateStats, { type NameAndDate } from './aggregateStats';
import { finalFilterLogs, preFilterLogs } from './searchFilters';

export const useChatLogStats = () =>
  useLiveQuery(() =>
    db.chats
      .orderBy('[char+date]')
      .keys(keys => keys as unknown as NameAndDate[])
      .then(aggregateStats),
  );

export const useChatLogOfCharAndDate = (
  char: string,
  date: string,
): ChatLog | undefined =>
  useLiveQuery(
    () => db.chats.where({ char, date }).first(),
    [char, date],
  );

export const useChatLogsOfChar = (char: string): ChatLog[] | undefined =>
  useLiveQuery(
    () => db.chats.where({ char }).sortBy('date'),
    [char],
  );

export const useFilteredChatLogs = (
  search: string,
  limit: number,
) =>
  useLiveQuery(
    () =>
      db.chats
        .orderBy('date')
        .reverse()
        .filter(preFilterLogs(search))
        .limit(20)
        .toArray()
        .then(finalFilterLogs(search, limit)),
    [search],
  );

export const getChatLogIdByFileName = (
  file: string,
): Promise<number | undefined> =>
  db.chats
    .where({ file })
    .primaryKeys()
    .then(ids => ids?.[0] as number | undefined);

export const addChatLog = ({
  file,
  char,
  date,
  messages,
}: ChatLog): Promise<number> =>
  db.chats.add({
    file,
    char,
    date,
    messages,
  });

export const updateChatLogById = (
  id: number,
  messages: unknown[],
): Promise<number> =>
  db.chats.update(id, { messages });

export const deleteChatLogsByChar = (char: string): Promise<number> =>
  db.chats.where('char').equals(char).delete();