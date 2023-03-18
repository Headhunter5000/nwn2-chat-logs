import { screen } from '@testing-library/react';

import { renderWithProviders } from '../utils/testUtils';
import CharacterPage from './CharacterPage';

const CHAR = 'TestChar';

const CHARS = [
  {
    name: 'TestChar',
    dates: ['2021-01-01', '2021-01-02', '2021-01-03'],
    firstDate: '2021-01-01',
    lastDate: '2021-01-03',
    count: 15,
  },
];

const LOGS = {
  messages: [{
    id: '1',
    time: '19:30',
    user: 'TestUser',
    char: 'TestChar',
    type: 'Talk',
    message: 'Test message 1',
  }],
};

jest.mock('react-router-dom', () => ({
  useParams: () => ({ char: CHAR }),
  useNavigate: () => {},
}));

jest.mock('../utils/dbUtils', () => ({
  useChatLogStats: () => CHARS,
  useChatLogOfCharAndDate: () => LOGS,
}));

describe('CharacterPage', () => {
  test('renders component', async () => {
    renderWithProviders(<CharacterPage />);
    expect(screen.getByTestId(`messages-chat-log-${CHAR}-${CHARS[0].dates[2]}`)).toBeInTheDocument();
  });
});
