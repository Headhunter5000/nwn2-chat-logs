import { useChatLogOfCharAndDate } from '../../utils/dbUtils';
import MessageStyles from './MessageStyles';
import Messages from './Messages';

export const LogItem = ({ char, date, index }: {
  char: string;
  date: string;
  index?: string;
}) => {
  const log = useChatLogOfCharAndDate(char, date);

  if (log && 'messages' in log) {
    return (
      <>
        <MessageStyles />
        <Messages
          file={log.file}
          messages={log.messages}
          messageIndex={index ? Number(index) : undefined}
          dataTestId={`chat-log-${char}-${date}`}
        />
      </>
    );
  }

  return null;
};

export default LogItem;
