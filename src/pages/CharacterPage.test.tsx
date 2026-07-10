import { screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { renderWithProviders } from '../utils/testUtils';
import CharacterPage from './CharacterPage';

const CHAR = 'TestChar';
const LAST_DATE = '2021-01-03';

const CHARS = [
  {
    name: CHAR,
    dates: ['2021-01-01', '2021-01-02', '2021-01-03'],
    firstDate: '2021-01-01',
    lastDate: '2021-01-03',
    count: 15,
  },
];

const LOGS = {
  file: 'TestChar (Chatlog) 2021-01-03.log',
  messages: [{
    id: '1',
    time: '19:30',
    user: 'TestUser',
    char: 'TestChar',
    type: 'Talk',
    message: 'Test message 1',
  }],
};

vi.mock('react-router', async importOriginal => {
  const actual = await importOriginal<typeof import('react-router')>();

  return {
    ...actual,
    useParams: () => ({ char: CHAR, date: LAST_DATE }),
    useSearchParams: () => [{ get: () => undefined }],
    useNavigate: () => () => {},
  };
});

vi.mock('../utils/dbUtils', () => ({
  useChatLogStats: () => CHARS,
  useChatLogOfCharAndDate: () => LOGS,
}));

describe('CharacterPage', () => {
  test('renders component', async () => {
    renderWithProviders(<CharacterPage />);
    expect(await screen.findByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByTestId(`chat-log-${CHAR}-${LAST_DATE}`)).toBeInTheDocument();
  });
});
