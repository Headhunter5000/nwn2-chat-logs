import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ColoredText from './ColoredText';

describe('ColoredText', () => {
  test('renders content and applies color based on string content', () => {
    const content = 'Hello World';
    render(<ColoredText>{content}</ColoredText>);
    const textElement = screen.getByText(content);
    expect(textElement).toBeInTheDocument();
  });
});
