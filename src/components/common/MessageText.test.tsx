import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import MessageText from './MessageText';

describe('MessageText', () => {
  test('renders with correct class name and content for "info" type', () => {
    const message = 'System notification: update available.';
    render(<MessageText type="info" message={message} />);

    const span = screen.getByText(message);
    expect(span).toBeInTheDocument();
    expect(span.className).toContain('message-type-info');
  });

  test('renders with correct class name and content for "warning" type', () => {
    const message = 'Warning: low battery.';
    render(<MessageText type="warning" message={message} />);

    const span = screen.getByText(message);
    expect(span).toBeInTheDocument();
    expect(span.className).toContain('message-type-warning');
  });

  test('renders HTML content correctly', () => {
    const htmlContent = '<strong>Important</strong> notice';
    render(<MessageText type="info" message={htmlContent} />);

    expect(screen.getByText('Important')).toBeInTheDocument();
  });
});
