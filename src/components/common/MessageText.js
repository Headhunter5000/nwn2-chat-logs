import { Text } from 'grommet';
import MessagePropTypes from '../../config/propTypes/messagePropTypes';

const MessageText = ({ type, message }) => (
  <Text><span
    className={`message-type-${type.toLowerCase()}`}
    dangerouslySetInnerHTML={{ __html: message }}
  /></Text>
);

MessageText.propTypes = {
  type: MessagePropTypes.type,
  message: MessagePropTypes.message,
};

export default MessageText;
