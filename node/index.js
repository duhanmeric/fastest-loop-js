const getStats = (key, totalDurations) => {
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

const numbers = Array.from({ length: 1_000_000 }, (_, index) => index + 1);
const runs = 1000;
const totalDurations = new Map();

const measureLoopType = (type) => {
  for (let i = 0; i < runs; i++) {
    const startTime = performance.now();
    switch (type) {
      case "for-of":
        for (const number of numbers) {
          // Operation
        }
        break;

      case "for":
        for (let i = 0; i < numbers.length; i++) {
          // Operation
        }
        break;

      case "for-in":
        for (const number in numbers) {
          // Operation
        }
        break;
      case "forEach":
        numbers.forEach((number) => {
          // Operation
        });
        break;

      case "while":
        let i = 0;
        while (i < numbers.length) {
          // Operation
          i++;
        }
        break;
      default:
        break;
    }
    const endTime = performance.now();
    const duration = endTime - startTime;

    if (totalDurations.has(type)) {
      totalDurations.get(type).push(duration);
    } else {
      totalDurations.set(type, [duration]);
    }
  }
};

measureLoopType("for-of");
measureLoopType("for");
measureLoopType("for-in");
measureLoopType("forEach");
measureLoopType("while");

let results = [];

totalDurations.forEach((value, key) => {
  const stats = getStats(key, value);
  results.push({
    LoopType: key,
    Average: `${stats.averageDuration.toFixed(4)} ms`,
    Median: `${stats.median.toFixed(4)} ms`,
    StdDev: `${stats.standardDeviation.toFixed(4)} ms`,
  });
});

console.table(results);
