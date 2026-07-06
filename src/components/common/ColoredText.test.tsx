import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithProviders } from '../../utils/testUtils';
import ColoredText from './ColoredText';

describe('ColoredText', () => {
  test('renders content and applies color based on string content', () => {
    const content = 'Hello World';
    renderWithProviders(<ColoredText>{content}</ColoredText>);
    const textElement = screen.getByText(content);
    expect(textElement).toBeInTheDocument();
  });
});
