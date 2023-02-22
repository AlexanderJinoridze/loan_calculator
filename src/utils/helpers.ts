export const formatNumber = (n) =>
    Number(n)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const formatPercent = (p) => Number(p * 100).toFixed(1) + "%";
