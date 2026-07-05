import { formatDate } from '../../utils/dateTime';

export const Date = ({ date }: { date: Date | string}) => (
  formatDate(date)
);