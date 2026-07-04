// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteButton } from './DeleteButton';

vi.mock('./DeleteModal', () => ({
  default: ({ name }: { name: string }) => (
    <div>Confirm delete {name}</div>
  ),
}));

describe('DeleteButton', () => {
  it('opens modal on click when icon button', async () => {
    render(<DeleteButton name="TestItem" />);
    // Button with label 'Delete'
    const btn = screen.getByRole('button', { name: /delete/i });
    expect(btn).toBeInTheDocument();

    // No modal initially
    expect(screen.queryByText(/Confirm delete/)).not.toBeInTheDocument();

    await userEvent.click(btn);

    // Modal appears with correct text
    expect(await screen.findByText(/Confirm delete TestItem/i)).toBeInTheDocument();
  });

  it('shows modal when onlyIcon is true', async () => {
    render(<DeleteButton name="Item2" onlyIcon={true} />);
    // In icon-only mode Button has no accessible name but has role button
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(screen.queryByText(/Confirm delete/)).not.toBeInTheDocument();
    await userEvent.click(btn);
    expect(await screen.findByText(/Confirm delete Item2/i)).toBeInTheDocument();
  });
});
