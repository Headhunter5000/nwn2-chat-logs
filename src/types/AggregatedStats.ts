export type AggregatedStats = {
  name: string;
  dates: string[];
  firstDate: string;
  lastDate: string;
  count: number;
};

export type AggregatedStatsByChar = Record<AggregatedStats['name'], Omit<AggregatedStats, 'name'>>;