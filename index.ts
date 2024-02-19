import getStats from "./getStats";

const numbers = Array.from({ length: 1_000_000 }, (_, index) => index + 1);
const runs = 1000;
const totalDurations = new Map();

type LoopType = "for" | "for-of" | "for-in" | "forEach" | "while";

const measureLoopType = (type: LoopType) => {
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

type Output = {
  [key: string]: string;
};

let results: Output[] = [];

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
