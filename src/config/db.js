import Dexie from 'dexie';

const db = new Dexie('nwn2-logs');

db.version(2).stores({
  chats: '++id, file, [char+date]',
});

export default db;
