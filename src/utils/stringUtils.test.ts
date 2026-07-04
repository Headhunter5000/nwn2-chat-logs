// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import {
  caseInsensitiveIncludes,
  formatPlainMessage,
  formatSearchMessage,
} from './stringUtils';

describe('stringUtils', () => {
  it('caseInsensitiveIncludes works with different cases', () => {
    expect(caseInsensitiveIncludes('Hello World', 'hello')).toBe(true);
    expect(caseInsensitiveIncludes('Hello World', 'WORLD')).toBe(true);
    expect(caseInsensitiveIncludes('FooBar', 'baz')).toBe(false);
  });

  it('formatSearchMessage wraps matched text in <strong>', () => {
    const message = 'This is a test string';
    const rendered = formatSearchMessage(message, 'test');
    expect(rendered).toContain('<strong>test</strong>');
  });

  it('formatPlainMessage removes html tags and special markers', () => {
    const raw =
      '<div>Hello <b>World</b><em>*Note*</em><span>End</span>';
    const cleaned = formatPlainMessage(raw);
    expect(cleaned).toBe('Hello WorldNoteEnd');
  });
});