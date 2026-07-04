import type { AggregatedStats } from "../../types/AggregatedStats";

export type NameAndDate = [string, string];

const aggregateStats = (values: NameAndDate[]): AggregatedStats[] => 
  values
    .reduce(
      (acc, [name, date]: NameAndDate): Pick<AggregatedStats, 'name' | 'dates' | 'count'>[] => {
        const index = acc.findIndex(c => c.name === name);

        if (index === -1) {
          acc.push({ name, dates: [date], count: 1 });
        } else {
          acc[index].dates.push(date);
          acc[index].count += 1;
        }

        return acc;
      }, [])
    .map(
      ({ name, dates, count }) => ({
        name,
        dates,
        firstDate: dates[0],
        lastDate: dates[count - 1],
        count,
      })
    );

export default aggregateStats;