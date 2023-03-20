import PropTypes from 'prop-types';

import { useChatLogOfCharAndDate } from '../../utils/dbUtils';
import LogMessages from './LogMessages';

export const LogItem = ({ char, date }) => {
  const log = useChatLogOfCharAndDate(char, date);

  if (log && 'messages' in log) {
    return (
      <LogMessages
        file={log.file}
        messages={log.messages}
        data-testid={`messages-chat-log-${char}-${date}`}
      />
    );
  }

  return null;
};

LogItem.propTypes = {
  char: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default LogItem;
