import { Text } from 'grommet';
import type { ChatLogMessage } from '../../types/ChatLog';

const MessageText = ({ type, message }: Pick<ChatLogMessage, 'type' | 'message'>) => (
  <Text><span
    className={`message-type-${type.toLowerCase()}`}
    dangerouslySetInnerHTML={{ __html: message }}
  /></Text>
);

export default MessageText;
