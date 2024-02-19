const getStats = (key: string, totalDurations: number[]) => {
  // Calculate average
  const averageDuration =
    totalDurations.reduce((acc, curr) => acc + curr, 0) / totalDurations.length;

  // Calculate median
  const sortedDurations = [...totalDurations].sort((a, b) => a - b);
  const mid = Math.floor(sortedDurations.length / 2);
  const median =
    sortedDurations.length % 2 !== 0
      ? sortedDurations[mid]
      : (sortedDurations[mid - 1] + sortedDurations[mid]) / 2;

  // Calculate standard deviation
  const mean = averageDuration;
  const squareDiffs = totalDurations.map((value) => (value - mean) ** 2);
  const avgSquareDiff =
    squareDiffs.reduce((acc, curr) => acc + curr, 0) / squareDiffs.length;
  const standardDeviation = Math.sqrt(avgSquareDiff);

  return {
    averageDuration,
    median,
    standardDeviation,
  };
};

export default getStats;
