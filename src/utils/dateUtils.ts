export const getDateFromISOString = (isoString: string): string =>
  isoString?.split('T')[0];

export const getIsoStringFromDate = (date: string | number | Date): string =>
  new Date(date).toISOString();

export const formatDate = (date: Date | string) => new Date(date).toLocaleDateString(undefined, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});