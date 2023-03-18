import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/testUtils';
import LandingPage from './LandingPage';

const CHARS = [
  {
    name: 'TestChar',
    dates: ['2021-01-01', '2021-01-02', '2021-01-03'],
    minDate: '2021-01-01',
    maxDate: '2021-01-03',
    count: 15,
  },
];

jest.mock('react-router-dom', () => ({
  useNavigate: () => {},
}));

jest.mock('../utils/dbUtils', () => ({
  useChatLogStats: () => CHARS,
}));

describe('LandingPage', () => {
  test('renders component', () => {
    renderWithProviders(<LandingPage />);
    expect(screen.getByTestId('char-menu')).toBeInTheDocument();
  });
});
