export const formatDate = (date: Date | string) => new Date(date).toLocaleDateString(undefined, { 
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});