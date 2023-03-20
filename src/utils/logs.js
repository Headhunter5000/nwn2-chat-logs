import { caseInsensitiveIncludes, highlightString } from './stringUtils';

export const preFilterLogs = search => ({ messages }) =>  messages.some(
  ({ plainMessage }) => caseInsensitiveIncludes(plainMessage, search)
);

export const finalFilterLogs = (search, limit) => logs => {
  const filteredLogs = logs
    .reduce((acc, { char: owner, date, messages }) => {
      messages
        .forEach(({ plainMessage, ...rest }, messageIndex) => {
          if (caseInsensitiveIncludes(plainMessage, search)) {
            return acc.push({
              ...rest,
              owner,
              date,
              messageIndex,
              plainMessage,
              message: highlightString(plainMessage, search),
            });
          }
        });
      return acc;
    }, []);

  if (limit > 0) {
    return filteredLogs.slice(0, limit);
  }

  return filteredLogs;
};
