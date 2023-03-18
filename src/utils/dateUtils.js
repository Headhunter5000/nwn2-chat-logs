export const getDateFromISOString = isoString => isoString?.split('T')[0];
export const getIsoStringFromDate = date => (new Date(date))?.toISOString();
