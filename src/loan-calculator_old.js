const formatNumber = (n) =>
    Number(n)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const formatPercent = (p) => Number(p * 100).toFixed(1) + "%";

const calculateLoan = (propertyPrice, downPayment, interestRate, loanTerm) => {
    const loanAmount = propertyPrice - downPayment;
    const interest = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const x = Math.pow(1 + interest, numberOfPayments);
    const perMonthPayment = (loanAmount * (interest * x)) / (x - 1);
    const totalPayments = perMonthPayment * numberOfPayments;
    const totalInterest = totalPayments - loanAmount;
    const totalIntersetPercent = totalInterest / totalPayments;
    const principalPercent = 1 - totalIntersetPercent;
    const downPaymentPercent = downPayment / propertyPrice;
    const totalData = totalInterest + downPayment + loanAmount;
    const shareOfTotalInterest = totalInterest / totalData;
    const shareOfDownPayment = downPayment / totalData;
    const shareOfLoanAmount = loanAmount / totalData;

    return [
        perMonthPayment,
        totalPayments,
        totalInterest,
        totalIntersetPercent,
        principalPercent,
        downPaymentPercent,
        shareOfTotalInterest,
        shareOfDownPayment,
        shareOfLoanAmount,
    ];
};

const propertyPrice = 139000;
const downPayment = 0;
const interestRate = 13.4;
const loanTerm = 15;

const [
    perMonthPayment,
    totalPayments,
    totalInterest,
    totalIntersetPercent,
    principalPercent,
    downPaymentPercent,
    shareOfTotalInterest,
    shareOfDownPayment,
    shareOfLoanAmount,
] = calculateLoan(propertyPrice, downPayment, interestRate, loanTerm);

console.log("Payment Every Month", formatNumber(perMonthPayment));
console.log(`Total of ${loanTerm * 12} Payments`, formatNumber(totalPayments));
console.log("Total Interest", formatNumber(totalInterest));
console.log("Percent of Total Interest", formatPercent(totalIntersetPercent));
console.log("Percent of Principal", formatPercent(principalPercent));
console.log("Percent of Downpayment", formatPercent(downPaymentPercent));
console.log("Share of Total Interest", formatPercent(shareOfTotalInterest));
console.log("Share of Down Payment", formatPercent(shareOfDownPayment));
console.log("Share of Loan Amount", formatPercent(shareOfLoanAmount));
