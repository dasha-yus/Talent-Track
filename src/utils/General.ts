export const getDataIntervals = (maxValue: number, numIntervals = 5) => {
    const intervals: any = [];
    const intervalSize = maxValue / numIntervals;

    for (let i = 0; i < numIntervals; i++) {
        const start = i * intervalSize;
        const end = (i + 1) * intervalSize;
        const interval = [start, end];
        intervals.push(interval);
    }

    return intervals;
};

export const isInDataInterval = (value: number, array: number[]) => {
    const min = array[0];
    const max = array[1];
    return value >= min && value <= max;
};