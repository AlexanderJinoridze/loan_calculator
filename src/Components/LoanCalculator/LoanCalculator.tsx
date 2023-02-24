import React, { useEffect, useState } from "react";
import { calculateChartData, calculateLoanData } from "./utils/loan-calculator";
import { formatNumber, formatPercent, inRange } from "../../utils/helpers";
import LinearChart from "../LinearChart";
import { chartOutputItem } from "../../types";

export default function LoanCalculator({
    defaultLoanTerm = 15,
    defaultInterestRate = 13.4,
    propertyPrice = 100,
    maxLoanTerm = 20,
    maxInterestRate = 15,
}) {
    const [downPayment, setDownPayment] = useState(() => propertyPrice * 0.2);
    const [loanTerm, setLoanTerm] = useState(() => defaultLoanTerm);
    const [interestRate, setInterestRate] = useState(() => defaultInterestRate);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [sumTotal, setSumTotal] = useState(0);
    const [downPaymentPercent, setDownPaymentPercent] = useState(0);
    const [linearChartData, setLinearChartData] = useState<chartOutputItem[]>(
        []
    );

    useEffect(() => {
        const [monthlyPayment, totalPayment, totalInterest, loanAmount] =
            calculateLoanData(
                propertyPrice,
                downPayment,
                interestRate,
                loanTerm
            );

        const chartData = calculateChartData({
            Percent: {
                value: totalInterest,
                color: "#e9225a",
            },
            "Down Payment": {
                value: downPayment,
                color: "#ffdb4d",
            },
            "Loan Amount": {
                value: loanAmount,
                color: "#2884ff",
            },
        });

        setMonthlyPayment(monthlyPayment);
        setSumTotal(totalPayment);
        setDownPaymentPercent(downPayment / propertyPrice);
        setLinearChartData(chartData);
    }, [downPayment, loanTerm, interestRate]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="bank"
                            defaultChecked
                            onChange={() => {
                                setInterestRate(13.4);
                            }}
                        />
                        <span>BOG</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="bank"
                            onChange={() => {
                                setInterestRate(11);
                            }}
                        />
                        <span>TBC</span>
                    </label>
                </div>
            </div>
            <div>
                <div>
                    <label>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>Down Payment</span>
                            <strong>{formatPercent(downPaymentPercent)}</strong>
                        </div>
                        <div>
                            <div>
                                <input
                                    type="number"
                                    value={downPayment}
                                    onChange={(event) =>
                                        setDownPayment(
                                            inRange(
                                                parseInt(event.target.value),
                                                0,
                                                propertyPrice
                                            )
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="range"
                                    onChange={(event) =>
                                        setDownPayment(
                                            parseInt(event.target.value)
                                        )
                                    }
                                    min={0}
                                    max={propertyPrice}
                                    step={1}
                                    value={downPayment}
                                    className="custom-slider"
                                />
                            </div>
                        </div>
                    </label>
                </div>
                <div>
                    <label>
                        <span>Loan Term</span>
                        <div>
                            <div>
                                <input
                                    type="number"
                                    value={loanTerm}
                                    onChange={(event) =>
                                        setLoanTerm(
                                            inRange(
                                                parseInt(event.target.value),
                                                1,
                                                maxLoanTerm
                                            )
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="range"
                                    onChange={(event) =>
                                        setLoanTerm(
                                            parseInt(event.target.value)
                                        )
                                    }
                                    min={1}
                                    max={maxLoanTerm}
                                    step={1}
                                    value={loanTerm}
                                    className="custom-slider"
                                />
                            </div>
                        </div>
                    </label>
                </div>
                <div>
                    <label>
                        <span>Interest Rate</span>
                        <div>
                            <div>
                                <input
                                    type="number"
                                    value={interestRate}
                                    step={0.01}
                                    onChange={(event) =>
                                        setInterestRate(
                                            inRange(
                                                parseFloat(event.target.value),
                                                1,
                                                maxInterestRate
                                            )
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="range"
                                    onChange={(event) =>
                                        setInterestRate(
                                            parseFloat(event.target.value)
                                        )
                                    }
                                    min={1}
                                    max={maxInterestRate}
                                    step={0.01}
                                    value={interestRate}
                                    className="custom-slider"
                                />
                            </div>
                        </div>
                    </label>
                </div>
            </div>
            <div>
                <div style={{ marginBottom: "8px" }}>
                    <div>
                        <span>Monthly Payments</span>
                    </div>
                    <div>
                        <strong>{formatNumber(monthlyPayment)}</strong>
                    </div>
                </div>
                <div>
                    <div>
                        <span>Total Payment</span>
                    </div>
                    <div>
                        <strong>{formatNumber(sumTotal)}</strong>
                    </div>
                </div>
            </div>
            <LinearChart data={linearChartData} />
        </div>
    );
}
