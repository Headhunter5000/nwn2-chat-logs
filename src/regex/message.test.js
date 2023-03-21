import {
  HTML_TAGS,
  LINE_BREAK,
  LINE_BREAK_LAST_ONE,
  LINE_BREAK_NOT_LAST_ONE,
  BRACE_OPEN,
  BRACE_CLOSE,
} from './message';

describe('HTML_TAGS', () => {
  test('regex pattern is valid', () => {
    expect(HTML_TAGS).toBeInstanceOf(RegExp);
  });

  test('replaces html', () => {
    const original = '<span>Foo <strong>Bar</strong></span>';
    const expected = 'Foo Bar';

    const actual = original.replace(HTML_TAGS, '');
    expect(actual).toBe(expected);
  });
});

describe('LINE_BREAK', () => {
  test('regex pattern is valid', () => {
    expect(LINE_BREAK).toBeInstanceOf(RegExp);
  });

  test('replaces all \\n line breaks', () => {
    const original = 'Foo\nBar\n';
    const expected = 'FooBar';

    const actual = original.replace(LINE_BREAK, '');
    expect(actual).toBe(expected);
  });

  test('replaces all \\r\\n line breaks', () => {
    const original = 'Foo\r\nBar\r\n';
    const expected = 'FooBar';

    const actual = original.replace(LINE_BREAK, '');
    expect(actual).toBe(expected);
  });
});

describe('LINE_BREAK_LAST_ONE', () => {
  test('regex pattern is valid', () => {
    expect(LINE_BREAK_LAST_ONE).toBeInstanceOf(RegExp);
  });

  test('replaces last \\n line break', () => {
    const original = 'Foo\nBar\n';
    const expected = 'Foo\nBar';

    const actual = original.replace(LINE_BREAK_LAST_ONE, '');
    expect(actual).toBe(expected);
  });

  test('replaces last \\r\\n line break', () => {
    const original = 'Foo\r\nBar\r\n';
    const expected = 'Foo\r\nBar';

    const actual = original.replace(LINE_BREAK_LAST_ONE, '');
    expect(actual).toBe(expected);
  });
});

describe('LINE_BREAK_NOT_LAST_ONE', () => {
  test('regex pattern is valid', () => {
    expect(LINE_BREAK_NOT_LAST_ONE).toBeInstanceOf(RegExp);
  });

  test('replaces all but last \\n line break', () => {
    const original = 'Foo\nBar\n';
    const expected = 'FooBar\n';

    const actual = original.replace(LINE_BREAK_NOT_LAST_ONE, '');
    expect(actual).toBe(expected);
  });

  test.skip('replaces all but last \\r\\n line break', () => {
    const original = 'Foo\r\nBar\r\n';
    const expected = 'FooBar\r\n';

    const actual = original.replace(LINE_BREAK_NOT_LAST_ONE, '');
    expect(actual).toBe(expected);
  });
});

describe('BRACE_OPEN', () => {
  test('regex pattern is valid', () => {
    expect(BRACE_OPEN).toBeInstanceOf(RegExp);
  });

  test('replaces doube left braces', () => {
    const original = 'Foo ((Bar';
    const expected = 'Foo Bar';

    const actual = original.replace(BRACE_OPEN, '');
    expect(actual).toBe(expected);
  });
});

describe('BRACE_CLOSE', () => {
  test('regex pattern is valid', () => {
    expect(BRACE_CLOSE).toBeInstanceOf(RegExp);
  });

  test('replaces double right brace', () => {
    const original = 'Foo)) Bar';
    const expected = 'Foo Bar';

    const actual = original.replace(BRACE_CLOSE, '');
    expect(actual).toBe(expected);
  });
});
