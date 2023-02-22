import { chartInputData, chartOutputItem } from "../types";

export const calculateLoanData = (
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

export const calculateChartData = (data: chartInputData) => {
    const result: chartOutputItem[] = [];

    const total = Object.values(data).reduce((accumulate, currentData) => {
        return currentData.value + accumulate;
    }, 0);

    for (const [label, dataValue] of Object.entries(data)) {
        const { value, color } = dataValue;
        const dataItem: chartOutputItem = {
            label,
            color,
            amount: value,
            share: value / total,
        };
        result.push(dataItem);
    }

    return result;
};
