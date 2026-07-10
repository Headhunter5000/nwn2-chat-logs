import { describe, expect, it, vi } from 'vitest';
import * as dbUtils from './dbUtils';
import importLogFile from './importLogFile';

const VALID_FILE = 'valid_name (Chatlog) 2023-10-10.log';
const INVALID_FILE = 'invalid_name.txt';
const CONTENT_WITH_TS = '[12:00] User: Hello world';
const NO_TIMESTAMP = 'no timestamp here';

vi.mock('./dbUtils', () => ({
  addChatLog: vi.fn(),
  getChatLogIdByFileName: vi.fn(),
  updateChatLogById: vi.fn(),
}));

vi.mock('./stringUtils', () => ({
  formatPlainMessage: vi.fn(msg => msg),
  getMessageId: vi.fn((_file, index) => `id-${index}`),
}));

describe('importLogFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws error when file name does not match expected pattern', async () => {
    await expect(importLogFile(INVALID_FILE, 'some text')).rejects.toThrow('File name has wrong format');
  });

  it('throws error if content is not a string', async () => {
    await expect(importLogFile(VALID_FILE, 123)).rejects.toThrow('File is not a string');
  });

  it('throws error if content does not have a timestamp', async () => {
    await expect(
      importLogFile(VALID_FILE, NO_TIMESTAMP),
    ).rejects.toThrow('Missing timestamp');
  });

  it('adds new logs when no existing ID is found', async () => {
    const file = VALID_FILE;
    const content = CONTENT_WITH_TS;
    const mockId = 101;
    vi.mocked(dbUtils.getChatLogIdByFileName).mockResolvedValue(undefined);
    vi.mocked(dbUtils.addChatLog).mockResolvedValue(mockId);

    await importLogFile(file, content);

    expect(dbUtils.getChatLogIdByFileName).toHaveBeenCalledWith(file);
    expect(dbUtils.addChatLog).toHaveBeenCalled();
    expect(dbUtils.updateChatLogById).not.toHaveBeenCalled();
  });

  it('updates existing log when ID is found', async () => {
    const file = VALID_FILE;
    const content = CONTENT_WITH_TS;
    const mockId = 101;

    vi.mocked(dbUtils.getChatLogIdByFileName).mockResolvedValue(mockId);
    vi.mocked(dbUtils.updateChatLogById).mockResolvedValue(mockId);

    await importLogFile(file, content);

    expect(dbUtils.getChatLogIdByFileName).toHaveBeenCalledWith(file);
    expect(dbUtils.updateChatLogById).toHaveBeenCalledWith(mockId, expect.any(Array));
    expect(dbUtils.addChatLog).not.toHaveBeenCalled();
  });
});