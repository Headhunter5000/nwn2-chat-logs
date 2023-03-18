import PropTypes from 'prop-types';
import { Text } from 'grommet';

const ChatLogMessagePropTypes = {
  id: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  user: PropTypes.string,
  char: PropTypes.string,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

const MessageText = ({ type, message }) => (
  <Text>
    <span
      className={`message-type-${type.toLowerCase()}`}
      dangerouslySetInnerHTML={{ __html: message }}
    />
  </Text>
);

MessageText.propTypes = {
  type: ChatLogMessagePropTypes.type,
  message: ChatLogMessagePropTypes.message,
};

export default MessageText;
