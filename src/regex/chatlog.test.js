import { expectToEqualJSON } from '../utils/testUtils';
import CHAT_LOG_PATTERN from './chatlog';

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const ENTRY_SRV_TIME = '12:33';
const ENTRY_SRV_USER = 'Server';
const ENTRY_SRV_CHAR = undefined;
const ENTRY_SRV_TYPE = 'ServerTell';
const ENTRY_SRV_MESSAGE = LOREM_IPSUM;
const ENTRY_SRV = `[${ENTRY_SRV_TIME}] [${ENTRY_SRV_USER}]: [${ENTRY_SRV_TYPE}] ${ENTRY_SRV_MESSAGE}`;

const ENTRY_DL_TIME = '12:34';
const ENTRY_DL_USER = undefined;
const ENTRY_DL_CHAR = undefined;
const ENTRY_DL_TYPE = 'Dialog';
const ENTRY_DL_MESSAGE = `${LOREM_IPSUM}\n${LOREM_IPSUM}\n${LOREM_IPSUM}`;
const ENTRY_DL = `[${ENTRY_DL_TIME}] : [${ENTRY_DL_TYPE}] ${ENTRY_DL_MESSAGE}`;

const ENTRY_GM_TIME = '12:35';
const ENTRY_GM_USER = undefined;
const ENTRY_GM_CHAR = 'Character_GM';
const ENTRY_GM_TYPE = 'Talk';
const ENTRY_GM_MESSAGE = `<color=white>${LOREM_IPSUM}</color>`;
const ENTRY_GM = `[${ENTRY_GM_TIME}] ${ENTRY_GM_CHAR}: [${ENTRY_GM_TYPE}] ${ENTRY_GM_MESSAGE}`;

const ENTRY_A_TIME = '12:36';
const ENTRY_A_USER = 'User Foo';
const ENTRY_A_CHAR = 'Character Bar';
const ENTRY_A_TYPE = 'Talk';
const ENTRY_A_MESSAGE = `<color=white>${LOREM_IPSUM} *</color><color=lightgreen>${LOREM_IPSUM}</color><color=white>*</color>`;
const ENTRY_A = `[${ENTRY_A_TIME}] [${ENTRY_A_USER}] ${ENTRY_A_CHAR}: [${ENTRY_A_TYPE}] ${ENTRY_A_MESSAGE}`;

const ENTRY_B_TIME = '12:37';
const ENTRY_B_USER = 'User_A';
const ENTRY_B_CHAR = 'Character_A';
const ENTRY_B_TYPE = 'Tell';
const ENTRY_B_MESSAGE = LOREM_IPSUM;
const ENTRY_B = `[${ENTRY_B_TIME}] [${ENTRY_B_USER}] ${ENTRY_B_CHAR}: [${ENTRY_B_TYPE}] ${ENTRY_B_MESSAGE}`;

describe('CHAT_LOG_PATTERN', () => {
  beforeEach(() => {
    CHAT_LOG_PATTERN.lastIndex = 0;
  });

  test('regex pattern is valid', () => {
    expect(CHAT_LOG_PATTERN).toBeInstanceOf(RegExp);
  });

  test('matches server tell entry', () => {
    const expected = [
      ENTRY_SRV,
      ENTRY_SRV_TIME,
      ENTRY_SRV_USER,
      ENTRY_SRV_CHAR,
      ENTRY_SRV_TYPE,
      ENTRY_SRV_MESSAGE,
    ];

    const actual = CHAT_LOG_PATTERN.exec(ENTRY_SRV);

    expectToEqualJSON(actual, expected);
  });

  test('matches dialog entry', () => {
    const expected = [
      ENTRY_DL,
      ENTRY_DL_TIME,
      ENTRY_DL_USER,
      ENTRY_DL_CHAR,
      ENTRY_DL_TYPE,
      ENTRY_DL_MESSAGE,
    ];

    const actual = CHAT_LOG_PATTERN.exec(ENTRY_DL);

    expectToEqualJSON(actual, expected);
  });

  test('matches game master talk entry', () => {
    const expected = [
      ENTRY_GM,
      ENTRY_GM_TIME,
      ENTRY_GM_USER,
      ENTRY_GM_CHAR,
      ENTRY_GM_TYPE,
      ENTRY_GM_MESSAGE,
    ];

    const actual = CHAT_LOG_PATTERN.exec(ENTRY_GM);

    expectToEqualJSON(actual, expected);
  });

  test('matches player talk entry', () => {
    const expected = [
      ENTRY_A,
      ENTRY_A_TIME,
      ENTRY_A_USER,
      ENTRY_A_CHAR,
      ENTRY_A_TYPE,
      ENTRY_A_MESSAGE,
    ];

    const actual = CHAT_LOG_PATTERN.exec(ENTRY_A);

    expectToEqualJSON(actual, expected);
  });

  test('matches player tell entry', () => {
    const expected = [
      ENTRY_B,
      ENTRY_B_TIME,
      ENTRY_B_USER,
      ENTRY_B_CHAR,
      ENTRY_B_TYPE,
      ENTRY_B_MESSAGE,
    ];

    const actual = CHAT_LOG_PATTERN.exec(ENTRY_B);

    expectToEqualJSON(actual, expected);
  });

  test('matches multiple entries', () => {
    const expected = [
      [
        `${ENTRY_DL}\n`,
        ENTRY_DL_TIME,
        ENTRY_DL_USER,
        ENTRY_DL_CHAR,
        ENTRY_DL_TYPE,
        ENTRY_DL_MESSAGE,
      ],
      [
        ENTRY_A,
        ENTRY_A_TIME,
        ENTRY_A_USER,
        ENTRY_A_CHAR,
        ENTRY_A_TYPE,
        ENTRY_A_MESSAGE,
      ],
    ];

    const actual = [...`${ENTRY_DL}\n${ENTRY_A}`.matchAll(CHAT_LOG_PATTERN)];

    expectToEqualJSON(actual, expected);
  });
});
