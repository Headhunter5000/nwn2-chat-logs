import { HTML_TAGS, LINE_BREAK_LAST_ONE, LINE_BREAK_NOT_LAST_ONE } from '../regex/message';

const wrapperRules = [
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

export function formatHtmlMessage(input) {
  const plainInput = input
    .replace(HTML_TAGS, '')
    .replace(LINE_BREAK_LAST_ONE, '')
    .replace(LINE_BREAK_NOT_LAST_ONE, '<br />');

  const splitInput = plainInput.split('');

  const openWrappers = [];

  let output = '';

  for (let i = 0; i < splitInput.length; i++) {
    let wrapperFound = false;

    // Check for closings (any matching rule that is open)
    for (const rule of wrapperRules) {
      if (plainInput.slice(i, i + rule.closing.length) === rule.closing) {
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
        if (plainInput.slice(i, i + rule.opening.length) === rule.opening) {
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
      output += splitInput[i];
    }
  }

  // Close any remaining open wrappers at the end
  while (openWrappers.length > 0) {
    const lastRule = openWrappers.pop();
    output += `</${lastRule.tag}>`;
  }

  return output;
}