import { expectNotToEqualJSON, expectToEqualJSON } from '../utils/testUtils';
import CHAT_LOG_FILE_PATTERN from './chatlogFile';

const VALID_FILE_NAME_CHAR = 'TestChar';
const VALID_FILE_NAME_DATE = '2018-01-01';
const VALID_FILE = `${VALID_FILE_NAME_CHAR} (Chatlog) ${VALID_FILE_NAME_DATE}.log`;

const INVALID_FILE_NAME_CHAR = 'TestChar';
const INVALID_FILE_NAME_DATE = '2018-01-01';
const INVALID_FILE = `${INVALID_FILE_NAME_CHAR} (Combatlog) ${INVALID_FILE_NAME_DATE}.log`;

describe('CHAT_LOG_FILE_PATTERN', () => {
  test('regex pattern is valid', () => {
    expect(CHAT_LOG_FILE_PATTERN).toBeInstanceOf(RegExp);
  });

  test('matches file name', () => {
    const expected = [
      VALID_FILE,
      VALID_FILE_NAME_CHAR,
      VALID_FILE_NAME_DATE,
    ];

    const actual = VALID_FILE.match(CHAT_LOG_FILE_PATTERN);

    expectToEqualJSON(actual, expected);
  });

  test('not matches file name', () => {
    const expected = [
      INVALID_FILE,
      INVALID_FILE_NAME_CHAR,
      INVALID_FILE_NAME_DATE,
    ];

    const actual = INVALID_FILE.match(CHAT_LOG_FILE_PATTERN);

    expectNotToEqualJSON(actual, expected);
  });
});
