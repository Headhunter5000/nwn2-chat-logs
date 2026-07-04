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
  });
});