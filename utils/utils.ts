export const calculateExponential = (
  x: number[],
  y: number[]
): {
  xRange: number[];
  yRange: number[];
  data: { day: string; retentionRates: number }[];
} => {
  const result: {
    xRange: number[];
    yRange: number[];
    data: { day: string; retentionRates: number }[];
  } = {
    xRange: [],
    yRange: [],
    data: [],
  };

  for (let i = 0; i < x.length; i++) {
    const s =
      -(x[i] + (i > 0 ? x[i - 1] : 0) - 0) /
      Math.log(y[i] / 1);
    const xRange = Array.from(
      { length: 50 },
      (_, j) => (j * 7) / 49 + i * 7
    );
    const yRange = xRange.map((x) =>
      Math.exp(-(x - i * 7) / s)
    );
    const data = xRange.map((value) => ({
      day: value.toString(),
      retentionRates: Math.exp(-(value - i * 7) / s) * 100,
    }));
    console.log(yRange);

    result.xRange.push(...xRange);
    result.yRange.push(...yRange);
    result.data.push(...data);
  }

  return result;
};
export const calculateElapsedTimes = (
  reviewDates: string[]
): number[] => {
  const elapsedTimes: number[] = [];

  for (let i = 0; i < reviewDates.length; i += 3) {
    const firstDate = new Date(reviewDates[i]);
    const thirdDate = new Date(reviewDates[i + 2]);
    const elapsedTime =
      thirdDate.getTime() - firstDate.getTime();
    const elapsedTimeInHours =
      elapsedTime / (1000 * 60 * 60); // 経過時間を時間単位で表現する

    elapsedTimes.push(elapsedTimeInHours);
  }

  return elapsedTimes;
};
