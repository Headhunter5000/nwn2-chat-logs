const aggregateStats = dates => dates
  // group by char, add date and count
  .reduce(
    (acc, [name, date]) => {
      const index = acc.findIndex(c => c.name === name);

      if (index === -1) {
        acc.push({ name, dates: [date], count: 1 });
      } else {
        acc[index].dates.push(date);
        acc[index].count += 1;
      }

      return acc;
    }, [])
  // add first and last date
  .map(
    ({ name, dates, count }) => ({
      name,
      dates,
      firstDate: dates[0],
      lastDate: dates[count-1],
      count,
    })
  );

export default aggregateStats;
