import { useLiveQuery } from 'dexie-react-hooks';

import db from '../../config/db';
import aggregateStats from './aggregateStats';
import { finalFilterLogs, preFilterLogs } from './searchFilters';

export const useChatLogStats = () => useLiveQuery(
  () => db.chats.orderBy('[char+date]').keys().then(aggregateStats),
);

export const useChatLogOfCharAndDate = (char, date) => useLiveQuery(
  () => db.chats.where({ char, date }).first(),
  [char, date],
);

export const useChatLogsOfChar = char => useLiveQuery(
  () => db.chats.where({ char }).sortBy('date'),
  [char],
);

export const useFilteredChatLogs = (search, limit) => useLiveQuery(
  () => db.chats
    .orderBy('date')
    .reverse()
    .filter(preFilterLogs(search))
    .limit(20)
    .toArray()
    .then(finalFilterLogs(search, limit)),
  [search],
);

export const geChatLogIdByFileName = file =>
  db.chats.where({ file }).primaryKeys().then(
    ids => ids?.[0],
  );

export const addChatLog = ({ file, char, date, messages }) =>
  db.chats.add({
    file,
    char,
    date,
    messages,
  });

export const updateChatLogById = (id, messages) =>
  db.chats.update(id, { messages });

export const deleteChatLogsByChar = char =>
  db.chats.where('char').equals(char).delete();
