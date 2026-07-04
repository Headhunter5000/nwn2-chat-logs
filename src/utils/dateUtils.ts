export const getDateFromISOString = (isoString: string): string => isoString?.split('T')[0];
export const getIsoStringFromDate = (date: string | number | Date): string => new Date(date).toISOString();