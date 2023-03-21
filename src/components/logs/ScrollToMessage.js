import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { scrollToElement } from '../../utils/scroll';

const ScrollToMessage = ({ index }) => {
  useEffect(
    () => {
      if (index) {
        let timeout;
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

ScrollToMessage.propTypes = {
  index: PropTypes.number,
};

ScrollToMessage.defaultProps = {
  index: undefined,
};

export default ScrollToMessage;
