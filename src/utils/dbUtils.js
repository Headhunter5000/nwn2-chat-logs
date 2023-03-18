import { useLiveQuery } from 'dexie-react-hooks';

import db from '../config/db';

export const useChatLogStats = () => useLiveQuery(
  () => db.chats.orderBy('[char+date]').keys().then(dates => dates
    // group by char, add date and count
    .reduce(
      (acc, [name, date]) => {
        const index = acc.findIndex(c => c.name === name);

        if (index === -1) {
          acc.push({ name, dates: [date], count: 1 });
        } else {
          acc[index].dates.push(date);
          acc[index].count += 1;
        }

        return acc;
      }, [])
    // add first and last date
    .map(
      ({ name, dates, count }) => ({
        name,
        dates,
        firstDate: dates[0],
        lastDate: dates[count-1],
        count,
      })
    )
  ),
);

export const useChatLogOfCharAndDate = (char, date) => useLiveQuery(
  () => db.chats.where({ char, date }).first(),
  [char, date],
);

export const useChatLogsOfChar = char => useLiveQuery(
  () => db.chats.where({ char }).sortBy('date'),
  [char],
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
