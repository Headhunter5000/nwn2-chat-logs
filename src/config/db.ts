import Dexie, { type Table } from 'dexie';
import type { ChatLog } from '../utils/dbUtils';

class AppDB extends Dexie {
  chats!: Table<ChatLog, number>;

  constructor() {
    super('nwn2-logs');

    this.version(1).stores({
      chats: '++id, file, char, date, [char+date]',
    });
  }
}

const db = new AppDB();

db.version(3).stores({
  chats: '++id, file, date, [char+date]',
});

export default db;
