import { formatDate } from '../../utils/dateUtils';

export const Date = ({ date }: { date: Date | string}) => (
  formatDate(date)
);