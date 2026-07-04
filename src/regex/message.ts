export const HTML_TAGS = /(<[^>]+>)/g;
export const LINE_BREAK = /(\r\n|\r|\n)/g;
export const LINE_BREAK_LAST_ONE = /(\r\n|\r|\n)+(?=$)/g;
export const LINE_BREAK_NOT_LAST_ONE = /(\r\n|\r|\n)+(?!$)/g;
export const STAR = /\*/g;
export const BRACE_OPEN = /(\(){2,}/g;
export const BRACE_CLOSE = /(\)){2,}/g;
