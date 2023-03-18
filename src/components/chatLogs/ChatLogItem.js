import PropTypes from 'prop-types';

import { useChatLogOfCharAndDate } from '../../utils/dbUtils';
import ChatLogMessages from './ChatLogMessages';

export const ChatLogItem = ({ char, date }) => {
  const log = useChatLogOfCharAndDate(char, date);

  if (log && 'messages' in log) {
    return (
      <ChatLogMessages
        messages={log.messages}
        data-testid={`messages-chat-log-${char}-${date}`}
      />
    );
  }

  return null;
};

ChatLogItem.propTypes = {
  char: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ChatLogItem;
