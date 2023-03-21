import PropTypes from 'prop-types';

import { useChatLogOfCharAndDate } from '../../utils/dbUtils';
import MessageStyles from './MessageStyles';
import Messages from './Messages';

export const LogItem = ({ char, date, index }) => {
  const log = useChatLogOfCharAndDate(char, date);

  if (log && 'messages' in log) {
    return (
      <>
        <MessageStyles />
        <Messages
          file={log.file}
          messages={log.messages}
          messageIndex={index ? Number(index) : undefined}
          data-testid={`chat-log-${char}-${date}`}
        />
      </>
    );
  }

  return null;
};

LogItem.propTypes = {
  char: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  index: PropTypes.string,
};

LogItem.defaultProps = {
  index: undefined,
};

export default LogItem;
