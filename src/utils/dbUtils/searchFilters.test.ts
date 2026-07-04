import type { ChatLog } from '../../types/ChatLog';
import { formatSearchMessage } from '../stringUtils';
import { finalFilterLogs, preFilterLogs } from './searchFilters';

// Minimal mock ChatLog type inline for tests
interface MockMessage {
  plainMessage: string;
  someProp?: string;
}
interface MockChatLog {
  file: string,
  char: string; // owner
  date: string;
  messages: MockMessage[];
}

const logs: MockChatLog[] = [
  {
    file: 'file1.log',
    char: 'alice',
    date: '2023-01-01',
    messages: [
      { plainMessage: 'Hello World' },
      { plainMessage: 'Goodbye' },
    ],
  },
  {
    file: 'file2.log',
    char: 'bob',
    date: '2023-02-01',
    messages: [
      { plainMessage: 'hi there' },
      { plainMessage: 'hello again' },
    ],
  },
];

describe('searchFilters', () => {
  it('preFilterLogs returns true if any message contains search string (case-insensitive)', () => {
    const hasMatch = preFilterLogs('world')(logs[0] as ChatLog);
    expect(hasMatch).toBe(true);
    const noMatch = preFilterLogs('missing')(logs[0] as ChatLog);
    expect(noMatch).toBe(false);
  });

  it('finalFilterLogs returns filtered messages with owner, date, messageIndex and formatted message', () => {
    const result = finalFilterLogs('hello', 10)(logs as ChatLog[]);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      plainMessage: 'Hello World',
      owner: 'alice',
      date: '2023-01-01',
      messageIndex: 0,
    });
    expect(result[1]).toMatchObject({
      plainMessage: 'hello again',
      owner: 'bob',
      date: '2023-02-01',
      messageIndex: 1,
    });
    const expectedFirst = formatSearchMessage('Hello World', 'hello');
    const expectedSecond = formatSearchMessage('hello again', 'hello');
    expect(result[0].message).toBe(expectedFirst);
    expect(result[1].message).toBe(expectedSecond);
  });

  it('applies limit correctly', () => {
    const limited = finalFilterLogs('hello', 1)(logs as ChatLog[]);
    expect(limited).toHaveLength(1);
    expect(limited[0].plainMessage).toBe('Hello World');
  });
});
