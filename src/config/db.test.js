import db from './db';

export const testLog = {
  file: 'TestChar (Chatlog) 2021-01-01.log',
  char: 'TestChar',
  date: '2021-01-01',
  messages: [
    {
      id: 1,
      time: '00:00',
      user: 'TestUser',
      char: 'TestChar',
      type: 'talk',
      message: 'message',
    },
  ],
};

describe('db', () => {
  test('db should exist', () => {
    expect(db).toBeDefined();
  });

  test('chats table should exist', () => {
    expect(db.chats).toBeDefined();
  });

  test('should add new entry to chats table', async () => {
    const result = await db.chats.add(testLog);
    expect(result).toEqual(1);
  });

  test('should get entry from chats table', async () => {
    const result = await db.chats.where('[char+date]')
      .equals([testLog.char, testLog.date]).first();

    expect(result).toEqual({
      ...testLog,
      id: 1,
    });
  });
});
