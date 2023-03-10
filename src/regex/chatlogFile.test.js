import {expectToEqualJSON, expectNotToEqualJSON } from '../utils/expectToEqualJSON';
import getChatLogFileRegex from './chatlogFile';

const VALID_FILE_NAME_CHAR = 'TestChar';
const VALID_FILE_NAME_DATE = '2018-01-01';
const VALID_FILE = `${VALID_FILE_NAME_CHAR}_Chatlog_${VALID_FILE_NAME_DATE}.log`;

const INVALID_FILE_NAME_CHAR = 'TestChar';
const INVALID_FILE_NAME_DATE = '2018-01-01';
const INVALID_FILE = `${INVALID_FILE_NAME_CHAR}_Combatlog_${INVALID_FILE_NAME_DATE}.log`;

describe('CHAT_LOG_FILE_PATTERN', () => {
  test('regex pattern is valid', () => {
    const regex = getChatLogFileRegex();
    expect(regex).toBeInstanceOf(RegExp);
  });

  test('matches file name', () => {
    const expected = [
      VALID_FILE,
      VALID_FILE_NAME_CHAR,
      VALID_FILE_NAME_DATE,
    ];

    const actual = getChatLogFileRegex().exec(VALID_FILE);

    expectToEqualJSON(actual, expected);
  });

  test('not matches file name', () => {
    const expected = [
      INVALID_FILE,
      INVALID_FILE_NAME_CHAR,
      INVALID_FILE_NAME_DATE,
    ];

    const actual = getChatLogFileRegex().exec(INVALID_FILE);

    expectNotToEqualJSON(actual, expected);
  });
});
