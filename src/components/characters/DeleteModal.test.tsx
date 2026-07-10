
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { deleteChatLogsByChar } from '../../utils/dbUtils';
import DeleteModal from './DeleteModal';

// import '../../config/i18n';

vi.mock('grommet', async () => ({
  ...(await vi.importActual('grommet')),
  Layer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('../../utils/dbUtils', () => ({
  deleteChatLogsByChar: vi.fn(),
}));

describe('DeleteModal', () => {
  const mockSetLayerVisible = vi.fn();
  const name = 'Sample Character';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with the given character name', () => {
    render(<DeleteModal name={name} setLayerVisible={mockSetLayerVisible} />);
    expect(screen.getByTestId('delete-modal-disclaimer')).toHaveAttribute('data-charname', name);

  });

  it('calls setLayerVisible(false) when Cancel button is clicked', async () => {
    render(<DeleteModal name={name} setLayerVisible={mockSetLayerVisible} />);
    const cancelButton = screen.getByTestId('delete-modal-cancel');
    await userEvent.click(cancelButton);

    expect(mockSetLayerVisible).toHaveBeenCalledWith(false);
  });

  it('calls deleteChatLogsByChar and sets visible to false when Confirm button is clicked', async () => {
    render(<DeleteModal name={name} setLayerVisible={mockSetLayerVisible} />);
    const confirmButton = screen.getByTestId('delete-modal-confirm');
    await userEvent.click(confirmButton);

    expect(deleteChatLogsByChar).toHaveBeenCalledWith(name);
    expect(mockSetLayerVisible).toHaveBeenCalledWith(false);
  });
});
