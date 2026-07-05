import type { ChatLog } from '../../types/ChatLog';
import { finalFilterLogs, preFilterLogs } from './searchFilters';

// Minimal mock ChatLog type inline for tests
interface MockMessage {
  char?: string,
  plainMessage: string;
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
    char: 'Alice Mayer',
    date: '2023-01-01',
    messages: [
      { char: 'Lukas Weber', plainMessage: 'Hello World' },
      { char: 'Leon Klein', plainMessage: 'Goodbye' },
    ],
  },
  {
    file: 'file2.log',
    char: 'Bob Olsen',
    date: '2023-02-01',
    messages: [
      { char: 'Hanna Koch', plainMessage: 'hi there' },
      { char: 'Noah Richter', plainMessage: 'Yo, hello again' },
    ],
  },
];

describe('preFilterLogs', () => {
  it('filter case-insensitive', () => {
    const hasMatch = preFilterLogs('world', 'plainMessage')(logs[0] as ChatLog);
    expect(hasMatch).toBe(true);
    const noMatch = preFilterLogs('missing', 'plainMessage')(logs[0] as ChatLog);
    expect(noMatch).toBe(false);
  });

  it('filter based on char', () => {
    const hasMatch = preFilterLogs('weber', 'char')(logs[0] as ChatLog);
    expect(hasMatch).toBe(true);
    const noMatch = preFilterLogs('Ken', 'char')(logs[0] as ChatLog);
    expect(noMatch).toBe(false);
  });
});

describe('finalFilterLogs', () => {
  it('returns filtered messages with owner, date, messageIndex and formatted message', () => {
    const result = finalFilterLogs('hello', 'plainMessage', 50)(logs as ChatLog[]);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      messageIndex: 0,
      owner: 'Alice Mayer',
      char: 'Lukas Weber',
      date: '2023-01-01',
      plainMessage: 'Hello World',
    });
    expect(result[1]).toMatchObject({
      messageIndex: 1,
      owner: 'Bob Olsen',
      char: 'Noah Richter',
      date: '2023-02-01',
      plainMessage: 'Yo, hello again',
    });
  });

  it('filter based on char', () => {
    const result = finalFilterLogs('Hanna', 'char', 10)(logs as ChatLog[]);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      messageIndex: 0,
      owner: 'Bob Olsen',
      char: 'Hanna Koch',
      date: '2023-02-01',
      plainMessage: 'hi there',
    });
  });

  it('applies limit correctly', () => {
    const limited = finalFilterLogs('hello', 'plainMessage', 1)(logs as ChatLog[]);
    expect(limited).toHaveLength(1);
    expect(limited[0].plainMessage).toBe('Hello World');
  });
});
