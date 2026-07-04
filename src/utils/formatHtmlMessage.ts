import { HTML_TAGS, LINE_BREAK_LAST_ONE, LINE_BREAK_NOT_LAST_ONE } from '../regex/message';

type WrapperRule = {
  opening: string;
  closing: string;
  tag: string;
  className: string;
};

const wrapperRules: WrapperRule[] = [
  {
    opening: '((',
    closing: '))',
    tag: 'span',
    className: 'text-ooc',
  },
  {
    opening: '*',
    closing: '*',
    tag: 'span',
    className: 'text-emote',
  },
];

// Design note: unmatched delimiters are NOT treated as literal text.
// - An opener with no matching closer auto-closes at end-of-string.
// - A closer that matches a rule further down the stack force-closes
//   every rule above it (cascading close), rather than being ignored.
// This keeps chat output valid HTML even for malformed/truncated user input.
// See formatHtmlMessage.test.ts "Unclosed wrappers" and
// "Non-intersecting wrapper rule enforcement" for the exact contract.
export function formatHtmlMessage(input: string): string {
  const plainInput = input
    .replace(HTML_TAGS, '')
    .replace(LINE_BREAK_LAST_ONE, '')
    .replace(LINE_BREAK_NOT_LAST_ONE, '<br />');

  const openWrappers: WrapperRule[] = [];

  let output = '';

  for (let i = 0; i < plainInput.length; i++) {
    let wrapperFound = false;

    // Check for closings (any matching rule that is open)
    for (const rule of wrapperRules) {
      if (plainInput.startsWith(rule.closing, i)) {
        const index = openWrappers.lastIndexOf(rule);
        if (index !== -1) {
          // Close from the last open down to and including this rule
          for (let j = openWrappers.length - 1; j >= index; j--) {
            output += `</${openWrappers[j].tag}>`;
          }
          openWrappers.splice(index);
          i += rule.closing.length - 1;
          wrapperFound = true;
          break;
        }
      }
    }

    // If not a closing, check for openings
    if (!wrapperFound) {
      for (const rule of wrapperRules) {
        if (plainInput.startsWith(rule.opening, i)) {
          openWrappers.push(rule);
          output += `<${rule.tag} class="${rule.className}">`;
          i += rule.opening.length - 1;
          wrapperFound = true;
          break;
        }
      }
    }

    // If not a wrapper, add the character
    if (!wrapperFound) {
      output += plainInput[i];
    }
  }

  // Close any remaining open wrappers at the end
  while (openWrappers.length > 0) {
    const lastRule = openWrappers.pop();
    if (lastRule) output += `</${lastRule.tag}>`;
  }

  return output;
}