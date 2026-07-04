import { useEffect } from 'react';
import { scrollToElement } from '../../utils/scroll';

const ScrollToMessage = ({ index }: { index?: number }) => {
  useEffect(
    () => {
      if (index) {
        let timeout: number;
        let tries = 5;

        const tryToScroll = () => {
          if( tries > 0 && !scrollToElement(`#message-${index}`)) {
            timeout = setTimeout(tryToScroll, 100);
            tries -= 1;
          }
        };

        tryToScroll();

        return () => clearTimeout(timeout);
      }

      return undefined;
    },
    [index]
  );

  return null;
};

export default ScrollToMessage;
