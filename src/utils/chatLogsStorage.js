import LOCAL_STORAGE_KEYS from '../config/localStorageKeys';

export const retrieveChatLogs = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CHAT_LOGS)) ?? {};

export const storeChatLogs = chatLogs =>  localStorage.setItem(LOCAL_STORAGE_KEYS.CHAT_LOGS, JSON.stringify(chatLogs));
