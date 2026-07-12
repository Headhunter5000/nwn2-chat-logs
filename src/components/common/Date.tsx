import { formatDate } from '../../utils/dateUtils';

export const Date = ({ date, locales = 'de-DE' }: { date: Date | string; locales?: string }) => (
  formatDate(date, locales)
);
