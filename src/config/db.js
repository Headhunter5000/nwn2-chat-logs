import Dexie from 'dexie';

const db = new Dexie('nwn2-logs');

db.version(3).stores({
  chats: '++id, file, date, [char+date]',
});

export default db;
