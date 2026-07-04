export interface ChatLogMessage {
  id: string;
  time: string;
  user?: string;
  char?: string;
  type: string;
  message: string;
  plainMessage: string;
}

export interface ChatLog {
  id?: number;
  file: string;
  char: string;
  date: string;
  messages: ChatLogMessage[];
}