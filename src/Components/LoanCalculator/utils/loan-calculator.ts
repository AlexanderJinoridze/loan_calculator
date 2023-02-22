import { chartInputData, chartOutputItem } from "../../../types";

export const calculateLoanData = (
    propertyPrice: number,
    downPayment: number,
    interestRate: number,
    loanTerm: number
): number[] => {
    const loanAmount = propertyPrice - downPayment;
    const interest = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const x = Math.pow(1 + interest, numberOfPayments);
    const monthlyPayment = (loanAmount * (interest * x)) / (x - 1);
    const totalPayments = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayments - loanAmount;

    return [monthlyPayment, totalPayments, totalInterest, loanAmount];
};

export const calculateChartData = (data: chartInputData) => {
    const result: chartOutputItem[] = [];

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
