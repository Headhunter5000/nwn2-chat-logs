import { describe, expect, test } from 'vitest';
import { formatHtmlMessage } from './formatHtmlMessage';

const openingOOCSpan = '<span class="text-ooc">';
const openingEmoteSpan = '<span class="text-emote">';
const closingSpan = '</span>';

// formatHtmlMessage.test.js
describe('formatHtmlMessage', () => {

  describe('Basic functionality', () => {

    test('should strip HTML tags and preserve plain text', () => {
      const input = '<p>Hello world</p>';
      const result = formatHtmlMessage(input);
      expect(result).toBe('Hello world');
    });

    test('should handle basic OOC message wrapper', () => {
      const input = 'Hello ((this is out of character)) world';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`Hello ${openingOOCSpan}this is out of character${closingSpan} world`);
    });

    test('should handle basic emote message wrapper', () => {
      const input = 'She said *smiles warmly* at him';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`She said ${openingEmoteSpan}smiles warmly${closingSpan} at him`);
    });

  });

  describe('Multiple wrappers', () => {

    test('should handle multiple OOC wrappers', () => {
      const input = '((OOC1)) text ((OOC2))';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingOOCSpan}OOC1${closingSpan} text ${openingOOCSpan}OOC2${closingSpan}`);
    });

    test('should handle multiple emote wrappers', () => {
      const input = '*emote1* text *emote2*';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingEmoteSpan}emote1${closingSpan} text ${openingEmoteSpan}emote2${closingSpan}`);
    });

    test('should handle mixed wrapper types', () => {
      const input = '((OOC1)) text *emote1* more ((OOC2)) and *emote2*';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingOOCSpan}OOC1${closingSpan} text ${openingEmoteSpan}emote1${closingSpan} more ${openingOOCSpan}OOC2${closingSpan} and ${openingEmoteSpan}emote2${closingSpan}`);
    });

  });

  describe('Unclosed wrappers', () => {

    test('should close unclosed OOC wrapper at end of string', () => {
      const input = 'Hello ((this is unclosed';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`Hello ${openingOOCSpan}this is unclosed${closingSpan}`);
    });

    test('should close unclosed emote wrapper at end of string', () => {
      const input = 'She *smiles at everyone';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`She ${openingEmoteSpan}smiles at everyone${closingSpan}`);
    });

    test('should close multiple unclosed wrappers', () => {
      const input = 'Text ((ooc *emote unclosed';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`Text ${openingOOCSpan}ooc ${openingEmoteSpan}emote unclosed${closingSpan}${closingSpan}`);
    });

  });

  describe('Empty sections', () => {

    test('should handle empty OOC wrapper', () => {
      const input = 'Text (()) more text';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`Text ${openingOOCSpan}${closingSpan} more text`);
    });

    test('should handle empty emote wrapper', () => {
      const input = 'Text ** more text';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`Text ${openingEmoteSpan}${closingSpan} more text`);
    });

    test('should handle multiple empty wrappers', () => {
      const input = '(()) and ** and (())';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingOOCSpan}${closingSpan} and ${openingEmoteSpan}${closingSpan} and ${openingOOCSpan}${closingSpan}`);
    });

  });

  describe('Adjacent wrappers', () => {

    test('should handle adjacent OOC and emote wrappers', () => {
      const input = '((OOC))*emote*';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingOOCSpan}OOC${closingSpan}${openingEmoteSpan}emote${closingSpan}`);
    });

    test('should handle adjacent same type wrappers', () => {
      const input = '((first))((second))';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingOOCSpan}first${closingSpan}${openingOOCSpan}second${closingSpan}`);
    });

  });

  describe('Edge cases', () => {

    test('should handle empty string', () => {
      const input = '';
      const result = formatHtmlMessage(input);
      expect(result).toBe('');
    });

    test('should handle string with only wrappers', () => {
      const input = '((ooc))';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingOOCSpan}ooc${closingSpan}`);
    });

    test('should handle string with only wrappers and spaces', () => {
      const input = '(( test ))';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingOOCSpan} test ${closingSpan}`);
    });

    test('should handle wrappers with special characters', () => {
      const input = '((!@#$%)) *&*';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingOOCSpan}!@#$%${closingSpan} ${openingEmoteSpan}&${closingSpan}`);
    });

    test('should handle wrappers with newlines', () => {
      const input = 'Text ((line1\nline2)) more';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`Text ${openingOOCSpan}line1<br />line2${closingSpan} more`);
    });

  });

  describe('Non-intersecting wrapper rule enforcement', () => {

    test('should handle overlapping wrappers gracefully', () => {
      const input = '((start *middle)) end*';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingOOCSpan}start ${openingEmoteSpan}middle${closingSpan}${closingSpan} end${openingEmoteSpan}${closingSpan}`);
    });

    test('should handle nested wrappers gracefully', () => {
      const input = '((start *middle* end))';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingOOCSpan}start ${openingEmoteSpan}middle${closingSpan} end${closingSpan}`);
    });

    // NEW: three-way interleaving where a cascading close consumes an
    // opener two levels up, stranding the later closer as literal text
    // inside a freshly-reopened, unrelated span. Not previously covered
    // by the two-level overlap cases above.
    test('should absorb a stranded closer as literal text after a lower-rule cascade close', () => {
      const input = '((a *b)) c* d))';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingOOCSpan}a ${openingEmoteSpan}b${closingSpan}${closingSpan} c${openingEmoteSpan} d))${closingSpan}`);
    });

  });

  // NEW: same-delimiter "nesting" ambiguity. Because emote uses the same
  // token to open and close, a second '*' while one is already open is
  // read as a close, not a nested open. Not previously covered.
  describe('Same-delimiter nesting ambiguity', () => {

    test('should treat second matching delimiter as a close, not a nested open', () => {
      const input = '*emote1 *emote2* still emote1*';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingEmoteSpan}emote1 ${closingSpan}emote2${openingEmoteSpan} still emote1${closingSpan}`);
    });

  });

  // NEW: runs of 3+ consecutive identical delimiter characters. Existing
  // "Empty sections" tests only cover exactly 2 (an open+close pair);
  // odd/even run lengths weren't covered.
  describe('Consecutive delimiter runs', () => {

    test('should handle three consecutive asterisks', () => {
      const input = 'Text *** more';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`Text ${openingEmoteSpan}${closingSpan}${openingEmoteSpan} more${closingSpan}`);
    });

    test('should handle four consecutive asterisks', () => {
      const input = 'Text **** more';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`Text ${openingEmoteSpan}${closingSpan}${openingEmoteSpan}${closingSpan} more`);
    });

  });

  // NEW: color tags in the shape actually emitted by the NWN2 client
  // (<color=white>, <color=lightgreen>, no self-closing slash, attribute
  // has no quotes). Existing HTML-stripping test only covers <p>/</p>.
  describe('Color tag handling', () => {

    test('should strip color tags and apply wrapper classes independent of original color', () => {
      const input = '<color=white>*</color><color=lightgreen>waves</color><color=white>*</color>';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingEmoteSpan}waves${closingSpan}`);
    });

    test('should strip color tags spanning across a wrapper boundary', () => {
      const input = '<color=white>Guten Abend *</color><color=lightgreen>zu den Wachen</color><color=white>*</color>';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`Guten Abend ${openingEmoteSpan}zu den Wachen${closingSpan}`);
    });

    test('should not leak literal color attribute text', () => {
      const input = '<color=white>hello</color>';
      const result = formatHtmlMessage(input);
      expect(result).toBe('hello');
    });

  });

  // NEW: astral characters (emoji, surrogate pairs) inside and adjacent
  // to wrappers. Not previously covered; guards against a future switch
  // to code-point iteration silently changing indexing/output.
  describe('Unicode handling', () => {

    test('should preserve emoji correctly inside an emote wrapper', () => {
      const input = 'She *waves 👋 warmly* at him';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`She ${openingEmoteSpan}waves 👋 warmly${closingSpan} at him`);
    });

    test('should preserve emoji immediately adjacent to a delimiter', () => {
      const input = '*👋*';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingEmoteSpan}👋${closingSpan}`);
    });

    test('should preserve umlauts and eszett inside wrappers', () => {
      const input = '*lässt den Blick schweifen, äußerst müde*';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingEmoteSpan}lässt den Blick schweifen, äußerst müde${closingSpan}`);
    });

  });

  // NEW: realistic full log lines taken directly from actual NWN2 client
  // output, combining color-tag stripping with wrapper formatting and
  // an additional nested <i> tag. Highest-value regression coverage
  // since this is real production input shape rather than synthetic.
  describe('Real log line regression cases', () => {

    test('should format a real NWN2 log-style emote line', () => {
      const input = '<color=white>*</color><color=lightgreen>Prüft den Wegweiser</color><color=white>*</color>';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingEmoteSpan}Prüft den Wegweiser${closingSpan}`);
    });

    test('should format a real NWN2 log-style OOC line with nested italics tag', () => {
      const input = '<color=white><i>((also da bin ich ^^))</i></color>';
      const result = formatHtmlMessage(input);
      expect(result).toBe(`${openingOOCSpan}also da bin ich ^^${closingSpan}`);
    });

  });

});