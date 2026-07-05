// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import {
  caseInsensitiveIncludes,
  caseInsensitiveIndexOf,
  formatCroppedSearchMessage,
  formatPlainMessage,
  formatSearchMessage,
  getMessageId,
} from './stringUtils';

describe('stringUtils', () => {
  it('caseInsensitiveIndexOf', () => {
    expect(caseInsensitiveIndexOf('Hello World', 'hello')).toBe(0);
    expect(caseInsensitiveIndexOf('Hello World', 'WORLD')).toBe(6);
    expect(caseInsensitiveIndexOf('FooBar', 'baz')).toBe(-1);
  });

  it('caseInsensitiveIncludes works with different cases', () => {
    expect(caseInsensitiveIncludes('Hello World', 'hello')).toBe(true);
    expect(caseInsensitiveIncludes('Hello World', 'WORLD')).toBe(true);
    expect(caseInsensitiveIncludes('FooBar', 'baz')).toBe(false);
  });

  it('getMessageId', () => {
    expect(getMessageId('file', 45)).toBe('file / 0045');
  });

  it('formatSearchMessage wraps matched text in <strong>', () => {
    const message = 'This is a test string';
    const rendered = formatSearchMessage(message, 'test string');
    expect(rendered).toBe('This is a <strong>test string</strong>');
  });

  it('formatCroppedSearchMessage wraps matched text in <strong> and crops the string', () => {
    // eslint-disable-next-line max-len
    const message = 'Please make sure to run the test string through the validator function before deploying it live now.';
    const rendered = formatCroppedSearchMessage(message, 'test string', 30);
    expect(rendered).toBe('&hellip; run the <strong>test string</strong> through t&hellip;');
  });

  it('formatPlainMessage removes html tags and special markers', () => {
    const raw =
      '<div>Hello <b>World </b><em>*Note*</em><span> End</span>';
    const cleaned = formatPlainMessage(raw);
    expect(cleaned).toBe('Hello World Note End');
  });
});