export const formatNumber = (n: number): string =>
    Number(n)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const formatPercent = (p: number): string =>
    Number(p * 100).toFixed(1) + "%";

export const inRange = (
    value: number,
    min: number = 0,
    max: number = Infinity
) => (isNaN(value) ? min : min > value ? min : value > max ? max : value);
