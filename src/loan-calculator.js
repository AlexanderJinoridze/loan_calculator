const formatNumber = (n) =>
    Number(n)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const formatPercent = (p) => Number(p * 100).toFixed(1) + "%";

const calculateLoanData = (
    propertyPrice,
    downPayment,
    interestRate,
    loanTerm
) => {
    const loanAmount = propertyPrice - downPayment;
    const interest = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const x = Math.pow(1 + interest, numberOfPayments);
    const perMonthPayment = (loanAmount * (interest * x)) / (x - 1);
    const totalPayments = perMonthPayment * numberOfPayments;
    const totalInterest = totalPayments - loanAmount;

    return [perMonthPayment, totalPayments, totalInterest, loanAmount];
};

const calculateChartData = (data) => {
    const result = [];

    const total = Object.values(data).reduce((accumulate, currentData) => {
        return currentData.value + accumulate;
    }, 0);

    for (const [label, dataValue] of Object.entries(data)) {
        const { value, color } = dataValue;
        result.push({
            label,
            color,
            amount: value,
            share: value / total,
        });
    }

    return result;
};

const propertyPrice = 139000;
const downPayment = 69500;
const interestRate = 15;
const loanTerm = 15;

const downPaymentPercent = downPayment / propertyPrice;
const [perMonthPayment, totalPayments, totalInterest, loanAmount] =
    calculateLoanData(propertyPrice, downPayment, interestRate, loanTerm);
const chartData = calculateChartData({
    Percent: {
        value: totalInterest,
        color: "#e9225a",
    },
    "Down payment": {
        value: downPayment,
        color: "#ffdb4d",
    },
    "Loan amount": {
        value: loanAmount,
        color: "#2884ff",
    },
});

console.log("Payment Every Month", formatNumber(perMonthPayment));
console.log(`Total of ${loanTerm * 12} Payments`, formatNumber(totalPayments));
console.log("Percent of Downpayment", formatPercent(downPaymentPercent));
console.log("Chart Data", chartData);
